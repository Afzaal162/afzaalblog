import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/authRoute.js";

dotenv.config();
const app = express();

// CORS for your frontend
app.use(cors({
  origin: "https://afzaalblog-sje6.vercel.app", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection (cache for serverless)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Connect to DB when a request comes in
app.use(async (req, res, next) => {
  if (!isConnected) await connectDB();
  next();
});

// Routes
app.use("/api/auth", authRoutes);

export default app;
