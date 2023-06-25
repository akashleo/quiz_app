import express from "express";
const fileRouter = express.Router();
import { fileUpload } from "../controllers/FileUpload.js";

fileRouter.get("/", fileUpload);

export default fileRouter;
