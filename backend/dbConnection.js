// dbConnection.js
const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  host: "127.0.0.1", // Your database host
  user: "root", // Your MySQL username
  password: "123456789", // Your MySQL password
  database: "stock_data", // The database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db; // Export the db connection
