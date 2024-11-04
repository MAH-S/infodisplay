import React from "react";
import { Card, List, Typography } from "antd";
import eventImage from "/Users/mah/Desktop/NewProjectFolder/InfoDisplay/frontend/src/assets/images/Bayti-less_2_11zon.webp"; // Corrected import

const { Title, Text } = Typography;

function EventsCard({ events, appointments }) {
  // Merge events and appointments
  const mergedEvents = [...events, ...appointments];

  return (
    <Card
      bordered={true}
      style={{
        backgroundColor: "#1f1f1f",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Title
          level={3}
          style={{ color: "#ffffff", fontSize: "24px", marginBottom: "10px" }}
        >
          Appointments & Events
        </Title>
        <img
          src={eventImage}
          alt="Event"
          style={{
            width: "90%", // Adjust to make it fit better
            height: "auto",
            maxHeight: "300px", // Limit height for better alignment
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>
      {mergedEvents.length > 0 ? (
        <List
          dataSource={mergedEvents}
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
  );
}

export default EventsCard;
