const {
  createStock,
  availableStock,
  soldStock,
  findall,
  editStock,
  deleteById,
  findById,
} = require("../Controller/stockController.js");
const express = require("express");
const { sellStocks } = require("../Controller/sellStocks.js");
const router = express.Router();

router.route("/create").post(createStock);
router.get("/available-stocks", availableStock);
router.get("/sold-out-stocks", soldStock);
router.post("/sell-stock", sellStocks);
router.get("/findall", findall)
router.route("/edit/:id").post(editStock)
router.delete("/:id", deleteById)
router.get("/:id", findById)
module.exports = router;
