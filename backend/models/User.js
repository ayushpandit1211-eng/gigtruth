const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String, enum: ['Blinkit', 'Swiggy', 'Zomato', 'Other'], default: 'Other' },
  city: { type: String, default: '' },
  dream: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);