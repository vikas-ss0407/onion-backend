const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  days: { type: Number, required: true },       // 15, 30, 60
  status: { type: String, default: 'pending' }, // pending, completed, remind
  notifyDate: { type: Date, required: true },   // notification date
  completedAt: { type: Date }                   // when completed
});

const boxSchema = new mongoose.Schema({
  boxNumber: { type: String, required: true },
  type: { type: String },
  quantity: { type: Number, default: 0 },
  pricePerKg: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  maintenanceAlerts: [alertSchema]
});

module.exports = mongoose.models.Box || mongoose.model('Box', boxSchema);
