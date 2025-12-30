import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/authRoute.js";

dotenv.config();
const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: [
    "https://afzaalblog-sje6.vercel.app", // your frontend URL
    "http://localhost:3000" // optional for local development
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true // if you plan to use cookies
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection (cache for serverless)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};
await connectDB();

// Routes
app.use("/api/auth", authRoutes);

export default app;
