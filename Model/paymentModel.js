const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    payment_amount: {
      type: mongoose.Schema.Types.Number,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    payment_status: {
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
    no_of_lots: {
      type: mongoose.Schema.Types.Number,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
