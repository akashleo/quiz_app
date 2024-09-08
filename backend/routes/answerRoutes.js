import express from "express";
const answerRouter = express.Router();
import {
  getAllAnswers,
  createNewAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/AnswerController.js";

answerRouter.get("/", getAllAnswers);
//answerRouter.get("/:id", getProfileById);
answerRouter.post("/", createNewAnswer);
answerRouter.put("/:id", updateAnswer);
answerRouter.delete("/:id", deleteAnswer);

export default answerRouter;
