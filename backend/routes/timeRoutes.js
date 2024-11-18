const express = require("express");
const router = express.Router();
const timeController = require("../controllers/timeController");

router.get("/time", timeController.getCurrentTime);

module.exports = router;
