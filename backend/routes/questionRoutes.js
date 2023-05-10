import express from "express";
const questionRouter = express.Router();

import {getAllQuestions, addQuestion, updateQuestion, deleteQuestion} from "../controllers/QuestionController.js"

questionRouter.get("/", getAllQuestions);
//questionRouter.get("/:id", get);
questionRouter.post("/", addQuestion);
questionRouter.put("/:id", updateQuestion);
questionRouter.delete("/:id", deleteQuestion);

export default questionRouter;

