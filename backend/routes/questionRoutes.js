import express from "express";
const questionRouter = express.Router();
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

import {
  getAllQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getArchivedQuestions,
  loadQuestionByTopic,
  fetchQuestionById,
} from "../controllers/QuestionController.js";

// Admin access for managing questions
questionRouter.post("/", authenticateToken, authorizeRole(['admin']), addQuestion);
questionRouter.put("/:id", authenticateToken, authorizeRole(['admin']), updateQuestion);
questionRouter.delete("/:id", authenticateToken, authorizeRole(['admin']), deleteQuestion);
questionRouter.post("/bulk", authenticateToken, authorizeRole(['admin']), loadQuestionByTopic);
questionRouter.get("/archived", authenticateToken, authorizeRole(['admin']), getArchivedQuestions);

// All authenticated users can fetch questions (e.g., for a quiz)
// If getAllQuestions is meant for the admin question bank view, it should also be admin only.
// Assuming for now it can be accessed by users for quizzes.
questionRouter.get("/", authenticateToken, getAllQuestions);
questionRouter.get("/:id", authenticateToken, fetchQuestionById);

export default questionRouter;
