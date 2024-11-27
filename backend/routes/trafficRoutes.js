// backend/routes/trafficRoutes.js

const express = require("express");
const router = express.Router();
const trafficController = require("../controllers/trafficController");

// Route to get traffic status
router.get("/traffic", trafficController.getTrafficData);

module.exports = router;
