import React from "react";
import { Card, List, Typography } from "antd";

const { Title, Text } = Typography;

function AppointmentsCard({ appointments }) {
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
