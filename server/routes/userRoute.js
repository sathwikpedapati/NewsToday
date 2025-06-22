const express = require("express");
const { signup, login, editprofile, deleteuser } = require("../controllers/userController");
const { protectRoute } = require("./protectRoute");
const multer = require("multer");
const { storage } = require("../config/cloudConfig");

const upload = multer({ storage });
const router = express.Router();

router.post("/signup", upload.single("profilePic"), signup);

router.post("/login", login);

router.post("/edit", protectRoute, upload.single("profilePic"), editprofile);

router.post("/delete", protectRoute, deleteuser);

module.exports = router;
