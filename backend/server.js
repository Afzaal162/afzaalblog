import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import blogRoutes from "./routes/blogRoute.js"; // ✅ import blog routes

dotenv.config();
const app = express();

/* =========================
   CORS (VERY IMPORTANT)
========================= */
app.use(cors({
  origin: "https://afzaalblog-sje6.vercel.app", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

/* =========================
   Middleware
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   MongoDB (Serverless-safe)
========================= */
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected");
};

// 🔑 connect DB PER REQUEST (serverless-safe)
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
  }
  next();
});

/* =========================
   Routes
========================= */
app.use("/api/auth", authRoutes);   // ✅ auth routes untouched
app.use("/api/blogs", blogRoutes);  // ✅ add blogs routes

/* =========================
   Health check (optional)
========================= */
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

export default app;
