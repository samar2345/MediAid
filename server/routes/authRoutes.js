const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Change this to a secure secret

// Middleware to log request debugging info
const logRequestInfo = (req, res, next) => {
  console.log("🔍 Request Details:");
  console.log("- Method:", req.method);
  console.log("- URL:", req.url);
  console.log("- Content-Type:", req.headers['content-type']);
  console.log("- Body:", req.body);
  next();
};

// Apply middleware
router.use(logRequestInfo);
router.use(express.json());

// 📌 Register New User
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword, role } = req.body;
    
    console.log("Registration request body:", req.body);

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    let userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: "Email or phone number already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, phone, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
});

// 📌 Login User
router.post("/login", express.json(), async (req, res) => {
  try {
    console.log("Login request headers:", req.headers);
    console.log("Login request body:", req.body);
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty request body. Please provide email and password." });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: "1h" }
    );

    // Return user info without password
    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role
    };

    res.status(200).json({ 
      token, 
      user: userResponse,
      message: "Login successful" 
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
});

// 📌 Get User Profile (Protected Route)
router.get("/profile", async (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Access Denied. No Token Provided!" });
    }

    const token = authHeader.split(" ")[1];
    
    const verified = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Profile error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid Token!" });
    }
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
});

// 📌 Logout User (Optional - handle on client side by removing token)
router.get("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
