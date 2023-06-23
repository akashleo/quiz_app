import express from "express";
const answerRouter = express.Router();
import {
  getAllAnswers,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/AnswerController.js";

//const Book = require("../model/Profile");

//const ProfileControllers = require("../controllers/ProfileController");

answerRouter.get("/", getAllAnswers);
//answerRouter.get("/:id", getProfileById);
answerRouter.post("/", addAnswer);
answerRouter.put("/:id", updateAnswer);
answerRouter.delete("/:id", deleteAnswer);

//module.exports = answerRouter;

export default answerRouter;
