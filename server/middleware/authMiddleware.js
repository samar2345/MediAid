const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided!" });

  try {
    token = token.split(" ")[1]; // Remove "Bearer"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token!" });
  }
};

module.exports = protect;
