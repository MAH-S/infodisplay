require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

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

// CORS Middleware with explicit origin
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
