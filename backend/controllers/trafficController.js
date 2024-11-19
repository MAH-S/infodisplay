// backend/controllers/trafficController.js
const axios = require("axios");

const trafficController = {};

trafficController.getTrafficData = async (req, res) => {
  try {
    const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
    const lat = "24.7136"; // Riyadh Latitude
    const lng = "46.6753"; // Riyadh Longitude

    // Corrected Google Maps Static API URL with appropriate parameters
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=600x400&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${googleMapsApiKey}`;

    console.log("Generated Map URL:", url);

    res.json({ trafficInfo: "Traffic is smooth in all directions.", mapUrl: url });
  } catch (error) {
    console.error("Error fetching traffic data:", error);
    res.status(500).json({ error: "Error fetching traffic data" });
  }
};

module.exports = trafficController;
