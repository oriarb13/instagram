import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
<<<<<<< HEAD
<<<<<<< HEAD
import cookieParser from 'cookie-parser';
=======
import cookieParser from "cookie-parser";
>>>>>>> 4bb07bd8754834de7c119aa2ddfcca3e532b66da
=======
import cookieParser from "cookie-parser";
>>>>>>> b791943ad6b5d1f0d92337e8fcb7955f0f9685b5
//env
import dotenv from "dotenv";
//routes
import commentsRoutes from "./routes/commentsRoute.js";
import postsRoutes from "./routes/postsRoute.js";
import usersRoutes from "./routes/usersRoute.js";




const app = express();
const PORT = 3000;
dotenv.config();
app.use(express.json());
app.use(morgan("tiny"));
// app.use(logRequest);
app.use(
    cors({
        origin: "http://localhost:5173", // Your frontend's origin
        credentials: true, // Enable credentials (cookies, etc.)
    })
);
app.use(cookieParser());

//connect mongo
const uri = process.env.DB_URI;
mongoose
    .connect(uri)
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:" + `${uri}`, err.message);
    });

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
