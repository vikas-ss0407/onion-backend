const Bill = require('../models/Bill');
const Box = require('../models/Box');
const Shop = require('../models/Shop');
const User = require('../models/User');

exports.createBill = async (req, res) => {
  try {
    const { boxId, shopId, quantitySold, sellingPrice } = req.body;

    const box = await Box.findById(boxId);
    if (!box) return res.status(404).json({ message: 'Box not found' });

    if (quantitySold > box.quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    box.quantity -= quantitySold;
    await box.save();

    const shop = await Shop.findById(shopId);
    const user = await User.findById(req.user.id);

    const total = quantitySold * sellingPrice;

    const bill = new Bill({
      boxNumber: box.boxNumber,
      type: box.type,
      shopName: shop?.name || 'No Shop',
      shopAddress: shop?.address || 'No Address',
      fssaiNumber: shop?.fssai || 'N/A',
      quantity: quantitySold,
      costPrice: box.pricePerKg,
      sellingPrice,
      total,
      createdBy: req.user.id,
      
    });

    await bill.save();

    res.json({ bill, user: { name: user.name, address: user.address } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    const user = await User.findById(req.user.id);
    res.json({ bills, user: { name: user.name, address: user.address } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
