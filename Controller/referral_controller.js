const Referral = require("../Model/referralModel");
const crypto = require("crypto");
const User = require("../Model/userModel");
const Order = require("../Model/orderModel");

exports.createReferral = async (req, res) => {
  let body = req.body;
  if (!body.contact_no || !body.referred_by || !body.refer_amount) {
    res.send({
      error: true,
      message: "insufficient information",
    });
  }
  try {
    let user = await User.findOne({ mobile_number: body.contact_no });
    console.log("user", user);
    if (user) {
      return res.send({
        error: true,
        message: "User already exists",
      });
    }
    let isExists = await Referral.findOne({
      receiver_contact_no: body.contact_no,
    });
    console.log("isExists", isExists);
    if (isExists) {
      return res.send({
        error: true,
        message: "contact has already been referred",
      });
    }
    let referral_code = crypto.randomBytes(3).toString("hex");
    console.log(referral_code);
    let data = await Referral.create({
      receiver_contact_no: body.contact_no,
      referral_code: referral_code,
      referred_by: body.referred_by,
      refer_amount: body.refer_amount,
    });
    await data.save();
    res.send({
      error: false,
      message: "Referrak code is generated",
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      error: true,
      message: "error occurred",
    });
  }
};

exports.availReferral = async (req, res) => {
  let params = req.params;
  if (!params.contact_no && !params.referral_code) {
    return res.send({
      error: true,
      message: "insufficient information",
    });
  }
  try {
    let data = await Referral.findOne({
      referral_code: params.referral_code,
      contact_no: params.contact_no,
    });
    if (data) {
      res.send({
        error: false,
      });
    } else {
      res.send({
        error: true,
        message: "data not found",
      });
    }
  } catch (e) {
    res.send({
      error: false,
      message: "error occurred",
    });
  }
};

exports.referralHistory = async (req, res) => {
  let body = req.params;
  if (!body.referral_code) {
    return res.send({
      error: true,
      message: "insufficient information",
    });
  }
  console.log(body);
  try {
    let data = await Referral.find({
      referral_code: body.referral_code,
    }).populate({ path: "purchased_by" });
    for (let i = 0; i < data.length; i++) {
      let order = await Order.findOne({
        for_order_id: data[i]["for_order_id"],
      }).populate({ path: "stock_id" });
      console.log(order);
      data[i]["for_order_id"] = order;
      console.log(data);
    }
    return res.send({
      error: false,
      message: "referral history",
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      error: true,
      message: "error occurred",
    });
  }
};
