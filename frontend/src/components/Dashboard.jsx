import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [traffic, setTraffic] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch data from backend APIs
    axios
      .get("http://localhost:5050/api/time")
      .then((res) => setTime(res.data.time));
    axios
      .get("http://localhost:5050/api/weather")
      .then((res) => setWeather(res.data));
    axios
      .get("http://localhost:5050/api/prayer-times")
      .then((res) => setPrayerTimes(res.data));
    axios
      .get("http://localhost:5050/api/stocks")
      .then((res) => setStocks(res.data));
    axios
      .get("http://localhost:5050/api/traffic")
      .then((res) => setTraffic(res.data.trafficStatus));
    axios
      .get("http://localhost:5050/api/events")
      .then((res) => setEvents(res.data));
  }, []);

  return (
    <div>
      <h1>InfoDisplay Dashboard</h1>
      <p>Current Time: {time}</p>
      {weather && (
        <p>
          Weather: {weather.weather}, Temperature: {weather.temperature}°C
        </p>
      )}
      {prayerTimes && (
        <div>
          <h3>Prayer Times:</h3>
          <p>Fajr: {prayerTimes.fajr}</p>
          <p>Dhuhr: {prayerTimes.dhuhr}</p>
          <p>Asr: {prayerTimes.asr}</p>
          <p>Maghrib: {prayerTimes.maghrib}</p>
          <p>Isha: {prayerTimes.isha}</p>
        </div>
      )}
      <h3>Stock Market Data:</h3>
      <ul>
        {stocks.map((stock, index) => (
          <li key={index}>
            {stock.market}: {stock.value}
          </li>
        ))}
      </ul>
      <p>Traffic Status: {traffic}</p>
      <h3>Appointments and Events:</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.title} at {event.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
