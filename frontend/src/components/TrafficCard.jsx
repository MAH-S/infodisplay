import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

function TrafficCard({ traffic }) {
  return (
    <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
      <Title level={3} style={{ color: "#ffffff", fontSize: "24px" }}>
        Traffic Status
      </Title>
      <Text style={{ color: "#ffffff", fontSize: "18px" }}>
        {traffic || "Loading..."}
      </Text>
    </Card>
  );
}

export default TrafficCard;
