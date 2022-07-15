const express = require("express");
const {
  createReferral,
  availReferral,
  referralHistory,
} = require("../Controller/referral_controller");
const router = express.Router();

router.post("/refer-user", createReferral);
router.get("/referral-detail", availReferral);
router.get("/referral-history/:referral_code", referralHistory)
module.exports = router;
