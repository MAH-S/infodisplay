// TimeCard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "antd";

const { Text } = Typography;

function TimeCard() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTime = () => {
      axios
        .get("http://localhost:5050/api/time")
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
          setError(""); // Clear any previous errors on success
        })
        .catch((error) => {
          console.error("Error fetching time:", error.message);
          setError("Failed to fetch time. Please try again later.");
        });
    };

    // Fetch time initially and set interval
    fetchTime();
    const timeInterval = setInterval(fetchTime, 60000); // Update time every 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <Card
      bordered={true}
      style={{
        backgroundColor: "#1f1f1f",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {error ? (
        <Text style={{ color: "#ff4d4f", fontSize: "18px" }}>{error}</Text>
      ) : (
        <>
          <Text style={{ color: "#ffffff", fontSize: "20px" }}>{date}</Text>
          <br />
          <Text style={{ color: "#ffffff", fontSize: "24px" }}>
            {time || "Loading..."}
          </Text>
        </>
      )}
    </Card>
  );
}

export default TimeCard;
