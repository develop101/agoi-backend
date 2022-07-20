const express = require("express");
const router = express.Router();
const { getOrderFromBackend, getAll } = require("../Controller/OrdersController.js");


router.get("/", getAll);
router.get(":id", getOrderFromBackend);


module.exports = router;
