const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  boxNumber: String,
  type: String,
  shopName: String,
  shopAddress: String,
  fssaiNumber: String,
  quantity: Number,
  costPrice: Number,
  sellingPrice: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.models.Bill || mongoose.model('Bill', billSchema);
