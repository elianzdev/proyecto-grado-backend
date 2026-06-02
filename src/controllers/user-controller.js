import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

// Registrar un nuevo usuario

export const registerUser = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    const existingUser = await User.findOne({ correo });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const newUser = new User({
      nombre,
      correo,
      contraseña: hashedPassword,
      rol,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        nombre: newUser.nombre,
        correo: newUser.correo,
        rol: newUser.rol,
      },
    });
  } catch (error) {
    console.error("Register user error:", error.message);

    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};


// Login de usuario

export const loginUser = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      contraseña,
      user.contraseña
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};


// obtener todos los usuarios

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-contraseña");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};


// Obtener usuario por ID

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-contraseña");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};


// Actualizar usuario

export const updateUser = async (req, res) => {
  try {
    const { nombre, correo, rol } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        correo,
        rol,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-contraseña");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};


// Eliminar un usuario

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};