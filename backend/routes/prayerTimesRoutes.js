// backend/routes/prayerTimesRoutes.js

const express = require("express");
const router = express.Router();
const prayerTimesController = require("../controllers/prayerTimesController");

// Route to get prayer times
router.get("/prayer-times", prayerTimesController.getPrayerTimes);

module.exports = router;
