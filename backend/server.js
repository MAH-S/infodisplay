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
    const apiKey = process.env.WEATHER_API_KEY; // Store your API key in a .env file
    const latitude = 24.7136; // Latitude for Riyadh
    const longitude = 46.6753; // Longitude for Riyadh

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
          method: 4, // Umm Al-Qura University, Makkah
        },
      }
    );

    const prayerTimes = response.data.data.timings;

    // Function to convert 24-hour time to 12-hour format
    const convertTo12Hour = (time24) => {
      let [hours, minutes] = time24.split(":");
      hours = parseInt(hours);
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${period}`;
    };

    // Convert all prayer times to 12-hour format
    const formattedPrayerTimes = {
      Fajr: convertTo12Hour(prayerTimes.Fajr),
      Dhuhr: convertTo12Hour(prayerTimes.Dhuhr),
      Asr: convertTo12Hour(prayerTimes.Asr),
      Maghrib: convertTo12Hour(prayerTimes.Maghrib),
      Isha: convertTo12Hour(prayerTimes.Isha),
    };

    res.json(formattedPrayerTimes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching prayer times" });
  }
});

// Route to get stock market data
// Updated fetchStockData to use Polygon.io instead of Alpha Vantage
useEffect(() => {
  const fetchStockData = () => {
    const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

    // Fetch stock data using Polygon.io API
    axios
      .get(`https://api.polygon.io/v2/aggs/ticker/AAPL/prev?apiKey=${apiKey}`)
      .then((res) => {
        if (res.data && res.data.results && res.data.results.length > 0) {
          const latestData = res.data.results[0];
          setStocks([{ market: "Apple (AAPL)", value: latestData.c }]); // c stands for close price
        }
      })
      .catch((error) => {
        console.error("Error fetching US stock data:", error);
      });

    // Fetch gold price data
    axios
      .get("http://localhost:5050/api/gold-price")
      .then((res) => {
        setStocks((prevStocks) => [
          ...prevStocks,
          { market: "Gold (XAU)", value: res.data.goldPrice },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching gold price:", error);
      });
  };

  fetchStockData(); // Initial fetch of stocks
  const stockInterval = setInterval(fetchStockData, 3600000); // Update stock data every hour

  // Clean up stock interval on component unmount
  return () => clearInterval(stockInterval);
}, []);

// Route to get traffic status (example)
app.get("/api/traffic", (req, res) => {
  // Placeholder data
  const trafficStatus = "Traffic is smooth in all directions.";
  res.json({ trafficStatus });
});

// Route to get appointments and events (example)
app.get("/api/events", (req, res) => {
  // Placeholder data
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
