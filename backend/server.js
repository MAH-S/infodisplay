const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// Route to get the current time
app.get("/api/time", (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.json({ currentTime });
});

// Route to get weather information
app.get("/api/weather", async (req, res) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY; // Store your API key in a .env file
    const city = "Riyadh"; // Change to your desired city
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const { main, weather } = response.data;
    res.json({
      temperature: main.temp,
      description: weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

// Route to get prayer times (example)
app.get("/api/prayer-times", (req, res) => {
  // Placeholder data
  const prayerTimes = {
    Fajr: "5:00 AM",
    Dhuhr: "12:30 PM",
    Asr: "3:45 PM",
    Maghrib: "6:15 PM",
    Isha: "7:30 PM",
  };
  res.json(prayerTimes);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
