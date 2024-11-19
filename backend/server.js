require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

// Import routes
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const prayerTimesRoutes = require("./routes/prayerTimesRoutes");
const stockRoutes = require("./routes/stockRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const trafficRoutes = require("./routes/trafficRoutes");
const timeRoutes = require("./routes/timeRoutes");

// Import stockService to schedule updates
const stockService = require("./services/stockService"); // Import stockService

// CORS Middleware with explicit origin
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

// Use routes
app.use("/api", appointmentsRoutes);
app.use("/api", prayerTimesRoutes);
app.use("/api", stockRoutes);
app.use("/api", weatherRoutes);
app.use("/api", trafficRoutes);
app.use("/api", timeRoutes);

// Schedule stock updates every 1 minute
setInterval(() => {
  stockService.scheduleStockUpdate();
}, 60000);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
