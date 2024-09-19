const { checkout, paymentVerification } = require("../controllers/paymentController");

const express = require("express");
const router = express.Router();
router.route("/checkout").post(checkout);
router.route("/paymentVerification").post(paymentVerification);

module.exports = router;