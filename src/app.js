import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import userRoutes from "./routes/user-routes.js";
import courseRoutes from "./routes/course-routes.js";
import orderRoutes from "./routes/order-routes.js";

import notFoundMiddleware from "./middlewares/notFound-middleware.js";
import errorMiddleware from "./middlewares/error-middleware.js";

const app = express();

// ========================================
// Security Middlewares
// ========================================

app.use(helmet());

// ========================================
// Rate Limiting
// ========================================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again later.",
  },
});

app.use(limiter);

// ========================================
// Core Middlewares
// ========================================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ========================================
// Logger
// ========================================

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ========================================
// Health Check
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
  });
});

// ========================================
// API Routes
// ========================================

app.use("/api/users", userRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/orders", orderRoutes);

// ========================================
// Error Middlewares
// ========================================

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;