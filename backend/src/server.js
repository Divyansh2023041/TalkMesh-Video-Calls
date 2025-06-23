import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";

import authRoutes from "./route/auth.route.js";
import userRoutes from "./route/user.route.js";
import chatRoutes from "./route/chat.route.js";
import {connectDB} from "./lib/db.js";
//import { connect } from "mongoose";

const __dirname = path.resolve();

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,                      //allow frontend to send cookies
}))

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;

// app.get("/api/auth/signup", (req, res) => {
//     res.send("Signup Route");
// });

// app.get("/api/auth/login", (req, res) => {
//     res.send("Login Route");
// });

// app.get("/api/auth/logout", (req, res) => {
//     res.send("Logout Route");
// });
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
