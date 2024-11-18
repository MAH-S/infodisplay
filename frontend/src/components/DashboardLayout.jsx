// DashboardLayout.jsx
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
    <Row gutter={[24, 24]}>
      {/* Section 1 */}
      <Col span={6}>
        <div style={{ marginBottom: "20px" }}>
          <TimeCard />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <StockCard />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <TrafficCard />
        </div>
      </Col>

      {/* Section 2 */}
      <Col span={12}>
        <div style={{ marginBottom: "20px" }}>
          <DigitalOppressionCard />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <EventsCard />
        </div>
        
      </Col>

      {/* Section 3 */}
      <Col span={6}>
        <div style={{ marginBottom: "20px" }}>
          <WeatherCard />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <PrayerTimesCard />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <AppointmentsCard />
        </div>
      </Col>
    </Row>
  );
}

export default DashboardLayout;
