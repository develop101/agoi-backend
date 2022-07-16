const Referral = require("../Model/referralModel");
const User = require("../Model/userModel");
const crypto = require("crypto");
exports.createUserByContact = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = req.body;
    if (data.mobile_number === undefined) {
      res.send({
        message: "please enter your phone",
      });
    }
    let isExist = await User.findOne({ mobile_number: data.mobile_number });
    if (isExist) {
      return res.send({
        message: "user already exists",
      });
    }
    let referral_code = crypto.randomBytes(3).toString("hex");
    console.log(referral_code);
    let userData = {
      mobile_number: data.mobile_number,
      referral_code: referral_code,
    };
    if (data.referred_code) {
      let isValidReferred = await User.findOne({
        referral_code: data.referred_code,
      });
      if (isValidReferred) {
        userData["referred_code"] = data.referred_code;
        userData["isReferred"] = true;
      }
    }
    const result = await User.create(userData);
    const checkRefer = await Referral.findOne({
      receiver_contact_no: data.mobile_number,
    });
    // if (checkRefer.is_active == true) {
    //   result.wallet_balance = checkRefer.refer_amount;
    // }
    checkRefer.is_active = false;
    await checkRefer.save();
    await result.save();
    res.send({
      message: "record saved successfully",
      result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//get all users
exports.findall = async (req, res, next) => {
  try {
    let result = await User.find();
    res.send({
      message: "List of All User",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

exports.findUserByContact = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = req.body;
    if (data.mobile_number === undefined) {
      res.send({
        message: "please enter your phone",
      });
    }

    const result = await User.findOne({
      mobile_number: data.mobile_number,
    });
    console.log(result);
    res.send({
      message: "user found",
      data: result,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
};

exports.addKYCDetails = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = req.body;

    const result = await User.findOne({
      mobile_number: data.mobile_number,
    });

    if (!result) {
      return res.send({ error: true, message: "user not found" });
    }
    result.email_id = data.email_id ? data.email_id : result.email_id;
    result.demat_acc_no = data.demat_acc_no
      ? data.demat_acc_no
      : result.demat_acc_no;
    result.pan_card_number = data.pan_card_number
      ? data.pan_card_number
      : result.pan_card_link;
    result.pan_card_link = data.pan_card_link
      ? data.pan_card_link
      : result.pan_card_link;
    result.account_number = data.account_number
      ? data.account_number
      : result.account_number;
    result.account_number_link = data.account_number_link
      ? data.account_number_link
      : result.account_number_link;
    result.aadhar_number = data.aadhar_number
      ? data.aadhar_number
      : result.aadhar_number;
    result.demat_screenshot = data.demat_screenshot
      ? data.demat_screenshot
      : result.demat_screenshot;
    result.nominee_name = data.nominee_name
      ? data.nominee_name
      : result.nominee_name;
    result.is_completed_profile = data.is_completed_profile
      ? data.is_completed_profile
      : result.is_completed_profile;
    result.is_completed_kyc = data.is_completed_kyc
      ? data.is_completed_kyc
      : result.is_completed_kyc;
    await result.save();
    res.send({
      message: "user found",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

exports.completeProfileDetails = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = req.body;

    const result = await User.findOne({
      mobile_number: data.mobile_number,
    });

    if (!result) {
      return res.send({ error: true, message: "user not found" });
    }
    result.gender = data.gender ? data.gender : result.gender;
    result.dob = data.dob ? data.dob : result.dob;
    result.city = data.city ? data.city : result.city;
    result.designation = data.designation
      ? data.designation
      : result.designation;
    result.company_name = data.company_name
      ? data.company_name
      : result.company_name;
    result.income_range = data.income_range
      ? data.income_range
      : result.income_range;
    result.name = data.name ? data.name : result.name;
    result.is_completed_profile = data.is_completed_profile
      ? data.is_completed_profile
      : result.is_completed_profile;

    await result.save();
    res.send({
      message: "user found",
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
exports.deleteUserById = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
