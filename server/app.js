import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

//routes
import commentsRoutes from "./routes/commentsRoute.js";
import postsRoutes from "./routes/postsRoute.js";
import usersRoutes from "./routes/usersRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // הגדרת ה-frontend URL
    credentials: true,
  })
);

// Connect MongoDB
const uri = process.env.DB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);

// Status check route
app.get("/api/status", (req, res) => {
  res.send({ status: "server is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
