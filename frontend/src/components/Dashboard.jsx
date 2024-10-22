import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [traffic, setTraffic] = useState("");
  const [events, setEvents] = useState([]);

  // useEffect for Time Update
  useEffect(() => {
    const fetchTime = () => {
      axios
        .get("http://localhost:5050/api/time")
        .then((res) => {
          console.log("Time Response:", res.data);
          setTime(res.data.currentTime);
        })
        .catch((error) => {
          console.error("Error fetching time:", error);
        });
    };

    // Fetch time initially and set interval
    fetchTime();
    const timeInterval = setInterval(fetchTime, 60000); // Update time every 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(timeInterval);
  }, []);

  // useEffect for Weather, Prayer Times, Traffic, Events
  useEffect(() => {
    axios
      .get("http://localhost:5050/api/weather")
      .then((res) => {
        console.log("Weather Response:", res.data);
        setWeather(res.data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });

    axios
      .get("http://localhost:5050/api/prayer-times")
      .then((res) => {
        console.log("Prayer Times Response:", res.data);
        setPrayerTimes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching prayer times:", error);
      });

    axios
      .get("http://localhost:5050/api/traffic")
      .then((res) => {
        console.log("Traffic Response:", res.data);
        setTraffic(res.data.trafficStatus);
      })
      .catch((error) => {
        console.error("Error fetching traffic:", error);
      });

    axios
      .get("http://localhost:5050/api/events")
      .then((res) => {
        console.log("Events Response:", res.data);
        setEvents(res.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // useEffect for Stocks Update
  useEffect(() => {
    const fetchStockData = () => {
      // Fetch stock data
      axios
        .get("http://localhost:5050/api/us-stocks")
        .then((res) => {
          setStocks([{ market: res.data.symbol, value: res.data.price }]);
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
    const stockInterval = setInterval(fetchStockData, 60000); // Update stock data every 60 seconds

    // Clean up stock interval on component unmount
    return () => clearInterval(stockInterval);
  }, []);

  return (
    <div>
      <h1>InfoDisplay Dashboard</h1>
      <p>Current Time: {time || "Loading..."}</p>
      {weather ? (
        <p>
          Weather: {weather.description}, Temperature: {weather.temperature}°C
        </p>
      ) : (
        <p>Loading weather...</p>
      )}
      {prayerTimes ? (
        <div>
          <h3>Prayer Times:</h3>
          <p>Fajr: {convertTo12HourFormat(prayerTimes.Fajr)}</p>
          <p>Dhuhr: {convertTo12HourFormat(prayerTimes.Dhuhr)}</p>
          <p>Asr: {convertTo12HourFormat(prayerTimes.Asr)}</p>
          <p>Maghrib: {convertTo12HourFormat(prayerTimes.Maghrib)}</p>
          <p>Isha: {convertTo12HourFormat(prayerTimes.Isha)}</p>
        </div>
      ) : (
        <p>Loading prayer times...</p>
      )}
      <h3>Stock Market Data:</h3>
      {stocks.length > 0 ? (
        <ul>
          {stocks.map((stock, index) => (
            <li key={index}>
              {stock.market}: {stock.value}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading stock market data...</p>
      )}
      <p>Traffic Status: {traffic || "Loading..."}</p>
      <h3>Appointments and Events:</h3>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event.title} at {event.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading appointments and events...</p>
      )}
    </div>
  );

  // Helper function to convert 24-hour format to 12-hour format
  function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
    return `${hour12}:${minutes} ${period}`;
  }
}

export default Dashboard;
