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
topicRouter.get("/load", authenticateToken, authorizeRole(['admin']), loadAllTopics);

// All authenticated users can fetch topics (e.g., for selecting a quiz)
topicRouter.get("/", authenticateToken, getAllTopics);

//module.exports = topicRouter;

export default topicRouter;
