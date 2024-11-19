'use strict';
const yahooFinance = require('yahoo-finance2').default;
const db = require('../dbConnection');
const delay = require('../utils/delay');

const stockService = {};

stockService.scheduleStockUpdate = async () => {
  try {
    // Adding STC (Saudi Telecom Company) with its common Yahoo Finance symbol "7010.SR"
    const symbols = ["AAPL", "AMZN", "GOOGL", "MSFT", "NVDA", "GC=F", "7010.SR"];
    const stockData = [];

    for (let symbol of symbols) {
      console.log(`Fetching stock data for ${symbol} from Yahoo Finance API...`);
      try {
        const quote = await yahooFinance.quote(symbol);

        if (quote && quote.regularMarketPrice) {
          // Rename "GC=F" to "Gold" for better readability
          if (symbol === "GC=F") {
            symbol = "Gold";
          } else if (symbol === "7010.SR") {
            symbol = "STC"; // Rename the symbol to STC for better readability
          }

          // Fetch previous price from the database
          const previousQuery = `SELECT price FROM stocks WHERE symbol = ?`;
          db.query(previousQuery, [symbol], (err, results) => {
            if (err) {
              console.error("Error fetching stock data from database:", err);
              return;
            }

            const previousPrice = results.length > 0 ? results[0].price : null;
            const currentPrice = quote.regularMarketPrice;

            let direction = "same";
            if (previousPrice !== null) {
              if (currentPrice > previousPrice) {
                direction = "up";
              } else if (currentPrice < previousPrice) {
                direction = "down";
              }
            }

            // Insert or update stock data in the database
            const queryInsertOrUpdate = `
              INSERT INTO stocks (symbol, price, direction, date_added)
              VALUES (?, ?, ?, NOW())
              ON DUPLICATE KEY UPDATE price = ?, direction = ?, date_added = NOW()
            `;
            db.query(
              queryInsertOrUpdate,
              [symbol, currentPrice, direction, currentPrice, direction],
              (err, result) => {
                if (err) {
                  console.error("Error inserting or updating stock data:", err);
                } else {
                  console.log(`Stock data upserted for ${symbol}:`, result);
                }
              }
            );
          });

          stockData.push({ symbol, price: quote.regularMarketPrice });
        } else {
          console.error(`Unexpected response for ${symbol}`);
        }

        // Add delay between requests to prevent overwhelming the API with requests
        await delay(5000);
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error.message);
      }
    }

    console.log("Stock data successfully updated in database.");
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
  }
};

module.exports = stockService;
