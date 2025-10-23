const Box = require('../models/Box');

const computeMaintenanceAlerts = (createdAt) => {
  const alerts = [15, 30, 60].map(days => {
    const deadline = new Date(createdAt);
    deadline.setDate(deadline.getDate() + days);
    const notifyDate = new Date(deadline);
    notifyDate.setDate(notifyDate.getDate() - 2);
    return { days, status: 'pending', notifyDate };
  });
  return alerts;
};

exports.createBox = async (req, res) => {
  try {
    const { boxNumber, type, quantity, pricePerKg } = req.body;
    const userId = req.user._id;

    const existingBox = await Box.findOne({ boxNumber, userId });
    if (existingBox) return res.status(400).json({ message: "Box number already exists" });
    if (Number(quantity) === 0) return res.status(400).json({ message: "Quantity cannot be 0" });

    const box = new Box({
      boxNumber, type, quantity, pricePerKg, userId,
      maintenanceAlerts: computeMaintenanceAlerts(new Date())
    });

    await box.save();
    res.json(box);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBoxes = async (req, res) => {
  try {
    const boxes = await Box.find({ userId: req.user._id });
    res.json(boxes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBox = async (req, res) => {
  try {
    const { boxNumber, quantity } = req.body;

    if (Number(quantity) === 0) {
      await Box.findByIdAndDelete(req.params.id);
      return res.json({ message: "Box deleted because quantity is 0" });
    }

    if (boxNumber) {
      const existingBox = await Box.findOne({
        boxNumber,
        _id: { $ne: req.params.id },
        userId: req.user._id
      });
      if (existingBox) return res.status(400).json({ message: "Box number already exists" });
    }

    const updated = await Box.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBox = async (req, res) => {
  try {
    await Box.findByIdAndDelete(req.params.id);
    res.json({ message: 'Box deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAlert = async (req, res) => {
  try {
    const { alertDays, action } = req.body;
    const box = await Box.findById(req.params.id);
    if (!box) return res.status(404).json({ message: 'Box not found' });

    const alert = box.maintenanceAlerts.find(a => a.days === alertDays);
    if (!alert) return res.status(400).json({ message: 'Alert not found' });

    if (action === 'completed') {
      alert.status = 'completed';
      alert.completedAt = new Date();
    } else if (action === 'remind') {
      alert.status = 'remind';
      alert.notifyDate = new Date(Date.now() + 24*60*60*1000);
    }

    await box.save();
    res.json(box);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
