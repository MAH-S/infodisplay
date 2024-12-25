// AppointmentsCard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, List, Typography } from "antd";

const { Title, Text } = Typography;

function AppointmentsCard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = () => {
      axios
        .get("http://95.177.217.236/api/appointments")
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    };

    // Fetch appointments initially and set interval
    fetchAppointments();
    const appointmentsInterval = setInterval(fetchAppointments, 65000); // Update every 1:05 minutes

    // Clean up interval on component unmount
    return () => clearInterval(appointmentsInterval);
  }, []);

  return (
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
  );
}

export default AppointmentsCard;
