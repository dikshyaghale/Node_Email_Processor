const express = require("express");

const router = express.Router();
const controller = require("../controller/AuthController");

router.post("/login", controller.auth);

module.exports = router;
