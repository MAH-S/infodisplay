// backend/routes/stockRoutes.js

const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

// Route to get saved stock data
router.get("/saved-stocks", stockController.getSavedStocks);

module.exports = router;
