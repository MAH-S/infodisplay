import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, List, Typography, Row, Col, Table, ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { theme } from "antd";
import "./Dashboard.css";

const { Title, Text } = Typography;

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

  // useEffect for Weather, Prayer Times, Traffic, Events, and Appointments
  useEffect(() => {
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
  }, []);

  // useEffect for Stocks Update
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockResponse = await axios.get(
          "http://localhost:5050/api/stocks"
        );
        const goldResponse = await axios.get(
          "http://localhost:5050/api/gold-price"
        );

        const stockData = stockResponse.data.map((stock) => ({
          market: stock.symbol,
          value: stock.price,
        }));

        const goldPriceData = {
          market: "Gold (XAU)",
          value: goldResponse.data.goldPrice,
        };

        setStocks([
          ...stockData.filter((stock) => stock.market !== "Gold (XAU)"),
          goldPriceData,
        ]);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Rate limit exceeded:", error);
        } else {
          console.error("Error fetching stock data:", error);
        }
      }
    };

    fetchStockData(); // Initial fetch of stocks
    const stockInterval = setInterval(fetchStockData, 15 * 60 * 1000); // Update stock data every 15 minutes

    // Clean up stock interval on component unmount
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
            <Card
              bordered={true}
              style={{ backgroundColor: "#1f1f1f", textAlign: "center" }}
            >
              <Text style={{ color: "#ffffff", fontSize: "24px" }}>
                {time || "Loading..."}
              </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
              <Title level={3} style={{ color: "#ffffff", fontSize: "24px" }}>
                Digital Oppression
              </Title>
            </Card>
          </Col>
          <Col span={6}>
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
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{ marginTop: "20px" }}>
          <Col span={6}>
            <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
              <Title level={3} style={{ color: "#ffffff", fontSize: "24px" }}>
                Stock Market Data
              </Title>
              {stocks.length > 0 ? (
                <List
                  dataSource={stocks}
                  renderItem={(stock) => (
                    <List.Item>
                      <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                        {stock.market}: {stock.value}
                      </Text>
                    </List.Item>
                  )}
                />
              ) : (
                <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                  Loading stock market data...
                </Text>
              )}
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
              <Title level={3} style={{ color: "#ffffff", fontSize: "24px" }}>
                Appointments and Events
              </Title>
              {events.length > 0 ? (
                <List
                  dataSource={events}
                  renderItem={(event) => (
                    <List.Item>
                      <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                        {event.title} at {event.time}
                      </Text>
                    </List.Item>
                  )}
                />
              ) : (
                <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                  Loading appointments and events...
                </Text>
              )}
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
              <Title
                level={3}
                style={{
                  textAlign: "right",
                  color: "#ffffff",
                  fontSize: "24px",
                }}
              >
                مواقيت الصلاة
              </Title>
              {prayerTimes ? (
                <Table
                  columns={prayerColumns}
                  dataSource={prayerData.map((prayer, index) => ({
                    ...prayer,
                    className: index === nextPrayerIndex ? "highlight-row" : "",
                  }))}
                  pagination={false}
                  showHeader={false}
                  rowClassName={(record) => record.className}
                  style={{ color: "#ffffff" }}
                />
              ) : (
                <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                  Loading prayer times...
                </Text>
              )}
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{ marginTop: "20px" }}>
          <Col span={6}>
            <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
              <Title level={3} style={{ color: "#ffffff", fontSize: "24px" }}>
                Traffic Status
              </Title>
              <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                {traffic || "Loading..."}
              </Text>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
              <Title level={3} style={{ color: "#ffffff", fontSize: "24px" }}>
                Appointments and Events
              </Title>
              {events.length > 0 ? (
                <List
                  dataSource={events}
                  renderItem={(event) => (
                    <List.Item>
                      <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                        {event.title} at {event.time}
                      </Text>
                    </List.Item>
                  )}
                />
              ) : (
                <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                  Loading events...
                </Text>
              )}
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
              <Title level={3} style={{ color: "#ffffff", fontSize: "24px" }}>
                Appointments
              </Title>
              {appointments.length > 0 ? (
                <List
                  dataSource={appointments}
                  renderItem={(appointment) => (
                    <List.Item>
                      <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                        {appointment.title} at {appointment.time}
                      </Text>
                    </List.Item>
                  )}
                />
              ) : (
                <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                  Loading appointments...
                </Text>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}

export default Dashboard;
