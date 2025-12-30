import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/authRoute.js"; // adjust relative path

dotenv.config();

const app = express();

// CORS: allow only your frontend deployed URL
app.use(cors({
  origin: "https://afzaalblog-sje6.vercel.app", // frontend deployed URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Connect to DB before handling any request
app.use(async (req, res, next) => {
  if (!isConnected) await connectDB();
  next();
});

// Use auth routes under /api/auth
app.use("/api/auth", authRoutes);

// Optional test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Export app for Vercel
export default app;
