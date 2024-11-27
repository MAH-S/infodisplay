'use strict';
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../dbConnection');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use a timestamp to ensure unique filenames
  },
});

// File filter to accept only image types (jpeg, jpg, png, gif)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const isExtensionValid = allowedFileTypes.test(file.originalname.toLowerCase());
  const isMimeTypeValid = allowedFileTypes.test(file.mimetype);

  if (isExtensionValid && isMimeTypeValid) {
    cb(null, true);
  } else {
    cb(new Error('Error: Only images of type jpeg, jpg, png, gif are allowed!'), false);
  }
};

// Set file size limit to 5MB and initialize upload
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

const eventController = {};

// Controller to add a new event with optional image
eventController.addEvent = (req, res) => {
  const { title, description, time, textAlign, fontSize, textColor } = req.body;
  const image = req.file ? req.file.filename : null;

  // Check for required fields
  if (!title || !time) {
    return res.status(400).json({ error: 'Title and time are required fields' });
  }

  // Provide default values for optional fields
  const finalDescription = description || ""; // Default to an empty string if undefined
  const finalTextAlign = textAlign || "left"; // Default alignment
  const finalFontSize = fontSize ? parseInt(fontSize, 10) : 16; // Default to 16 if undefined
  const finalTextColor = textColor || "#ffffff"; // Default to white if undefined

  // Check if fontSize is a valid number
  if (isNaN(finalFontSize)) {
    return res.status(400).json({ error: 'Font size must be a number' });
  }

  const query = `INSERT INTO events 
                 (title, description, time, image, text_align, font_size, text_color) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [title, finalDescription, time, image, finalTextAlign, finalFontSize, finalTextColor],
    (err, result) => {
      if (err) {
        console.error('Error adding event:', err);
        return res.status(500).json({ error: 'Error adding event' });
      }
      res.status(201).json({ message: 'Event added successfully', eventId: result.insertId });
    }
  );
};

// Controller to get all events
eventController.getAllEvents = (req, res) => {
  const query = 'SELECT * FROM events ORDER BY time DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ error: 'Error fetching events' });
    }
    res.json(results);
  });
};

// Controller to update an event
eventController.updateEvent = (req, res) => {
  const { id } = req.params;
  const { title, description, time, textAlign, fontSize, textColor } = req.body;
  const image = req.file ? req.file.filename : null;

  // Provide default values for optional fields
  const finalDescription = description || ""; // Default to an empty string if undefined
  const finalTextAlign = textAlign || "left"; // Default alignment
  const finalFontSize = fontSize ? parseInt(fontSize, 10) : 16; // Default to 16 if undefined
  const finalTextColor = textColor || "#ffffff"; // Default to white if undefined

  // Check if fontSize is a valid number
  if (isNaN(finalFontSize)) {
    return res.status(400).json({ error: 'Font size must be a number' });
  }

  let query = 'UPDATE events SET title = ?, description = ?, time = ?, text_align = ?, font_size = ?, text_color = ?';
  const values = [title, finalDescription, time, finalTextAlign, finalFontSize, finalTextColor];

  if (image) {
    query += ', image = ?';
    values.push(image);
  }

  query += ' WHERE id = ?';
  values.push(id);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating event:', err);
      return res.status(500).json({ error: 'Error updating event' });
    }
    res.json({ message: 'Event updated successfully' });
  });
};

// Controller to delete an event
eventController.deleteEvent = (req, res) => {
  const { id } = req.params;

  // First, get the image filename so we can delete it if it exists
  const selectQuery = 'SELECT image FROM events WHERE id = ?';
  db.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error('Error finding event:', err);
      return res.status(500).json({ error: 'Error finding event' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const image = results[0].image;
    if (image) {
      const imagePath = path.join(__dirname, '../uploads', image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image file:', err);
        }
      });
    }

    // Delete the event from the database
    const deleteQuery = 'DELETE FROM events WHERE id = ?';
    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error('Error deleting event:', err);
        return res.status(500).json({ error: 'Error deleting event' });
      }
      res.json({ message: 'Event deleted successfully' });
    });
  });
};

module.exports = { eventController, upload };
