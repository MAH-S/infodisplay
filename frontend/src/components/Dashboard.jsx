import React from "react";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { theme } from "antd";
import "./Dashboard.css";
import DashboardLayout from "./DashboardLayout";
import { FloatButton } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";

function Dashboard() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#141414",
          color: "#ffffff",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Main Dashboard Layout */}
        <DashboardLayout />

        {/* Floating Buttons */}
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 1100,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <FloatButton
            icon={<EditOutlined />}
            tooltip={<div>Edit Event</div>}
            onClick={() => window.location.href = '/edit-events'} // Replace with correct route
          />
          <FloatButton
            icon={<SettingOutlined />}
            tooltip={<div>Manage Events & Appointments</div>}
            onClick={() => window.location.href = '/manage-events'} // Replace with correct route
          />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Dashboard;
