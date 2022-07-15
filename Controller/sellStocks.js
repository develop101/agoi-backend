const Order = require("../Model/orderModel");
const SellStock = require("../Model/sellStocksModel");

exports.sellStocks = async (req, res) => {
  let body = req.body;
  if (!body.order_id || !body.stocks_qty_to_be_sold || !body.total_amount) {
    return res.send({
      error: true,
      message: "error occurred",
    });
  }
  try {
    let order = await Order.findOne({ _id: body.order_id });
    order.left_shares = order.left_shares - body.stocks_qty_to_be_sold;
    let data = await SellStock.create(body);
    await order.save();
    await data.save();
    res.send({
      error: false,
      message: "sell request created",
      data: data,
    });
  } catch (e) {
    res.send({
      error: true,
      message: "error occurred",
    });
  }
};
