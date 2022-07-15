const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    price_per_share: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    order_amount: {
      type: mongoose.Schema.Types.Number,
    },
    order_status: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    order_token: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    order_note: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    stock_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
    no_of_stocks: {
      type: mongoose.Schema.Types.Number,
    },
    left_shares: {
      type: mongoose.Schema.Types.Number,
    },
    no_of_lots: {
      type: mongoose.Schema.Types.Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
