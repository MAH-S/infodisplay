const axios = require("axios");

exports.getWeather = async (req, res) => {
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
};
