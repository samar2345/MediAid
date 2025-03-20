const express = require("express");
const router = express.Router();
const transporter = require("../config/nodemailerConfig");

router.post("/send-email", async (req, res) => {
  const { name, email, phone, date, time, condition, notes } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Appointment Confirmation",
    text: `Hello ${name},\n\nYour appointment is confirmed:\n📅 Date: ${date}\n⏰ Time: ${time}\n📞 Phone: ${phone}\n🩺 Condition: ${condition}\n📝 Notes: ${notes}\n\nThank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;
