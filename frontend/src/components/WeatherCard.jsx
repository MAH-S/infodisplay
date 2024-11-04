import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

function WeatherCard({ weather }) {
  return (
    <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
      {weather ? (
        <Text style={{ color: "#ffffff", fontSize: "18px" }}>
          {weather.description}, Temperature: {weather.temperature}°C
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
