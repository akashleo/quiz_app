import express from "express";
const profileRouter = express.Router();
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";
import {
  getAllProfiles,
  getProfileById,
  addProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/ProfileController.js";

//const Book = require("../model/Profile");

//const ProfileControllers = require("../controllers/ProfileController");

// Admin access to get all profiles
profileRouter.get("/", authenticateToken, authorizeRole(['admin']), getAllProfiles);

// Authenticated users can view and update their own profiles
profileRouter.get("/:id", authenticateToken, getProfileById);
profileRouter.put("/:id", authenticateToken, updateProfile);

// Admin operations
profileRouter.post("/", authenticateToken, authorizeRole(['admin']), addProfile);
profileRouter.delete("/:id", authenticateToken, authorizeRole(['admin']), deleteProfile);

//module.exports = profileRouter;

export default profileRouter;
