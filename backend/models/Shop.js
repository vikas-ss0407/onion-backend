const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  fssai: { type: String },
  phone: { type: String }, 
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.models.Shop || mongoose.model('Shop', shopSchema);
