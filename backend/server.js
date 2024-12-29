require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./dbConnection"); // Import the MySQL connection
const stockService = require("./services/stockService"); // Import stockService

const app = express();
const PORT = process.env.PORT || 5050;

// Import routes
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const prayerTimesRoutes = require("./routes/prayerTimesRoutes");
const stockRoutes = require("./routes/stockRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const trafficRoutes = require("./routes/trafficRoutes");
const timeRoutes = require("./routes/timeRoutes");
const eventRouter = require("./routes/eventRouter"); // Import eventRouter

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Middleware to allow requests from all IPs
app.use((req, res, next) => {
  const clientIP = req.headers["x-forwarded-for"] || req.ip;
  console.log(`Request received from IP: ${clientIP}`);
  next(); // Allow all requests
});

// CORS Middleware with explicit origin
app.use(
  cors({
    origin: ["http://localhost:3000", "http://95.177.217.236"], // Allow frontend and public IP
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials (cookies, HTTP auth, etc.)
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use routes
app.use("/api", appointmentsRoutes);
app.use("/api", prayerTimesRoutes);
app.use("/api", stockRoutes);
app.use("/api", weatherRoutes);
app.use("/api", trafficRoutes);
app.use("/api", timeRoutes);
app.use("/api", eventRouter); // Use eventRouter

// Schedule stock updates every 1 minute
setInterval(() => {
  stockService.scheduleStockUpdate();
}, 60000);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// Function to retry connecting to the database
function connectWithRetry() {
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      console.log("Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    } else {
      console.log("Connected to MySQL database");
    }
  });
}

// Connect to the database with retry logic
connectWithRetry();
