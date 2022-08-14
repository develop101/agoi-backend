const {
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

const cloudinary = require("../Utils/cloudinary.js");
const upload = require("../Utils/multer");
const Stock = require("../Model/stockModel");

router.get("/available-stocks", availableStock);
router.get("/sold-out-stocks", soldStock);
router.post("/sell-stock", sellStocks);
router.get("/findall", findall)
//router.put("/:id", editStock)
router.delete("/:id", deleteById)
router.get("/:id", findById)


router.post('/create', upload.single("image"), async (req, res) => {
  try {
    console.log(req.body)
    const icon = await cloudinary.uploader.upload(req.file.path)
    console.log(req.file)
    console.log(req.body)
    let nStock = new Stock({
      stock_name: req.body.stock_name,
      stock_icon: icon.secure_url,  //image
      cloudinary_id: icon.cloudinary_id,
      stock_sp_id: req.body.stock_sp_id,
      available_on: req.body.available_on,
      companyType: req.body.companyType,
      face_value: req.body.face_value,
      price_per_lot: req.body.price_per_lot,
      bought_price: req.body.price_per_lot, // storing the bought price
      current_price: req.body.price_per_lot, // storing the current price at that time
      share_per_lot: req.body.share_per_lot,
      discription: req.body.discription,
      stock_status: req.body.stock_status,
    })
    let savedShare = await Stock.create(nStock);

    res.send({
      message: "Stock successfully created",
      data: savedShare,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});



router.post('/edit/:id', upload.single("image"), async (req, res, next) => {
  try {
    let id = req.params.id;
    console.log("stock id == ", id)
    console.log(req.body)
    const icon = await cloudinary.uploader.upload(req.file.path)
    console.log(req.file)
    console.log(req.body)
    let data = req.body;
    console.log(req.body);
    console.log(req.body.stock_name);
    const stockData = await Stock.findById(id);
    console.log("user data ==", stockData);
    if (!stockData) {
      return res.send({ error: true, message: "Stock not found" });
    }
    // res.send(stockData);/
    // stockData.stock_name = data.stock_name ? data.stock_name : stockData.stock_name;
    // // stockData.stock_location = data.stock_location ? data.stock_location : stockData.stock_location;
    // stockData.stock_status = data.stock_status ? data.stock_status : stockData.stock_status;
    // stockData.face_value = data.face_value ? data.face_value : stockData.face_value;
    // stockData.price_per_lot = data.price_per_lot ? data.price_per_lot : stockData.price_per_lot;
    // stockData.stock_previous_price = data.stock_previous_price ? data.stock_previous_price : stockData.stock_previous_price;
    // stockData.stamp_duty = data.stamp_duty ? data.stamp_duty : stockData.stamp_duty;
    // stockData.transaction_fee = data.transaction_fee ? data.transaction_fee : stockData.transaction_fee;
    // stockData.available_on = data.available_on ? data.available_on : stockData.available_on;
    // stockData.share_per_lot = data.share_per_lot ? data.share_per_lot : stockData.share_per_lot;

    // const icon = await cloudinary.uploader.upload(req.file.path)

    // let nStock = new Stock({
    //   stock_name: req.body.stock_name,
    //   stock_icon: icon.secure_url,  //image
    //   cloudinary_id: icon.cloudinary_id, 
    //   stock_sp_id: req.body.stock_sp_id,
    //   available_on: req.body.available_on,
    //   companyType: req.body.companyType,
    //   face_value: req.body.face_value,
    //   price_per_lot: req.body.price_per_lot,  
    //   share_per_lot: req.body.share_per_lot,
    //   discription: req.body.discription,
    //   stock_status: req.body.stock_status,
    // })
    // let savedShare =  await Stock.create(nStock);

    //await stockData.save();

    res.send({
      message: "Stock successfully updated",
      data: data,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});



router.post('/profile/edit/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;
    console.log(req.body);

    const stockData = await Stock.findById(id);
    console.log("user data ==", stockData);

    if (!stockData) {
      return res.send({ error: true, message: "Stock not found" });
    }

    stockData.stock_name = data.stock_name ? data.stock_name : stockData.stock_name;
    stockData.stock_sp_id = data.stock_sp_id ? data.stock_sp_id : stockData.stock_sp_id;
    stockData.available_on = data.available_on ? data.available_on : stockData.available_on;
    stockData.companytype = data.companytype ? data.companytype : stockData.companytype;
    stockData.face_value = data.face_value ? data.face_value : stockData.face_value;
    stockData.price_per_lot = data.price_per_lot ? data.price_per_lot : stockData.price_per_lot;
    stockData.current_price = data.price_per_lot ? data.price_per_lot : stockData.price_per_lot;
    stockData.growth_percentage = (( stockData.current_price - stockData.bought_price)/ stockData.bought_price )*100;
    stockData.share_per_lot = data.share_per_lot ? data.share_per_lot : stockData.share_per_lot;
    stockData.discription = data.discription ? data.discription : stockData.discription;
    stockData.stock_status = data.stock_status ? data.stock_status : stockData.stock_status;

    await stockData.save();

    res.send({
      message: "Stock successfully updated",
      data: stockData,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});


router.post('/icon/edit/:id', upload.single("image"), async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    console.log(req.body);
console.log("edit icon =", id);
    const stockData = await Stock.findById(id);
    console.log("user data ==", stockData);

    if (!stockData) {
      return res.send({ error: true, message: "Stock not found" });
    }
    const icon = await cloudinary.uploader.upload(req.file.path)
    
    console.log(req.file)
    console.log(req.body)
    
    stockData.stock_icon = icon.secure_url ? icon.secure_url : stockData.secure_url;
    stockData.cloudinary_id = icon.cloudinary_id ? icon.cloudinary_id : stockData.cloudinary_id;
    await stockData.save();
    res.send({
      message: "Stock icon successfully edited",
      data: stockData,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});

module.exports = router;
