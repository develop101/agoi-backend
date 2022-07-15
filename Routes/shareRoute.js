const {
  createShare,
  getAllShare,
  getShareById,
  deleteShareById,
  ShareIcon
} = require("../Controller/shareController.js");
const express = require("express");
const  cloudinary = require("../Utils/cloudinary.js");
const  upload  = require("../Utils/multer");
const router = express.Router();
const Share = require("../Model/shareModel");

router.get("/findAll", getAllShare);
router.get("/:id", getShareById);
router.delete("/:id", deleteShareById)

router.post('/create', upload.single("image"), async (req, res) => {
  try{
    const icon = await cloudinary.uploader.upload(req.file.path)
    
    let nShare = new Share({
      share_name: req.body.share_name,
      share_icon: icon.secure_url,
      cloudinary_id: icon.cloudinary_id,
      share_id: req.body.share_id,
      avaiable_on: req.body.avaiable_on,
      share_companyType: req.body.share_companyType,
      face_value: req.body.face_value,
      price_per_share: req.body.price_per_share,  
      share_quantity: req.body.share_quantity,
      share_discription: req.body.share_discription,
      share_status: req.body.share_status,
    })
    let savedShare =  await Share.create(nShare);

    res.send({
      message: "share created successfully",
      data: savedShare,
    });
  }catch (err ){
    res.send({
      message: err.message,
    });
  }
});

module.exports = router;
