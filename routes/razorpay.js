const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController")

router.post("/", paymentController.createorder);
router.get("/logo", paymentController.getLogo);
router.get("/verify",paymentController.paymentverify)
router.post("/callback", paymentController.paymentCallback);

module.exports = router;