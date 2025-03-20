const express = require("express");
const Doctor = require("../models/doctorModel");

const router = express.Router();

/**
 * 📌 Route: Get All Doctors
 * 🔹 Endpoint: GET /api/doctors/all
 * 🔹 Description: Fetch all registered doctors
 */
router.get("/all", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctors" });
  }
});

/**
 * 📌 Route: Get Single Doctor by ID
 * 🔹 Endpoint: GET /api/doctors/:id
 * 🔹 Description: Fetch doctor profile by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctor profile" });
  }
});

/**
 * 📌 Route: Add a New Doctor (Admin Only)
 * 🔹 Endpoint: POST /api/doctors/add
 * 🔹 Description: Add a new doctor profile
 */
router.post("/add", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    res.status(400).json({ error: "Error adding doctor" });
  }
});

module.exports = router;
