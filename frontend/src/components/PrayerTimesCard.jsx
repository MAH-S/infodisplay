// PrayerTimesCard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Typography } from "antd";

const { Title, Text } = Typography;

function PrayerTimesCard() {
  const [prayerTimes, setPrayerTimes] = useState(null);

  useEffect(() => {
    axios
      .get("http://95.177.217.236/api/prayer-times")
      .then((res) => {
        setPrayerTimes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching prayer times:", error);
      });
  }, []);

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
    return `${hour12}:${minutes} ${period}`;
  };

  // Icons for each prayer
  const prayerIcons = {
    Fajr: "🌅", // Sunrise icon for Fajr
    Dhuhr: "🌞", // Sun at its peak for Dhuhr
    Asr: "🌤️", // Sun moving left, coming down for Asr
    Maghrib: "🌇", // Sunset icon for Maghrib
    Isha: "🌙", // Moon icon for Isha
  };

  // Define prayer data
  const prayerData = prayerTimes
    ? [
        { key: "1", name: "الفجر", time: prayerTimes.Fajr, icon: prayerIcons.Fajr },
        { key: "2", name: "الظهر", time: prayerTimes.Dhuhr, icon: prayerIcons.Dhuhr },
        { key: "3", name: "العصر", time: prayerTimes.Asr, icon: prayerIcons.Asr },
        { key: "4", name: "المغرب", time: prayerTimes.Maghrib, icon: prayerIcons.Maghrib },
        { key: "5", name: "العشاء", time: prayerTimes.Isha, icon: prayerIcons.Isha },
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

  const prayerColumns = [
    {
      title: "الوقت",
      dataIndex: "time",
      key: "time",
      render: (text, record, index) => {
        const isNextPrayer = index === nextPrayerIndex;
        return (
          <span
            style={{
              color: isNextPrayer ? "#90EE90" : "#ffffff",
              fontSize: "20px", // Increased font size
              fontWeight: isNextPrayer ? "bold" : "normal",
            }}
          >
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
          <span
            style={{
              color: isNextPrayer ? "#90EE90" : "#ffffff",
              fontSize: "20px", // Increased font size
              fontWeight: isNextPrayer ? "bold" : "normal",
            }}
          >
            {record.icon} {text}
          </span>
        );
      },
    },
  ];

  return (
    <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
      <Title
        level={3}
        style={{ textAlign: "right", color: "#ffffff", fontSize: "28px" }} // Increased title size
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
        <Text style={{ color: "#ffffff", fontSize: "20px" }}>
          Loading prayer times...
        </Text>
      )}
    </Card>
  );
}

export default PrayerTimesCard;
