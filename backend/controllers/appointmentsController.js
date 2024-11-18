// backend/controllers/appointmentsController.js

exports.getAppointments = (req, res) => {
    const appointments = [
      { title: "Dentist Appointment", time: "31:00 PM" },
      { title: "Client Meeting", time: "4:30 PM" },
    ];
    res.json(appointments);
  };
  
  exports.getEvents = (req, res) => {
    const events = [
      { title: "Team Meeting", time: "10:00 AM" },
      { title: "Doctor's Appointment", time: "2:00 PM" },
    ];
    res.json(events);
  };
  