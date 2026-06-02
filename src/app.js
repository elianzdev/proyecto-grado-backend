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

// segurridad - Helmet para proteger contra vulnerabilidades comunes

app.use(helmet());

// Rate Limiting - Limitar el número de solicitudes por IP para prevenir ataques de fuerza bruta


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

// Core Middleware - CORS para permitir solicitudes desde el frontend

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

// Logger - Morgan para registrar solicitudes HTTP en desarrollo

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}


// Rutas básicas

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
  });
});


// Rutas de la API

app.use("/api/users", userRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/orders", orderRoutes);

// Error Handling Middleware - Manejar rutas no encontradas y errores generales

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;