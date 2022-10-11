const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/signup", userController.register);

router.post("/login", userController.login);

router.route("/me").get(verifyToken, userController.getMe);

module.exports = router;
