import jwt from "jsonwebtoken";

import User from "../models/user.js";

// Protección de rutas - Verificar token y autenticar usuario

export const protect = async (req, res, next) => {
  try {
    let token;

    // verificar si el token está presente en el encabezado de autorización
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Si no hay token, no autorizado
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Buscar usuario por ID y excluir la contraseña
    const user = await User.findById(decoded.id).select(
      "-contraseña"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Adjuntar el usuario autenticado al objeto de solicitud
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


// Admin Middleware - Verificar si el usuario es admin

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