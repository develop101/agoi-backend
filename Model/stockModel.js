const mongoose = require("mongoose");

let stockSchema = new mongoose.Schema(
  {
    stock_sp_id: {
      type: mongoose.Schema.Types.String,
      trim: true,
      unique: true,
      required: [true, "stock id is required"],
    },
    stock_icon: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    cloudinary_id: {
      type: mongoose.Schema.Types.String,
    },
    stock_name: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    stock_location: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    stock_status: {
      type: mongoose.Schema.Types.String,
      trim: true,
      enum: ["Available", "Sold Out"],
      default: "Available"
    },
    face_value: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    price_per_lot: {
      type: mongoose.Schema.Types.Number,
      default: 1,
      validate: (val) => {
        if (val < 1) {
          throw new Error("price should be greater than 1");
        }
      },
    },
    stock_previous_price: {
      type: mongoose.Schema.Types.Number,
    },
    stamp_duty: {
      type: mongoose.Schema.Types.Number,
      default: 1,
    },
    transaction_fee: {
      type: mongoose.Schema.Types.Number,
      default: 1,
    },
    available_on: {
      type: mongoose.Schema.Types.Array,
      // enum: ["NSDL", "CDSL", "NSDL And CSDL"],
      // default: "NSDL",
    },
    share_per_lot: {
      type: mongoose.Schema.Types.Number,
      default: 1,
    },
    companyType: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    discription: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
