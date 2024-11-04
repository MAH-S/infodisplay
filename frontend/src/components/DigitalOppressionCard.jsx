import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

function DigitalOppressionCard() {
  return (
    <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
      <Title level={3} style={{ color: "#ffffff", fontSize: "24px" }}>
        Digital Oppression 
      </Title>
    </Card>
  );
}

export default DigitalOppressionCard;
