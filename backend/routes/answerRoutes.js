import express from "express";
const answerRouter = express.Router();
import {
  getAllAnswers,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/AnswerController.js";

answerRouter.get("/", getAllAnswers);
//answerRouter.get("/:id", getProfileById);
answerRouter.post("/", addAnswer);
answerRouter.put("/:id", updateAnswer);
answerRouter.delete("/:id", deleteAnswer);
//answerRouter.delete("questions/:topicId", getQuestions);

export default answerRouter;
