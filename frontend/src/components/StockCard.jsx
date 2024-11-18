// StockCard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, List, Typography } from "antd";

const { Title, Text } = Typography;

function StockCard() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchSavedStocks = () => {
      axios
        .get("http://localhost:5050/api/saved-stocks")
        .then((res) => {
          setStocks(res.data.slice(0, 5)); // Get the latest 5 stocks
        })
        .catch((error) => {
          console.error("Error fetching stocks:", error);
        });
    };

    // Fetch data initially and set interval
    fetchSavedStocks();
    const stockInterval = setInterval(fetchSavedStocks, 65000); // Update every 1:05 minutes

    // Clean up interval on component unmount
    return () => clearInterval(stockInterval);
  }, []);

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
