// backend/routes/eventRouter.js

const express = require("express");
const router = express.Router();
const { eventController, upload } = require("../controllers/eventController");

// Route to add a new event with optional image
router.post('/events', upload.single('image'), eventController.addEvent);

// Route to get all events
router.get("/events", eventController.getAllEvents);

// Route to update an event (including updating the image)
router.put("/events/:id", upload.single("image"), eventController.updateEvent);

// Route to delete an event
router.delete("/events/:id", eventController.deleteEvent);

module.exports = router;
