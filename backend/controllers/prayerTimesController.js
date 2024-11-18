// backend/controllers/prayerTimesController.js

const axios = require("axios");

exports.getPrayerTimes = async (req, res) => {
  try {
    const city = "Riyadh";
    const country = "Saudi Arabia";
    const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity`, {
      params: {
        city: city,
        country: country,
        method: 4,
      },
    });

    const prayerTimes = response.data.data.timings;

    res.json(prayerTimes);
  } catch (error) {
    console.error("Error fetching prayer times:", error.message);
    res.status(500).json({ error: "Error fetching prayer times" });
  }
};
