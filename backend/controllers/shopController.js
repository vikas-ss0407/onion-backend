const Shop = require('../models/Shop');


exports.createShop = async (req, res) => {
  try {
    const { name, address, fssai, phone } = req.body; 
    const shop = new Shop({ name, address, fssai, phone, owner: req.user.id });
    await shop.save();
    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getShops = async (req, res) => {
try {
const shops = await Shop.find({ owner: req.user.id });
res.json(shops);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.deleteShop = async (req, res) => {
try {
await Shop.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};

exports.updateShop = async (req, res) => {
  try {
    const { name, address, phone, fssai } = req.body;
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { name, address, phone, fssai },
      { new: true } 
    );
    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
