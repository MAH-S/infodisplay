require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5050;

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

// Function to convert 24-hour time to 12-hour format
const convertTo12Hour = (time24) => {
  let [hours, minutes] = time24.split(":");
  hours = parseInt(hours);
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${period}`;
};

// Helper function to convert 24-hour format to 12-hour format
function convertTo12HourFormat(time24) {
  // Check if time already includes AM or PM
  if (time24.includes("AM") || time24.includes("PM")) {
    return time24; // Return as is if it already contains AM/PM
  }

  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
  return `${hour12}:${minutes} ${period}`;
}

// Route to get multiple stock market data using Polygon.io API
app.get("/api/stocks", async (req, res) => {
  try {
    const apiKey = process.env.POLYGON_API_KEY;
    const symbols = ["AAPL", "AMZN", "GOOGL", "MSFT", "NVDA"]; // Stock symbols

    if (!apiKey) {
      console.error("Polygon API key is missing");
      return res.status(500).json({ error: "Polygon API key is missing" });
    }

    const stockPromises = symbols.map((symbol) =>
      axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${apiKey}`
      )
    );

    const responses = await Promise.all(stockPromises);

    const stockData = responses.map((response, index) => {
      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        const latestData = response.data.results[0];
        return { symbol: symbols[index], price: latestData.c };
      } else {
        throw new Error(`Unexpected response for ${symbols[index]}`);
      }
    });

    res.json(stockData);
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    res.status(500).json({ error: "Error fetching stock data" });
  }
});

// Route to get gold price data from GoldAPI.io
app.get("/api/gold-price", async (req, res) => {
  try {
    const apiKey = process.env.GOLD_API_KEY; // Your GoldAPI.io key

    const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
      headers: {
        "x-access-token": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.price) {
      res.json({ goldPrice: response.data.price });
    } else {
      console.error("Unexpected response from GoldAPI", response.data);
      res.status(500).json({ error: "Unexpected response from GoldAPI" });
    }
  } catch (error) {
    console.error("Error fetching gold price:", error.message);
    res.status(500).json({ error: "Error fetching gold price" });
  }
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
