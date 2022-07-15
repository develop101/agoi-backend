const { default: mongoose } = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    for_order_id: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "Order",
      unique: true,
    },
    referral_code: {
      type: mongoose.Schema.Types.String,
      minlength: 6,
      maxlength: 6,
      required: true,
    },
    availed: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    price_to_be_availed: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    purchased_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Referral = mongoose.model("Referral", referralSchema);

module.exports = Referral;
