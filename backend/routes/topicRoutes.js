import express from "express";
const topicRouter = express.Router();
import {
  getAllTopics,
  addTopic,
  updateTopic,
  deleteTopic,
} from "../controllers/TopicController.js";

//const Book = require("../model/Profile");

//const ProfileControllers = require("../controllers/ProfileController");

topicRouter.get("/", getAllTopics);
//topicRouter.get("/:id", getProfileById);
topicRouter.post("/", addTopic);
topicRouter.put("/:id", updateTopic);
topicRouter.delete("/:id", deleteTopic);

//module.exports = topicRouter;

export default topicRouter;
