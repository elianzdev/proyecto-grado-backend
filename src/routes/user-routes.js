import express from "express";

import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user-controller.js";

import {
  protect,
  admin,
} from "../middlewares/auth-middleware.js";

const router = express.Router();

// ========================================
// Public Routes
// ========================================

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// ========================================
// Protected Routes
// ========================================

// Get All Users
router.get("/", protect, admin, getUsers);

// Get User By ID
router.get("/:id", protect, getUserById);

// Update User
router.put("/:id", protect, updateUser);

// Delete User
router.delete("/:id", protect, admin, deleteUser);

export default router;