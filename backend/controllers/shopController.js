const Shop = require('../models/Shop');

// Create Shop
exports.createShop = async (req, res) => {
  try {
    const { name, address, fssai, phone } = req.body;
    const shop = new Shop({
      name,
      address,
      fssai,
      phone,
      owner: req.user._id, // ✅ use _id from auth middleware
    });
    await shop.save();
    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Shops of logged-in user
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find({ owner: req.user._id }); // ✅ consistent with _id
    res.json(shops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Shop
exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!shop) return res.status(404).json({ message: 'Shop not found or unauthorized' });
    res.json({ message: 'Shop deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Shop
exports.updateShop = async (req, res) => {
  try {
    const { name, address, phone, fssai } = req.body;
    const shop = await Shop.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id }, // ✅ only update owned shops
      { name, address, phone, fssai },
      { new: true }
    );
    if (!shop) return res.status(404).json({ message: 'Shop not found or unauthorized' });
    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
