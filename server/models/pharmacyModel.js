const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  distance: { type: Number, required: true }, // Distance in km
  open24x7: { type: Boolean, default: false },
  deliveryAvailable: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  emergencyService: { type: Boolean, default: false }, 
});

module.exports = mongoose.model("Pharmacy", pharmacySchema);
