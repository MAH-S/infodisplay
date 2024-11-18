// WeatherCard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "antd";

const { Text } = Typography;

function WeatherCard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = () => {
      axios
        .get("http://localhost:5050/api/weather")
        .then((res) => {
          setWeather(res.data);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
        });
    };

    // Fetch weather initially
    fetchWeather();
  }, []);

  const getWeatherSymbol = (description) => {
    switch (description?.toLowerCase()) {
      case "clear sky":
        return "☀️"; // Sun symbol
      case "few clouds":
        return "🌤️"; // Few clouds symbol
      case "scattered clouds":
        return "☁️"; // Cloud symbol
      case "broken clouds":
        return "🌥️"; // Broken clouds symbol
      case "shower rain":
        return "🌧️"; // Shower rain symbol
      case "rain":
        return "🌦️"; // Rain symbol
      case "thunderstorm":
        return "⛈️"; // Thunderstorm symbol
      case "snow":
        return "❄️"; // Snow symbol
      case "mist":
        return "🌫️"; // Mist symbol
      default:
        return "🌡️"; // Default symbol for unknown conditions
    }
  };

  return (
    <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
      {weather ? (
        <Text style={{ color: "#ffffff", fontSize: "18px" }}>
          {getWeatherSymbol(weather.description)} {weather.description}, Temperature: {Math.round(weather.temperature)}°C
        </Text>
      ) : (
        <Text style={{ color: "#ffffff", fontSize: "18px" }}>
          Loading weather...
        </Text>
      )}
    </Card>
  );
}

export default WeatherCard;
