import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/authRoute.js"; // correct relative path

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS for your frontend URL
app.use(cors({
  origin: "https://afzaalblog-sje6.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// MongoDB connection cache for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  isConnected = true;
  console.log("MongoDB connected");
};

// Connect before handling requests
app.use(async (req, res, next) => {
  if (!isConnected) await connectDB();
  next();
});

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working!" });
});

// Export app for Vercel
export default app;
