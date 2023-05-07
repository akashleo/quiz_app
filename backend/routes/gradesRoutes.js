import express from "express";
const gradeRouter = express.Router();
import {
  getAllGrades,
  addGrade,
  updateGrade,
  deleteGrade,
} from "../controllers/GradesController.js";

//const Book = require("../model/Profile");

//const ProfileControllers = require("../controllers/ProfileController");

gradeRouter.get("/", getAllGrades);
//gradeRouter.get("/:id", getProfileById);
gradeRouter.post("/", addGrade);
gradeRouter.put("/:id", updateGrade);
gradeRouter.delete("/:id", deleteGrade);

//module.exports = gradeRouter;

export default gradeRouter;
