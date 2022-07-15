const { doc } = require("../Config/db");
const db = require("../Config/db");
const Share = require("../Model/shareModel");
const  cloudinary = require("../Utils/cloudinary.js");
const  upload  = require("../Utils/multer");



//get all share
exports.getAllShare = async (req, res, next) => {
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

//getById
exports.getShareById = async (req, res, next) => {
  try {
    
    let result = await Share.findById(req.params.id);
    res.send({
      message: "Share found",
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
exports.deleteShareById = async (req, res, next) => {
  try {
    await Share.findByIdAndDelete(req.params.id);
    res.status(200).json("share has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
