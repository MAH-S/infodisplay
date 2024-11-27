const db = require('../dbConnection'); // Import the database connection

// Controller to get all appointments from the database
exports.getAppointments = (req, res) => {
  const query = 'SELECT * FROM appointments ORDER BY time DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      return res.status(500).json({ error: 'Error fetching appointments' });
    }
    res.status(200).json(results);
  });
};

// Controller to get all events from the database
exports.getEvents = (req, res) => {
  const query = 'SELECT * FROM events ORDER BY time DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ error: 'Error fetching events' });
    }
    res.status(200).json(results);
  });
};

// Controller to add a new appointment
exports.addAppointment = (req, res) => {
  const { title, time } = req.body;

  if (!title || !time) {
    return res.status(400).json({ error: 'Title and time are required fields' });
  }

  const query = 'INSERT INTO appointments (title, time) VALUES (?, ?)';
  db.query(query, [title, time], (err, result) => {
    if (err) {
      console.error('Error adding appointment:', err);
      return res.status(500).json({ error: 'Error adding appointment' });
    }
    res.status(201).json({ message: 'Appointment added successfully', appointmentId: result.insertId });
  });
};

// Controller to update an existing appointment
exports.updateAppointment = (req, res) => {
  const { id } = req.params;
  const { title, time } = req.body;

  if (!title || !time) {
    return res.status(400).json({ error: 'Title and time are required fields' });
  }

  const query = 'UPDATE appointments SET title = ?, time = ? WHERE id = ?';
  db.query(query, [title, time, id], (err, result) => {
    if (err) {
      console.error('Error updating appointment:', err);
      return res.status(500).json({ error: 'Error updating appointment' });
    }
    res.status(200).json({ message: 'Appointment updated successfully' });
  });
};


// Controller to delete an appointment
exports.deleteAppointment = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM appointments WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting appointment:', err);
      return res.status(500).json({ error: 'Error deleting appointment' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  });
};

// Controller to add a new event
exports.addEvent = (req, res) => {
  const { title, time, description } = req.body;

  if (!title || !time) {
    return res.status(400).json({ error: 'Title and time are required fields' });
  }

  const query = 'INSERT INTO events (title, time, description) VALUES (?, ?, ?)';
  db.query(query, [title, time, description], (err, result) => {
    if (err) {
      console.error('Error adding event:', err);
      return res.status(500).json({ error: 'Error adding event' });
    }
    res.status(201).json({ message: 'Event added successfully', eventId: result.insertId });
  });
};

// Controller to update an existing event
exports.updateEvent = (req, res) => {
  const { id } = req.params;
  const { title, time, description } = req.body;

  if (!title || !time) {
    return res.status(400).json({ error: 'Title and time are required fields' });
  }

  const query = 'UPDATE events SET title = ?, time = ?, description = ? WHERE id = ?';
  db.query(query, [title, time, description, id], (err, result) => {
    if (err) {
      console.error('Error updating event:', err);
      return res.status(500).json({ error: 'Error updating event' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully' });
  });
};

// Controller to delete an event
exports.deleteEvent = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM events WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting event:', err);
      return res.status(500).json({ error: 'Error deleting event' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  });
};
