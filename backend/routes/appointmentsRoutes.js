// backend/routes/appointmentsRoutes.js

const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");

// Route for fetching appointments
router.get("/appointments", appointmentsController.getAppointments);

// Route for fetching events
router.get("/events", appointmentsController.getEvents);

module.exports = router;
