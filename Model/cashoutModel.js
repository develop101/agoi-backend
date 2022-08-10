const { default: mongoose } = require("mongoose");

const cashoutSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cashout_amount: {
      type: mongoose.Schema.Types.Number,
    },
    cashout_status: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    cashout_feedback: {
      type: mongoose.Schema.Types.String,
    },
  },
  { timestamps: true }
);

const SellStock = mongoose.model("Cashout", cashoutSchema);

module.exports = SellStock;
