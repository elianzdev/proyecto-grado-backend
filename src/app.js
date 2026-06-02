import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API running successfully"
  });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/orders", orderRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;
