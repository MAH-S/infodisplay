require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5050;
const db = require("./dbConnection");

// CORS Middleware with explicit origin
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

// Route to get the current time
app.get("/api/time", (req, res) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const currentTime = new Date().toLocaleTimeString([], options);
  res.json({ currentTime });
});

// Route to get weather information
app.get("/api/weather", async (req, res) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const latitude = 24.7136;
    const longitude = 46.6753;

    if (!apiKey) {
      console.error("No API key found");
      return res.status(500).json({ error: "No API key found" });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );

    const { main, weather } = response.data;

    res.json({
      temperature: main.temp,
      description: weather[0].description,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

// Route to get prayer times by city (Riyadh)
app.get("/api/prayer-times", async (req, res) => {
  try {
    const city = "Riyadh";
    const country = "Saudi Arabia";
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity`,
      {
        params: {
          city: city,
          country: country,
          method: 4,
        },
      }
    );

    const prayerTimes = response.data.data.timings;

    res.json(prayerTimes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching prayer times" });
  }
});

// Function to fetch and update stock market data using Alpha Vantage API and GoldAPI.io
const scheduleStockUpdate = async () => {
  try {
    const alphaVantageApiKey = "EHW0JN2MZ865XTJW";
    const goldApiKey = process.env.GOLD_API_KEY;

    const symbolPairs = [
      ["AAPL", "AMZN"],
      ["GOOGL", "MSFT"],
    ];

    if (!goldApiKey) {
      console.error("Gold API key is missing");
      return;
    }

    for (const symbols of symbolPairs) {
      console.log(
        `Fetching stock data for ${symbols.join(
          ", "
        )} from Alpha Vantage API...`
      );

      const stockData = [];
      for (const symbol of symbols) {
        try {
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${alphaVantageApiKey}`
          );

          if (response.data && response.data["Time Series (1min)"]) {
            const latestTime = Object.keys(
              response.data["Time Series (1min)"]
            )[0];
            const latestData = response.data["Time Series (1min)"][latestTime];
            stockData.push({ symbol, price: latestData["1. open"] });
          } else {
            console.error(`Unexpected response for ${symbol}`);
            stockData.push({ symbol, price: "N/A" });
          }

          // Add delay between API calls to avoid rate limiting
          await delay(15000); // 15 seconds delay to stay within rate limits
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error.message);
          stockData.push({ symbol, price: "N/A" });
        }
      }

      // Make API call for gold price
      const goldPricePromise = axios.get("https://www.goldapi.io/api/XAU/USD", {
        headers: {
          "x-access-token": goldApiKey,
          "Content-Type": "application/json",
        },
      });

      const goldResponse = await goldPricePromise;

      let goldData = null;
      if (goldResponse.data && typeof goldResponse.data.price === "number") {
        const goldPrice = parseFloat(goldResponse.data.price);
        if (!isNaN(goldPrice)) {
          goldData = { symbol: "XAU", price: goldPrice.toFixed(2) };
          console.log("Gold price fetched:", goldData);
          stockData.push(goldData);
        } else {
          console.error("Invalid gold price value received.");
        }
      } else {
        console.error("Unexpected response from GoldAPI", goldResponse.data);
      }

      console.log("Stock and gold data fetched successfully:", stockData);

      // Insert stock and gold data into the MySQL database using Promise.all
      const dbPromises = stockData
        .filter((stock) => stock.price !== "N/A")
        .map((stock) => {
          return new Promise((resolve, reject) => {
            const query = `INSERT INTO stocks (symbol, price, date_added) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE price = ?, date_added = NOW()`;
            db.query(
              query,
              [stock.symbol, stock.price, stock.price],
              (err, result) => {
                if (err) {
                  console.error("Error inserting or updating stock data:", err);
                  reject(err);
                } else {
                  console.log(
                    `Stock data upserted for ${stock.symbol}:`,
                    result
                  );
                  resolve(result);
                }
              }
            );
          });
        });

      await Promise.all(dbPromises);
      console.log("Stock data successfully updated in database.");
    }
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
  }
};

// Helper function to add delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Call the function every 1 minute (60000 milliseconds)
setInterval(scheduleStockUpdate, 60000);

// Route to get saved stock and gold data from the database
app.get("/api/saved-stocks", (req, res) => {
  const query = `SELECT symbol, price, date_added FROM stocks ORDER BY date_added DESC`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching stock data from database:", err);
      res
        .status(500)
        .json({ error: "Error fetching stock data from database" });
    } else {
      res.json(results);
    }
  });
});

// Route to get traffic status (example)
app.get("/api/traffic", (req, res) => {
  const trafficStatus = "Traffic is smooth in all directions.";
  res.json({ trafficStatus });
});

// Route to get appointments and events (example)
app.get("/api/events", (req, res) => {
  const events = [
    { title: "Team Meeting", time: "10:00 AM" },
    { title: "Doctor's Appointment", time: "2:00 PM" },
  ];
  res.json(events);
});

app.get("/api/appointments", (req, res) => {
  const appointments = [
    { title: "Dentist Appointment", time: "3:00 PM" },
    { title: "Client Meeting", time: "4:30 PM" },
  ];
  res.json(appointments);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
