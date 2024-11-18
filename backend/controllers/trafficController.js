// backend/controllers/trafficController.js

exports.getTrafficStatus = (req, res) => {
    const trafficStatus = "Traffic is smooth in all directions.";
    res.json({ trafficStatus });
  };
  