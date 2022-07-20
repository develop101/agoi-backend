const express = require("express");
const router = express.Router();
const { getOrderFromBackend, getAll } = require("../Controller/OrdersController.js");


router.get("/all", getAll);
router.get(":id", getOrderFromBackend);


module.exports = router;
