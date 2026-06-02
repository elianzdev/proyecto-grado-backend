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
// Protected Routes
// ========================================

// Create Order
router.post("/", protect, createOrder);

// Get User Purchased Courses
router.get("/my-courses", protect, getUserCourses);

export default router;