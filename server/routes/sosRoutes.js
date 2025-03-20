const express = require("express");
const axios = require("axios");
const client = require("../config/twilio");
const User = require("../models/User"); // Import User model

const router = express.Router();

/**
 * 📌 Route: Send SOS Message
 * 🔹 Endpoint: POST /api/sos/send
 * 🔹 Description: Fetches user details and sends an SOS message via Twilio
 */
router.post("/send", async (req, res) => {
  const { userId, message, location } = req.body;

  if (!userId || !message || !location) {
    return res.status(400).json({ error: "User ID, message, and location are required." });
  }

  try {
    // Fetch user details from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const phoneNumber = "+919920807126";

    // Get location address from OpenStreetMap
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`;
    const response = await axios.get(nominatimUrl);
    const address = response.data.display_name || "Unknown location";

    // Construct the full SOS message
// Construct the shortened SOS message
const fullMessage = `SOS! ${message} - ${user.fullName}, ${address}`;

    // Send SOS message via Twilio
    await client.messages.create({
      body: fullMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber, // Send to user's registered phone number
    });

    res.status(200).json({ message: "SOS message sent successfully." });
  } catch (error) {
    console.error("Error sending SOS message:", error.message);
    res.status(500).json({ error: "Failed to send SOS message." });
  }
});

module.exports = router;