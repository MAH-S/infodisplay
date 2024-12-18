import React from "react";
import { Row, Col } from "antd";
import TimeCard from "./TimeCard";
import DigitalOppressionCard from "./DigitalOppressionCard";
import WeatherCard from "./WeatherCard";
import StockCard from "./StockCard";
import EventsCard from "./EventsCard";
import PrayerTimesCard from "./PrayerTimesCard";
import TrafficCard from "./TrafficCard";
import AppointmentsCard from "./AppointmentsCard";

function DashboardLayout() {
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <div style={{ marginBottom: "20px" }}>
            <TimeCard />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <AppointmentsCard />
          </div>
        </Col>

        <Col span={12}>
          <div style={{ marginBottom: "20px" }}>
            <DigitalOppressionCard />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <EventsCard />
          </div>
        </Col>

        <Col span={6}>
          <div style={{ marginBottom: "20px" }}>
            <WeatherCard />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <PrayerTimesCard />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TrafficCard />
          </div>
        </Col>
      </Row>
      <StockCard /> {/* Place the StockCard as the footer */}
    </>
  );
}

export default DashboardLayout;
