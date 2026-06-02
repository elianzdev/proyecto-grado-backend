import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    contraseña: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    rol: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;