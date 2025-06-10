import express from "express";
const answerRouter = express.Router();
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  getAllAnswers,
  createNewAnswer,
  updateAnswer,
  deleteAnswer,
  submitAnswer,
} from "../controllers/AnswerController.js";

// All answer operations require authentication
answerRouter.get("/", authenticateToken, getAllAnswers);
//answerRouter.get("/:id", getProfileById);
answerRouter.post("/", authenticateToken, createNewAnswer);
answerRouter.put("/:id", authenticateToken, updateAnswer);
answerRouter.put("/submit/:id", authenticateToken, submitAnswer);
answerRouter.delete("/:id", authenticateToken, deleteAnswer);

export default answerRouter;
