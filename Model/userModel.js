let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    mobile_number: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
    },
    email_id: {
      type: mongoose.Schema.Types.String,
      trim: true,
      required: false,
    },
    gender: {
      type: mongoose.Schema.Types.String,
      trim: true,
      enum: ["Male", "Female", "Other"],
    },
    dob: {
      type: mongoose.Schema.Types.Date,
    },
    city: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    designation: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    company_name: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    income_range: {
      type: mongoose.Schema.Types.String,
      enum: ["<10lpa", ">10<50", ">50<1cr", ">1cr"],
    },
    pan_card_number: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    pan_card_link: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    account_number: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    account_number_link: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    aadhar_number: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    demat_screenshot: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    demat_acc_no: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    nominee_name: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    demat_account: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    ifsc_code: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    is_approved: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    is_kyc_approved: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    kyc_feedback: {
      type: mongoose.Schema.Types.String,
    },
    is_completed_profile: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    wallet_balance: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    is_completed_kyc: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    reject_reasion: {
      type: mongoose.Schema.Types.String,
    },
    isReferred: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    referred_code: {
      type: mongoose.Schema.Types.String,
      minlength: 6,
      maxlength: 6,
    },
    referred_userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    referral_code: {
      type: mongoose.Schema.Types.String,
      minlength: 6,
      maxlength: 6,
      unique: true,
      required: true,
    },
    stock: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Share",
    }],
    notification: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "notification",
    }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
