const mongoose = require("mongoose");

const thingSpeakSchema = new mongoose.Schema({
  sensorId: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  ldrValue: { type: Number, required: true },
  createdAt: { type: Date, required: true },
});

module.exports =
  mongoose.models.ThingSpeak || mongoose.model("ThingSpeak", thingSpeakSchema);
