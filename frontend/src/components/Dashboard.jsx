// Dashboard.jsx
import React from "react";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { theme } from "antd";
import "./Dashboard.css";
import DashboardLayout from "./DashboardLayout";

function Dashboard() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#141414",
          color: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <DashboardLayout />
      </div>
    </ConfigProvider>
  );
}

export default Dashboard;
