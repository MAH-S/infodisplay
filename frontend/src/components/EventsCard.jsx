import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "antd";
import './EventsCard.css';

const { Text } = Typography;

function EventsCard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/events");
        // Duplicate events to create a continuous scroll effect
        setEvents([...response.data, ...response.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    // Fetch data initially
    fetchEvents();
    // Set an interval to fetch events every 1 minute
    const interval = setInterval(fetchEvents, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      bordered={true}
      style={{
        backgroundColor: "#1f1f1f",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {loading ? (
        <Text style={{ color: "#ffffff", fontSize: "18px" }}>Loading events...</Text>
      ) : (
        <div className="scrolling-container">
          <div className="scrolling-content">
            {events.map((event, index) => (
              <div key={index} className="scrolling-item">
                {event.image && (
                  <img
                    src={`http://localhost:5050/uploads/${event.image}`}
                    alt={event.title}
                    className="scrolling-image"
                  />
                )}
                <div className="event-info">
                  <Typography.Title level={3} style={{ color: event.text_color || "#ffffff" }}>
                    {event.title}
                  </Typography.Title>
                  {event.description && (
                    <Text
                      style={{
                        color: event.text_color || "#ffffff",
                        fontSize: event.font_size ? `${event.font_size - 4}px` : "16px",
                      }}
                    >
                      {event.description}
                    </Text>
                  )}
                  <div style={{ marginTop: "10px", color: "#d3d3d3" }}>
                    <Text>{`Scheduled at: ${event.time}`}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

export default EventsCard;
