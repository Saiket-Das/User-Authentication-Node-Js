const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");
const uploader = require("../middlewares/uploader");

router
  .route("/file-upload")
  .post(uploader.single("image"), userController.fileUpload);

router.post("/signup", userController.register);

router.post("/login", userController.login);

router.route("/me").get(verifyToken, userController.getMe);

router
  .route("/all")
  .get(verifyToken, authorization("admin"), userController.getAllUsers);

module.exports = router;
