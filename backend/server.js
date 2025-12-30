import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js"; // adjust path

dotenv.config();
const app = express();

// ✅ Correct CORS
app.use(cors({
  origin: ["https://afzaalblog-sje6.vercel.app"], // frontend URL
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection for serverless
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};
await connectDB();

// ✅ Use correct API prefix
app.use("/api/auth", authRoutes);

export default app;
