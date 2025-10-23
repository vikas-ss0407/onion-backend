const express = require("express");
const { fetchAndSaveLatest, getSensorData } = require("../controllers/thingSpeakController");
const router = express.Router();

// Fetch latest from ThingSpeak and store if ON
router.get("/fetch/:sensorId", fetchAndSaveLatest);

// Get all readings from DB
router.get("/sensor/:sensorId", getSensorData);

module.exports = router;
