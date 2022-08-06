const express = require("express");
const router = express.Router();
const auth = require("../../../middlewares/auth");
const multer = require("multer");
const { fileStorage } = require("../../../utils");

const upload = multer({ storage: fileStorage });

const controller = require("../controller/EmailTemplateController");

router.get("/read", controller.readAll);
router.get("/read/:id", controller.readById);
router.post("/bulk/:id", upload.single("file"), controller.bulkEmail);

module.exports = router;
