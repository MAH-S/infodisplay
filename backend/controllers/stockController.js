const db = require('../dbConnection');

exports.getSavedStocks = (req, res) => {
  const query = `SELECT symbol, price, direction, date_added FROM stocks ORDER BY date_added DESC`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching stock data from database:", err);
      res.status(500).json({ error: "Error fetching stock data from database" });
    } else {
      res.json(results);
    }
  });
};
