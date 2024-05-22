const express = require("express");
const router = express.Router();
const emailControllers = require("../controllers/emailControllers");

router.route("/:email").post(emailControllers.sendEmail);

module.exports = router;
