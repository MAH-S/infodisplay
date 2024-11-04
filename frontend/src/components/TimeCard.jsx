import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

function TimeCard({ time }) {
  return (
    <Card
      bordered={true}
      style={{ backgroundColor: "#1f1f1f", textAlign: "center" }}
    >
      <Text style={{ color: "#ffffff", fontSize: "24px" }}>
        {time || "Loading..."}
      </Text>
    </Card>
  );
}

export default TimeCard;
