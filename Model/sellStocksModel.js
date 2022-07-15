const { default: mongoose } = require("mongoose");

const sellStocksSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    stocks_qty_to_be_sold: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    total_amount: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    request_status: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SellStock = mongoose.model("SellStock", sellStocksSchema);

module.exports = SellStock;
