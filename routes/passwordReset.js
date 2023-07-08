const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController")


router.post("/email",otpController.sendEmail);
router.post("/otpv",otpController.changePw);
module.exports = router;
