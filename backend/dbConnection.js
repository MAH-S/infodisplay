const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "my-mysql-container", // use environment variables for config
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456789",
  database: process.env.DB_NAME || "stock_data",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
