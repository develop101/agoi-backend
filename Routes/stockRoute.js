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

const  cloudinary = require("../Utils/cloudinary.js");
const  upload  = require("../Utils/multer");
const Stock = require("../Model/stockModel");

router.get("/available-stocks", availableStock);
router.get("/sold-out-stocks", soldStock);
router.post("/sell-stock", sellStocks);
router.get("/findall", findall)
router.route("/edit/:id").post(editStock)
router.delete("/:id", deleteById)
router.get("/:id", findById)


router.post('/create', upload.single("image"), async (req, res) => {
  try{
    const icon = await cloudinary.uploader.upload(req.file.path)
    
    let nStock = new Stock({
      stock_name: req.body.stock_name,
      stock_icon: icon.secure_url,  //image
      cloudinary_id: icon.cloudinary_id, 
      stock_sp_id: req.body.stock_sp_id,
      available_on: req.body.available_on,
      companyType: req.body.companyType,
      face_value: req.body.face_value,
      price_per_lot: req.body.price_per_lot,  
      share_per_lot: req.body.share_per_lot,
      discription: req.body.discription,
      stock_status: req.body.stock_status,
    })
    let savedShare =  await Stock.create(nStock);

    res.send({
      message: "Stock successfully created",
      data: savedShare,
    });
  }catch (err ){
    res.send({
      message: err.message,
    });
  }
});
module.exports = router;
