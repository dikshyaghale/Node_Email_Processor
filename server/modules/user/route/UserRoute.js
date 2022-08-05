const express = require("express");
const router = express.Router();

const controller = require("../controller/UserController");

router.post("/register", controller.registerUser);

router.get("/read", controller.readAll);

router.get("/confirmation/:token", controller.activeAccount);

module.exports = router;
