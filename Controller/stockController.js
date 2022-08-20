const { doc } = require("../Config/db");
const db = require("../Config/db");
const Stock = require("../Model/stockModel");

// //create a stock --admin
// exports.createStock = async (req, res, next) => {
//   try {
//     let data = req.body;
//     let result = await Stock.create(data);
//     res.send({
//       message: "stock created successfully",
//       data: result,
//     });
//   } catch (err) {
//     res.send({
//       message: err.message,
//     });
//   }
// };

exports.editStock = async (req, res, next) => {
  try {
    let data = req.body;
    const stockData = await Stock.findById(req.params.id);
    
    if (!stockData) {
      return res.send({ error: true, message: "Stock not found" });
    }

    stockData.stock_name = data.stock_name ? data.stock_name : stockData.stock_name;
    stockData.stock_location = data.stock_location ? data.stock_location : stockData.stock_location;
    stockData.stock_status = data.stock_status ? data.stock_status : stockData.stock_status;
    stockData.face_value = data.face_value ? data.face_value : stockData.face_value;
    stockData.price_per_lot = data.price_per_lot ? data.price_per_lot : stockData.price_per_lot;
    stockData.stock_previous_price = data.stock_previous_price ? data.stock_previous_price : stockData.stock_previous_price;
    stockData.stamp_duty = data.stamp_duty ? data.stamp_duty : stockData.stamp_duty;
    stockData.transaction_fee = data.transaction_fee ? data.transaction_fee : stockData.transaction_fee;
    stockData.available_on = data.available_on ? data.available_on : stockData.available_on;
    stockData.share_per_lot = data.share_per_lot ? data.share_per_lot : stockData.share_per_lot;

    await stockData.update();
    res.send({
      message: "Stock updated",
      data: stockData,
    })
  }catch(err){
    res.send({
      message: err.message,
    })
  }
}

//get available stock
exports.availableStock = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit) || 5;

    let available = await Stock.countDocuments({ stock_status: "Available" });
 
    if(page && limit){
      let result = await Stock.find({ stock_status: "Available" })
      .skip((page - 1) * limit)
      .limit(limit);
      
     return res.send({
        message: "list of available stock",
        data: result,
        page: page,
        limit: limit,
        availableShare: available,
      });
    };
    let result = await Stock.find({ stock_status: "Available" });
    res.send({
      message: "list of available stock",
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
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit) || 5;

    let total = await Stock.countDocuments();
    let soldout = await Stock.countDocuments({ stock_status: "Sold Out" });
    let available = await Stock.countDocuments({ stock_status: "Available" });
 
    if(page && limit){
      let result = await Stock.find()
      .skip((page - 1) * limit)
      .limit(limit);
      
     return res.send({
        message: "List of All share ",
        data: result,
        page: page,
        limit: limit,
        totalShare: total,
        availableShare: available,
        soldoutShare: soldout
      });
    };

    let result = await Stock.find()
    .sort({ updatedAt: -1 });
   
    res.send({
      message: "List of All share",
      data: result,
      totalShare: total,
      availableShare: available,
      soldoutShare: soldout
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

// search
exports.search = async (req, res, next) => {
  try {
    let result = await Stock.find({
      "$or":[
        {"stock_name":{$regex:req.params.key}}
      ]
    })
   
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

//findById
exports.findById = async (req, res, next) => {
  try {
    let result = await Stock.findById(req.params.id);
    res.send({
      message: "Stock found",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//DELETE
exports.deleteById = async (req, res, next) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.status(200).json("stock has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
