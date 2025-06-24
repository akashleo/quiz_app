import express from "express";
const profileRouter = express.Router();
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";
import {
  getAllProfiles,
  updateProfile,
  deleteProfile,
  getProfileById,
  getPendingAdminRequests,
} from "../controllers/ProfileController.js";


profileRouter.get("/", authenticateToken, authorizeRole(['admin']), getAllProfiles);
profileRouter.get("/admin/pending-requests", authenticateToken, authorizeRole(['admin']), getPendingAdminRequests);
profileRouter.get("/:id", authenticateToken, getProfileById);
// Authenticated users can view and update their own profiles
profileRouter.put("/:id", authenticateToken, updateProfile);

// Admin operations
profileRouter.delete("/:id", authenticateToken, authorizeRole(['admin']), deleteProfile);

//module.exports = profileRouter;

export default profileRouter;
