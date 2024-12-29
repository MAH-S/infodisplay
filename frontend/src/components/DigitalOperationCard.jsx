import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

function DigitalOppressionCard() {
  return (
    <Card
      bordered={true}
      style={{
        backgroundColor: "#1f1f1f",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px", // Adjust height as needed
      }}
    >
      <Title level={3} style={{ color: "#ffffff", fontSize: "24px", margin: 0 }}>
        Digital Operation
      </Title>
    </Card>
  );
}

export default DigitalOppressionCard;
