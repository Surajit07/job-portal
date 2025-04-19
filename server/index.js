import express from "express";
import { connectToDB } from "./connect.js";
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/jobs",jobRoutes);

//MongoDB
connectToDB(process.env.MONGO_URI)
  .then(() => {
    console.log("connected");
    app.listen(process.env.PORT || 7000, () => console.log("server running"));
  })
  .catch((error) => {
    console.log(error);
  });
