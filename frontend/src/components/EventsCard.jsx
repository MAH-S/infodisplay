// EventsCard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, List, Typography } from "antd";
import eventImage from "/Users/mah/Desktop/NewProjectFolder/InfoDisplay/frontend/src/assets/images/Bayti-less_2_11zon.webp";

const { Text } = Typography;

function EventsCard() {
  const [events, setEvents] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchEventsAndAppointments = () => {
      // Fetch events
      axios
        .get("http://localhost:5050/api/events")
        .then((res) => {
          setEvents(res.data);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });

      // Fetch appointments
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
    fetchEventsAndAppointments();
    const eventsInterval = setInterval(fetchEventsAndAppointments, 65000); // Update every 1:05 minutes

    // Clean up interval on component unmount
    return () => clearInterval(eventsInterval);
  }, []);

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
        <img
          src={eventImage}
          alt="Event"
          style={{
            width: "90%",
            height: "auto",
            maxHeight: "300px",
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
