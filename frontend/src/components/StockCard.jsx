import React from "react";
import { Card, List, Typography } from "antd";

const { Title, Text } = Typography;

function StockCard({ stocks }) {
  return (
    <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
      <Title level={3} style={{ color: "#ffffff", fontSize: "24px" }}>
        Stock Market Data
      </Title>
      {stocks.length > 0 ? (
        <List
          dataSource={stocks}
          renderItem={(stock) => (
            <List.Item>
              <Text style={{ color: "#ffffff", fontSize: "18px" }}>
                {stock.symbol}:{" "}
                {isNaN(stock.price) ? "N/A" : Number(stock.price).toFixed(2)}
              </Text>
            </List.Item>
          )}
        />
      ) : (
        <Text style={{ color: "#ffffff", fontSize: "18px" }}>
          Loading stock market data...
        </Text>
      )}
    </Card>
  );
}

export default StockCard;
