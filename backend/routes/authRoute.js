import express from "express";
// Correct path and filename:
import { signup, login } from "../controllers/authController.js"; 

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
