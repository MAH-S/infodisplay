// TimeCard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "antd";

const { Text } = Typography;

function TimeCard() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Use the public IP of the backend server
  const API_BASE_URL = "http://95.177.217.236";

  useEffect(() => {
    const fetchTime = () => {
      setLoading(true);
      axios
        .get(`${API_BASE_URL}/api/time`)
        .then((res) => {
          setTime(res.data.currentTime);
          const currentDate = new Date();
          setDate(
            currentDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          );
          setError("");
        })
        .catch((error) => {
          console.error("Error fetching time:", error.message);
          setError("Failed to fetch time. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchTime();
    const timeInterval = setInterval(fetchTime, 60000);
    return () => clearInterval(timeInterval);
  }, [API_BASE_URL]);

  return (
    <Card
      bordered={true}
      style={{
        backgroundColor: "#1f1f1f",
        textAlign: "center",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      {loading ? (
        <Text style={{ color: "#ffffff", fontSize: "24px" }}>Loading...</Text>
      ) : error ? (
        <Text style={{ color: "#ff4d4f", fontSize: "18px" }}>{error}</Text>
      ) : (
        <>
          <Text style={{ color: "#ffffff", fontSize: "20px" }}>{date}</Text>
          <br />
          <Text style={{ color: "#ffffff", fontSize: "24px" }}>{time}</Text>
        </>
      )}
    </Card>
  );
}

export default TimeCard;
