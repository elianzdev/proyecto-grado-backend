import jwt from "jsonwebtoken";

import User from "../models/user.js";

// ========================================
// Protect Routes Middleware
// ========================================

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No valid token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-contraseña");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach authenticated user
    req.usuario = user;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    res.status(403).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

// ========================================
// Admin Middleware
// ========================================

export const admin = (req, res, next) => {
  try {
    if (!req.usuario || req.usuario.rol !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying admin role",
      error: error.message,
    });
  }
};