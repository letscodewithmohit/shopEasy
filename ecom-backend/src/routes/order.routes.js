import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.Middleware.js";

const router = express.Router();

// Create order
router.post("/", authMiddleware, createOrder);

// Get logged-in user's orders
router.get("/my", authMiddleware, getMyOrders);

// Get single order
router.get("/:id", authMiddleware, getOrderById);

export default router;
