import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "antd";
import { FaApple, FaAmazon, FaGoogle, FaMicrosoft, FaCoins } from "react-icons/fa";
import { SiNvidia } from "react-icons/si";
import './StockCard.css'; // Import your custom styles

const { Text } = Typography;

function StockCard() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = () => {
      axios
        .get("http://95.177.217.236/api/saved-stocks")
        .then((res) => {
          setStocks(res.data.slice(0, 7)); // Get the latest 7 stocks
        })
        .catch((error) => {
          console.error("Error fetching stocks:", error);
        });
    };

    // Fetch data initially
    fetchStocks();

    // Set interval to refresh every 1 minute
    const interval = setInterval(fetchStocks, 60000);

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
        return <FaApple className="stock-icon" />;
      case "AMZN":
        return <FaAmazon className="stock-icon" />;
      case "GOOGL":
        return <FaGoogle className="stock-icon" />;
      case "MSFT":
        return <FaMicrosoft className="stock-icon" />;
      case "NVDA":
        return <SiNvidia className="stock-icon" />;
      case "Gold":
        return <FaCoins className="stock-icon gold-icon" />;
      case "STC":
        return <span className="stock-icon">🟢</span>;
      default:
        return null;
    }
  };

  return (
    <div className="stock-ticker-container">
      <div className="stock-ticker">
        {stocks.length > 0 ? (
          stocks.map((stock, index) => (
            <span key={index} className="stock-ticker-item">
              {getIcon(stock.symbol)} {stock.symbol === "GC=F" ? "Gold" : stock.symbol}: {stock.price}{" "}
              {getDirectionSymbol(stock.direction)}
            </span>
          ))
        ) : (
          <Text className="stock-ticker-loading">Loading stock market data...</Text>
        )}
      </div>
    </div>
  );
}

export default StockCard;
