import express from "express";
import mongoose from "mongoose";
import profileRouter from "./routes/profileRoutes.js";
import userRouter from "./routes/userRoutes.js";
import gradesRouter from "./routes/gradesRoutes.js"; 
import topicRouter from "./routes/topicRoutes.js"
import questionRouter from "./routes/questionRoutes.js";

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/profiles", profileRouter);
app.use("/user", userRouter);
app.use("/grades", gradesRouter);
app.use("/topics", topicRouter);
app.use("/questions", questionRouter);

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.vu326ye.mongodb.net/test`
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("server is running at port 5000");
    });
  });
