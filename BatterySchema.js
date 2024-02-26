const mongoose = require('mongoose');

const BatterySchema = new mongoose.Schema({
  batteryId: {
    type: String,
    required: true,
    unique: true,
  },
  batteryname: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  soc: {
    type: Number,
    required: true,
  },
  chargerate: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    min: 2,
    max: 50,
  },
}, {timestamps: true});

const Battery = mongoose.model('Battery', BatterySchema);

module.exports = Battery;
