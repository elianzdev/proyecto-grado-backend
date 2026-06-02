import jwt from "jsonwebtoken";

import User from "../models/user.js";

// ========================================
// Protect Middleware
// ========================================

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Token not found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // Verify Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find User
    const user = await User.findById(decoded.id).select(
      "-contraseña"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user to request
    req.usuario = user;

    next();
  } catch (error) {
    console.error("Protect middleware error:", error.message);

    res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
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
        message: "Access denied. Admin only",
      });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};