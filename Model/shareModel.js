const mongoose = require("mongoose");

let shareSchema = new mongoose.Schema(
  {
    share_name: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    share_icon: {
      type: mongoose.Schema.Types.String,
    },
    cloudinary_id: {
      type: mongoose.Schema.Types.String,
    },

    share_id: {
      type: mongoose.Schema.Types.String,
      trim: true,
      unique: true,
      required: [true, "share id is required"],
    },

    available_on: {
      type: mongoose.Schema.Types.String,
      enum: ["NSDL", "CSDL", "NSDL And CSDL"],
      default: "NSDL",
    },

    share_companyType: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },

    face_value: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },

    price_per_share: {
      type: mongoose.Schema.Types.Number,
      default: 1,
      validate: (val) => {
        if (val < 1) {
          throw new Error("price should be greater than 1");
        }
      },
    },

    share_quantity: {
      type: mongoose.Schema.Types.Number,
    },

    share_discription: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },

    share_status: {
      type: mongoose.Schema.Types.String,
      trim: true,
      enum: ["Available", "Sold Out"],
      default: "Available",
    },

    share: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }]
  },
  { timestamps: true }
);

const Share = mongoose.model("Share", shareSchema);

module.exports = Share;
