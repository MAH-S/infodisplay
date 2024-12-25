require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./dbConnection"); // Import the MySQL connection

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

// Import stockService to schedule updates
const stockService = require("./services/stockService");

// Middleware to allow requests only from specific IPs
app.use((req, res, next) => {
  const allowedIPs = [
    "95.177.217.236", // Your server's public IP
    "127.0.0.1",      // Localhost (IPv4)
    "::1",            // Localhost (IPv6)
  ];

  // Extract the client IP (account for reverse proxies)
  const clientIP = req.headers["x-forwarded-for"] || req.ip;

  // Check if the client IP is explicitly allowed
  if (
    allowedIPs.includes(clientIP) ||                  // Direct match
    clientIP.startsWith("::ffff:") &&                 // IPv4-mapped IPv6 support
    allowedIPs.includes(clientIP.replace("::ffff:", ""))
  ) {
    next(); // Allow the request
  } else {
    console.warn(`Blocked request from IP: ${clientIP}`);
    res.status(403).send("Access Denied: Your IP is not allowed.");
  }
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
app.listen(PORT, "0.0.0.0", () => { // Listen on all network interfaces
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
