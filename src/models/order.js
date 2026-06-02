import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cursos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    ],

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;