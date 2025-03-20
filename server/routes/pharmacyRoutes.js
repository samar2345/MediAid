const express = require("express");
const Pharmacy = require("../models/pharmacyModel");

const router = express.Router();

/**
 * 📌 Route: Get All Pharmacies
 * 🔹 Endpoint: GET /api/pharmacies
 * 🔹 Description: Fetch all pharmacies
 */
router.get("/", async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pharmacies" });
  }
});

/**
 * 📌 Route: Get Pharmacies with Filters
 * 🔹 Endpoint: GET /api/pharmacies/filter
 * 🔹 Description: Get pharmacies based on filters (emergency, delivery, rating)
 */
router.get("/filter", async (req, res) => {
  try {
    const { emergency, delivery, sortBy } = req.query;

    let filter = {};
    if (emergency === "true") filter.emergencyService = true;
    if (delivery === "true") filter.deliveryAvailable = true;

    let pharmacies = await Pharmacy.find(filter);

    // Sorting Logic
    if (sortBy === "rating") pharmacies.sort((a, b) => b.rating - a.rating);
    if (sortBy === "distance") pharmacies.sort((a, b) => a.distance - b.distance);

    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ error: "Error filtering pharmacies" });
  }
});

/**
 * 📌 Route: Add a New Pharmacy
 * 🔹 Endpoint: POST /api/pharmacies/add
 * 🔹 Description: Add a new pharmacy
 */
router.post("/add", async (req, res) => {
  try {
    const pharmacy = new Pharmacy(req.body);
    await pharmacy.save();
    res.status(201).json({ message: "Pharmacy added successfully", pharmacy });
  } catch (error) {
    res.status(400).json({ error: "Error adding pharmacy" });
  }
});

module.exports = router;
