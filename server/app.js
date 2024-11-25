import express from "express";
import morgan from "morgan";
import logRequest from "../server/middleware/logger.js";
import usersRoutes from "./routes/usersRoute.js";
import commentsRoutes from "./routes/commentsRoute.js";
import postsRoutes from "./routes/postsRoute.js";

import mongoose from "mongoose";
// import authUser from "./middleware/auth.js";

//env
import dotenv from "dotenv"

import cors from 'cors';

// הוסף את CORS אחרי הגדרת האפליקציה

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(morgan("tiny"));
app.use(logRequest);
app.use(cors());

dotenv.config()  
const uri = process.env.DB_URI;
mongoose.connect(uri)
.then(() => {
  console.log("connected");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:"+`${uri}`, err.message);
});;

//check if the server work
app.get("/api/status", (req, res) => {
  res.send({ status: "server is running" });
});

//use posts
app.use("/api/posts", postsRoutes);

//use users
app.use("/api/users", usersRoutes);

//use comments
app.use("/api/comments", commentsRoutes);

//
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
