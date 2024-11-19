import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, List, Typography } from "antd";
import { FaApple, FaAmazon, FaGoogle, FaMicrosoft, FaCoins } from "react-icons/fa";
import { SiNvidia } from "react-icons/si";

const { Title, Text } = Typography;

function StockCard() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = () => {
      axios
        .get("http://localhost:5050/api/saved-stocks")
        .then((res) => {
          setStocks(res.data.slice(0, 7)); // Get the latest 7 stocks, including STC if applicable
        })
        .catch((error) => {
          console.error("Error fetching stocks:", error);
        });
    };

    // Fetch data initially
    fetchStocks();

    // Set interval to refresh every 1 minute
    const interval = setInterval(fetchStocks, 60000); // Fetch data every minute

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const getDirectionSymbol = (direction) => {
    switch (direction) {
      case "up":
        return <span style={{ color: "green" }}>▲</span>;
      case "down":
        return <span style={{ color: "red" }}>▼</span>;
      case "same":
        return <span style={{ color: "white" }}>▬</span>;
      default:
        return null;
    }
  };

  const getIcon = (symbol) => {
    switch (symbol) {
      case "AAPL":
        return <FaApple style={{ color: "white" }} />;
      case "AMZN":
        return <FaAmazon style={{ color: "white" }} />;
      case "GOOGL":
        return <FaGoogle style={{ color: "white" }} />;
      case "MSFT":
        return <FaMicrosoft style={{ color: "white" }} />;
      case "NVDA":
        return <SiNvidia style={{ color: "white" }} />;
      case "Gold":
        return <FaCoins style={{ color: "gold" }} />;
      case "STC":
        return <span style={{ color: "white" }}>🟢</span>; // Placeholder for STC, use an icon if available
      default:
        return null;
    }
  };

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
                {getIcon(stock.symbol)} {stock.symbol === "GC=F" ? "Gold" : stock.symbol}: {stock.price}{" "}
                {getDirectionSymbol(stock.direction)}
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
