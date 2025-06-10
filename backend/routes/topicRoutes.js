import express from "express";
const topicRouter = express.Router();
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";
import {
  getAllTopics,
  loadAllTopics,
  addTopic,
  updateTopic,
  deleteTopic,
} from "../controllers/TopicController.js";

// Admin access for managing topics
topicRouter.post("/", authenticateToken, authorizeRole(['admin']), addTopic);
topicRouter.put("/:id", authenticateToken, authorizeRole(['admin']), updateTopic);
topicRouter.delete("/:id", authenticateToken, authorizeRole(['admin']), deleteTopic);
// If loadAllTopics is an admin-specific function, protect it as well.
// Otherwise, if it's for users to see all topics for a quiz, it needs authenticateToken only.
// Assuming loadAllTopics is admin for now or a more general setup function.
topicRouter.get("/load", authenticateToken, authorizeRole(['admin']), loadAllTopics);

// All authenticated users can fetch topics (e.g., for selecting a quiz)
topicRouter.get("/", authenticateToken, getAllTopics);

//module.exports = topicRouter;

export default topicRouter;
