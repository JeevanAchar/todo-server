import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, signup } from "../controllers/Auth";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/Todo";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: "Too many login attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// User Routes (public, rate-limited)
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);

// Todo Routes (protected by auth middleware)
router.post("/todo", authMiddleware, createTodo);
router.get("/todo", authMiddleware, getTodos);
router.put("/todo/:todo_id", authMiddleware, updateTodo);
router.delete("/todo/:todo_id", authMiddleware, deleteTodo);

export default router;
