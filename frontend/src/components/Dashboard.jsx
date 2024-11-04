import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { theme } from "antd";
import "./Dashboard.css";
import TimeCard from "./TimeCard";
import DigitalOppressionCard from "./DigitalOppressionCard";
import WeatherCard from "./WeatherCard";
import StockCard from "./StockCard";
import EventsCard from "./EventsCard";
import PrayerTimesCard from "./PrayerTimesCard";
import TrafficCard from "./TrafficCard";

function Dashboard() {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [traffic, setTraffic] = useState("");
  const [events, setEvents] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // useEffect for Time Update
  useEffect(() => {
    const fetchTime = () => {
      axios
        .get("http://localhost:5050/api/time")
        .then((res) => {
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

  // useEffect for Weather, Prayer Times, Traffic, Events, Appointments
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5050/api/weather")
        .then((res) => {
          setWeather(res.data);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
        });

      axios
        .get("http://localhost:5050/api/prayer-times")
        .then((res) => {
          setPrayerTimes(res.data);
        })
        .catch((error) => {
          console.error("Error fetching prayer times:", error);
        });

      axios
        .get("http://localhost:5050/api/traffic")
        .then((res) => {
          setTraffic(res.data.trafficStatus);
        })
        .catch((error) => {
          console.error("Error fetching traffic:", error);
        });

      axios
        .get("http://localhost:5050/api/events")
        .then((res) => {
          setEvents(res.data);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });

      axios
        .get("http://localhost:5050/api/appointments")
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    };

    // Fetch data initially and set interval
    fetchData();
    const dataInterval = setInterval(fetchData, 65000); // Update every 1:05 minutes

    // Clean up interval on component unmount
    return () => clearInterval(dataInterval);
  }, []);

  // useEffect for Stocks
  useEffect(() => {
    const fetchSavedStocks = () => {
      axios
        .get("http://localhost:5050/api/saved-stocks")
        .then((res) => {
          setStocks(res.data.slice(0, 5)); // Get the latest 6 stocks, including gold
        })
        .catch((error) => {
          console.error("Error fetching stocks:", error);
        });
    };

    // Fetch data initially and set interval
    fetchSavedStocks();
    const stockInterval = setInterval(fetchSavedStocks, 65000); // Update every 1:05 minutes

    // Clean up interval on component unmount
    return () => clearInterval(stockInterval);
  }, []);

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
    return `${hour12}:${minutes} ${period}`;
  };

  const prayerColumns = [
    {
      title: "الوقت",
      dataIndex: "time",
      key: "time",
      render: (text, record, index) => {
        const isNextPrayer = index === nextPrayerIndex;
        return (
          <span style={{ color: isNextPrayer ? "#90EE90" : "#ffffff" }}>
            {convertTo12HourFormat(text)}
          </span>
        );
      },
    },
    {
      title: "الصلاة",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        const isNextPrayer = index === nextPrayerIndex;
        return (
          <span style={{ color: isNextPrayer ? "#90EE90" : "#ffffff" }}>
            {text}
          </span>
        );
      },
    },
  ];

  const prayerData = prayerTimes
    ? [
        { key: "1", name: "الفجر", time: prayerTimes.Fajr },
        { key: "2", name: "الظهر", time: prayerTimes.Dhuhr },
        { key: "3", name: "العصر", time: prayerTimes.Asr },
        { key: "4", name: "المغرب", time: prayerTimes.Maghrib },
        { key: "5", name: "العشاء", time: prayerTimes.Isha },
      ]
    : [];

  const currentTime = new Date();
  const nextPrayerIndex = prayerData.findIndex((prayer) => {
    const [hours, minutes] = prayer.time.split(":");
    const prayerTime = new Date();
    prayerTime.setHours(parseInt(hours, 10));
    prayerTime.setMinutes(parseInt(minutes, 10));
    prayerTime.setSeconds(0);
    return prayerTime > currentTime;
  });

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div
        style={{
          padding: "40px",
          backgroundColor: "#141414",
          color: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <Row gutter={[24, 24]} justify="space-between">
          <Col span={6}>
            <TimeCard time={time} />
          </Col>
          <Col span={6}>
            <DigitalOppressionCard />
          </Col>
          <Col span={6}>
            <WeatherCard weather={weather} />
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{ marginTop: "20px" }}>
          <Col span={6}>
            <StockCard stocks={stocks} />
          </Col>
          <Col span={12}>
            <EventsCard events={events} appointments={appointments} />
          </Col>
          <Col span={6}>
            <PrayerTimesCard
              prayerTimes={prayerTimes}
              prayerColumns={prayerColumns}
              prayerData={prayerData}
              nextPrayerIndex={nextPrayerIndex}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{ marginTop: "20px" }}>
          <Col span={6}>
            <TrafficCard traffic={traffic} />
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}

export default Dashboard;
