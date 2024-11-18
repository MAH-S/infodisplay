'use strict';
const yahooFinance = require('yahoo-finance2').default;
const db = require('../dbConnection');
const delay = require('../utils/delay');

const stockService = {};

stockService.scheduleStockUpdate = async () => {
  try {
    const symbols = ["AAPL", "AMZN", "GOOGL", "MSFT", "NVDA", "GC=F"]; // Adding NVDA and Gold (GC=F)
    const stockData = [];

    for (const symbol of symbols) {
      console.log(`Fetching stock data for ${symbol} from Yahoo Finance API...`);
      try {
        const quote = await yahooFinance.quote(symbol);

        if (quote && quote.regularMarketPrice) {
          stockData.push({ symbol, price: quote.regularMarketPrice });
        } else {
          console.error(`Unexpected response for ${symbol}`);
          stockData.push({ symbol, price: "N/A" });
        }

        // Add delay between requests to prevent overwhelming the API with requests
        await delay(5000); // 5 seconds delay between requests

      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error.message);
        stockData.push({ symbol, price: "N/A" });
      }
    }

    // Insert stock data into the MySQL database
    const dbPromises = stockData
      .filter((stock) => stock.price !== "N/A")
      .map((stock) => {
        return new Promise((resolve, reject) => {
          const query = `INSERT INTO stocks (symbol, price, date_added) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE price = ?, date_added = NOW()`;
          db.query(query, [stock.symbol, stock.price, stock.price], (err, result) => {
            if (err) {
              console.error("Error inserting or updating stock data:", err);
              reject(err);
            } else {
              console.log(`Stock data upserted for ${stock.symbol}:`, result);
              resolve(result);
            }
          });
        });
      });

    await Promise.all(dbPromises);
    console.log("Stock data successfully updated in database.");

  } catch (error) {
    console.error("Error fetching stock data:", error.message);
  }
};

module.exports = stockService;
