const { doc } = require("../Config/db");
const db = require("../Config/db");
const Stock = require("../Model/stockModel");

//create a stock --admin
exports.createStock = async (req, res, next) => {
  try {
    let data = req.body;
    let result = await Stock.create(data);
    res.send({
      message: "stock created successfully",
      data: result,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
};

//get available stock
exports.availableStock = async (req, res, next) => {
  try {
    let result = await Stock.find({ stock_status: "Available" });
    res.send({
      message: "stock created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//get sold out stock
exports.soldStock = async (req, res, next) => {
  try {
    let result = await Stock.find({ stock_status: "Sold Out" });
    res.send({
      message: "stock created successfully",
      data: result,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
};

//get 10 stocks --admin
exports.get10Stocks = async (req, res, next) => {
  try {
    var snapshot = db.collection("Stock").get().limit(10);
    let stocks = snapshot.docs.map((stocks) => {
      return { id: stocks.id, ...stocks.data() };
    });
    res.send({
      stocks,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
};
//get all stocks --admin
exports.getAllStocks = async (req, res, next) => {
  try {
    var snapshot = db.collection("Stock").get();
    let stocks = snapshot.docs.map((stocks) => {
      return { id: stocks.id, ...stocks.data() };
    });
    res.send({
      stocks,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
};

//get all
exports.findall = async (req, res, next) => {
  try {
    let result = await Share.find();
    res.send({
      message: "List of All share",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};
