const axios = require("axios");
const ThingSpeak = require("../models/ThingSpeak");

const CHANNEL_ID = process.env.THINGSPEAK_CHANNEL_ID;
const READ_API_KEY = process.env.THINGSPEAK_READ_API_KEY;

// Fetch latest from ThingSpeak AND save to MongoDB only if sensor is "on"
exports.fetchAndSaveLatest = async (req, res) => {
  const sensorId = req.params.sensorId || "sensor1";

  try {
    const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=1`;
    const response = await axios.get(url);
    const feed = response.data.feeds[0];

    if (!feed) {
      return res.status(200).json({ isSensorOn: false, message: "No data available" });
    }

    const temperature = Number(feed.field1);
    const humidity = Number(feed.field2);
    const ldrValue = Number(feed.field3);
    const createdAt = new Date(feed.created_at);

    // Sensor ON check: reading within last 5 minutes
    const now = new Date();
    const DIFF_MINUTES = 2;
    const isSensorOn = now - createdAt <= DIFF_MINUTES * 60 * 1000;

    if (!isSensorOn) {
      return res.status(200).json({ isSensorOn: false, message: "Sensor is OFF — not saving data" });
    }

    // Check for duplicates by timestamp
    const existing = await ThingSpeak.findOne({ sensorId, createdAt });
    if (existing) {
      return res.status(200).json({ isSensorOn: true, message: "Duplicate — not saved" });
    }

    // Save new data
    const saved = await ThingSpeak.create({ sensorId, temperature, humidity, ldrValue, createdAt });
    res.json({ isSensorOn: true, data: saved });

  } catch (err) {
    res.status(500).json({ isSensorOn: false, message: "Error fetching data" });
  }
};

// Get all readings from MongoDB for a sensor
exports.getSensorData = async (req, res) => {
  const sensorId = req.params.sensorId || "sensor1";

  try {
    const data = await ThingSpeak.find({ sensorId }).sort({ createdAt: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sensor data" });
  }
};
