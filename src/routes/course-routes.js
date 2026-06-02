import express from "express";

import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseContent,
} from "../controllers/course-controller.js";

import {
  protect,
  admin,
} from "../middlewares/auth-middleware.js";

const router = express.Router();

// ========================================
// Public Routes
// ========================================

router.get("/", getCourses);

router.get("/:id", getCourseById);

router.get("/:id/content", getCourseContent);

// ========================================
// Protected Routes
// ========================================

router.post("/", protect, admin, createCourse);

router.put("/:id", protect, admin, updateCourse);

router.delete("/:id", protect, admin, deleteCourse);

export default router;