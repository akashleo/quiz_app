import express from "express";
const profileRouter = express.Router();
import {
  getAllProfiles,
  getProfileById,
  addProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/ProfileController.js";

//const Book = require("../model/Profile");

//const ProfileControllers = require("../controllers/ProfileController");

profileRouter.get("/", getAllProfiles);
profileRouter.get("/:id", getProfileById);
profileRouter.post("/", addProfile);
profileRouter.put("/:id", updateProfile);
profileRouter.delete("/:id", deleteProfile);

//module.exports = profileRouter;

export default profileRouter;
