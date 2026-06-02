import express from "express";

import {
  createOrder,
  getUserCourses,
} from "../controllers/order-controller.js";

import {
  protect,
} from "../middlewares/auth-middleware.js";

const router = express.Router();

// ========================================
// rutas protegidas - Solo para usuarios autenticados
// ========================================

// Crear una nueva orden
router.post("/", protect, createOrder);

// Obtener los cursos comprados por el usuario
router.get("/my-courses", protect, getUserCourses);

export default router;