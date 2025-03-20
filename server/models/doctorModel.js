const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0, // Default rating if none is provided
  },
  profileImage: {
    type: String, // URL or file path to the doctor's profile image
  },
  appointmentFee: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true, // True if available for consultation
  },
  emergencyAvailable: {
    type: Boolean,
    default: false, // True if available for emergency cases
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
