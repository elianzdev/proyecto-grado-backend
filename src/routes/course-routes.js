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

// Rutas públicas


router.get("/", getCourses);

router.get("/:id", getCourseById);

router.get("/:id/content", getCourseContent);

// Rutas protegidas - Solo para administradores


router.post("/", protect, admin, createCourse);

router.put("/:id", protect, admin, updateCourse);

router.delete("/:id", protect, admin, deleteCourse);

export default router;