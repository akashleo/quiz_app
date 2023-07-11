import express from "express";
const fileRouter = express.Router();
import { fileUpload } from "../controllers/FileUpload.js";

fileRouter.post("/", fileUpload);

export default fileRouter;
