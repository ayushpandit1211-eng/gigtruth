const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');
const auth = require('../middleware/auth');

// Smart risk detection function
const calculateRisk = (distance, weather, timeAllowed) => {
  let risk = 'Low';
  if (weather === 'Rain' || weather === 'Storm') risk = 'High';
  else if (weather === 'Fog' || weather === 'Heat') risk = 'Medium';
  if (distance > 5 && timeAllowed < 15) risk = 'High';
  return risk;
};

// Real profit calculator (fuel both ways)
const calculateProfit = (companyPay, distance) => {
  const fuelPerKm = 4; // ₹4 per km average
  const fuelCost = distance * 2 * fuelPerKm; // both ways
  const realProfit = companyPay - fuelCost;
  return { fuelCost, realProfit };
};

// CREATE delivery
router.post('/', auth, async (req, res) => {
  try {
    const { distance, companyPay, timeAllowed, weatherCondition, status, incident } = req.body;
    const { fuelCost, realProfit } = calculateProfit(companyPay, distance);
    const riskLevel = calculateRisk(distance, weatherCondition, timeAllowed);

    const delivery = new Delivery({
      rider: req.user.id,
      distance,
      companyPay,
      fuelCost,
      realProfit,
      timeAllowed,
      weatherCondition,
      riskLevel,
      status,
      incident
    });

    await delivery.save();
    res.json({ delivery, message: '✅ Delivery logged successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// READ all deliveries of logged in rider
router.get('/', auth, async (req, res) => {
  try {
    const deliveries = await Delivery.find({ rider: req.user.id }).sort({ createdAt: -1 });
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// READ dashboard summary
router.get('/summary', auth, async (req, res) => {
  try {
    const deliveries = await Delivery.find({ rider: req.user.id });
    const totalDeliveries = deliveries.length;
    const totalEarned = deliveries.reduce((sum, d) => sum + d.companyPay, 0);
    const totalFuel = deliveries.reduce((sum, d) => sum + d.fuelCost, 0);
    const totalRealProfit = deliveries.reduce((sum, d) => sum + d.realProfit, 0);
    const highRiskCount = deliveries.filter(d => d.riskLevel === 'High').length;
    const incidents = deliveries.filter(d => d.status === 'Incident').length;

    res.json({
      totalDeliveries,
      totalEarned,
      totalFuel,
      totalRealProfit,
      highRiskCount,
      incidents
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// UPDATE delivery
router.put('/:id', auth, async (req, res) => {
  try {
    const delivery = await Delivery.findOneAndUpdate(
      { _id: req.params.id, rider: req.user.id },
      req.body,
      { new: true }
    );
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE delivery
router.delete('/:id', auth, async (req, res) => {
  try {
    await Delivery.findOneAndDelete({ _id: req.params.id, rider: req.user.id });
    res.json({ message: '🗑️ Delivery deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;