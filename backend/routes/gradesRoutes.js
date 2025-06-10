import express from "express";
const gradeRouter = express.Router();
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";
import {
  getAllGrades,
  addGrade,
  updateGrade,
  deleteGrade,
} from "../controllers/GradesController.js";

//const Book = require("../model/Profile");

//const ProfileControllers = require("../controllers/ProfileController");

// Admin access to get all grades
gradeRouter.get("/", authenticateToken, authorizeRole(['admin']), getAllGrades);
//gradeRouter.get("/:id", getProfileById);

// Authenticated operations for grades
gradeRouter.post("/", authenticateToken, addGrade);
gradeRouter.put("/:id", authenticateToken, updateGrade);
gradeRouter.delete("/:id", authenticateToken, deleteGrade);

//module.exports = gradeRouter;

export default gradeRouter;
