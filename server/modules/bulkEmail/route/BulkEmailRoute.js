const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
const controller = require("../controller/BulkEmailController");

router.post("/email", upload.single("file"), controller.bulkEmail);

module.exports = router;
