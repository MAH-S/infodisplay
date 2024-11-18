// backend/controllers/stockController.js

const db = require("../dbConnection");
const stockService = require("../services/stockService");

// Schedule stock updates using the service
exports.scheduleStockUpdate = () => {
  stockService.scheduleStockUpdate();
};

// Function to get saved stock data from the database
exports.getSavedStocks = (req, res) => {
  const query = `SELECT symbol, price, date_added FROM stocks ORDER BY date_added DESC`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching stock data from database:", err);
      res.status(500).json({ error: "Error fetching stock data from database" });
    } else {
      res.json(results);
    }
  });
};
