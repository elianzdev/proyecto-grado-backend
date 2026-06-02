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

// Rutas públicas

// Registrar nuevo usuario
router.post("/register", registerUser);

// Login de usuario
router.post("/login", loginUser);

// Rutas protegidas - Solo para administradores

// obtener todos los usuarios
router.get("/", protect, admin, getUsers);

// Obtener usuario por ID
router.get("/:id", protect, getUserById);

// Actualizar usuario
router.put("/:id", protect, updateUser);

// Eliminar usuario
router.delete("/:id", protect, admin, deleteUser);

export default router;