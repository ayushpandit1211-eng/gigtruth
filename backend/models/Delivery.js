const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  distance: { type: Number, required: true },
  companyPay: { type: Number, required: true },
  fuelCost: { type: Number },
  realProfit: { type: Number },
  timeAllowed: { type: Number },
  weatherCondition: { type: String, default: 'Clear' },
  riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  status: { type: String, enum: ['Completed', 'Cancelled', 'Incident'], default: 'Completed' },
  incident: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', deliverySchema);