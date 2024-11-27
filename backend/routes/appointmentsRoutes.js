// backend/routes/appointmentsRoutes.js

const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");

// Route for fetching appointments
router.get("/appointments", appointmentsController.getAppointments);

// Route to add an appointment
router.post("/appointments", appointmentsController.addAppointment);

// Route to update an appointment by ID
router.put("/appointments/:id", appointmentsController.updateAppointment);

// Route to delete an appointment by ID
router.delete("/appointments/:id", appointmentsController.deleteAppointment);

module.exports = router;
