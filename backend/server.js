import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import blogRoutes from "../backend/routes/blogRoute.js";
import authRoutes from "../backend/routes/authRoute.js";
import userRoutes from "../backend/routes/userRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
