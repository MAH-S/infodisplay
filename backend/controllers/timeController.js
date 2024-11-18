exports.getCurrentTime = (req, res) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const currentTime = new Date().toLocaleTimeString([], options);
    res.json({ currentTime });
  };
  