import React, { useState } from "react";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { theme } from "antd";
import "./Dashboard.css";
import DashboardLayout from "./DashboardLayout";
import { FloatButton } from "antd";
import { EditOutlined, SettingOutlined, FullscreenOutlined } from "@ant-design/icons";

function Dashboard() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullScreen = () => {
    const elem = document.documentElement; // Fullscreen the entire document
    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

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
            onClick={() => (window.location.href = "/edit-events")} // Replace with correct route
          />
          <FloatButton
            icon={<SettingOutlined />}
            tooltip={<div>Manage Events & Appointments</div>}
            onClick={() => (window.location.href = "/manage-events")} // Replace with correct route
          />
          <FloatButton
            icon={<FullscreenOutlined />}
            tooltip={
              <div>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</div>
            }
            onClick={toggleFullScreen}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Dashboard;
