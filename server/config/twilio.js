require("dotenv").config();
const twilio = require("twilio");

// Initialize Twilio client using environment variables
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = client;