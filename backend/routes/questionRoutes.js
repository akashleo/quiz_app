const express = require("express");
const router = express.Router();

//const Book = require("../model/Profile");

const ProfileControllers = require("../controllers/ProfileController");

router.get("/", ProfileControllers.getAllProfiles);
router.get("/:id", ProfileControllers.getProfileById);
router.post("/", ProfileControllers.addProfile);
router.put("/:id", ProfileControllers.updateProfile);
router.delete("/:id", ProfileControllers.deleteProfile);

module.exports = router;
