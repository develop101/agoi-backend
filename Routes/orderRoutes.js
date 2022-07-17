const express = require("express");
const router = express.Router();
const { findall, getOrderFromBackend } = require("../Controller/OrdersController.js");


router.get("/findall", findall);
router.get(":id", getOrderFromBackend);


module.exports = router;
