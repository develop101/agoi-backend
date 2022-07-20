const { default: axios } = require("axios");
const crypto = require("crypto");
const path = require("path");
const Order = require("../Model/orderModel");
const Payment = require("../Model/paymentModel");
const Referral = require("../Model/referralModel");
const User = require("../Model/userModel");
exports.generateOrder = async (req, res) => {
  let bodyData = req.body;
  if (
    !bodyData.amount ||
    !bodyData.csid ||
    !bodyData.csmail ||
    !bodyData.csphone
  ) {
    return res.send({
      error: true,
      message: "data is insufficient to generate the order",
    });
  }
  console.log(req.body);
  let order_id = crypto.randomBytes(16).toString("hex");
  console.log(order_id);
  try {
    let data = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      {
        order_id: order_id,
        order_amount: bodyData.amount,
        order_currency: "INR",
        order_note: "order info",
        customer_details: {
          customer_id: bodyData.csid,
          customer_email: bodyData.csmail,
          customer_phone: bodyData.csphone,
        },
        order_meta: {
          return_url:
            "https://agoifinancialservices-c10b1.web.app/get-return-order?order_id={order_id}&order_token={order_token}",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-01-01",
          "x-client-id": "1561324e9a620d30e67f19f047231651",
          "x-client-secret": "50555d26086eadafa93b63873c7dcb5cbbb0665a",
        },
      }
    );
    let response = data.data;
    let result = await Order.create({
      order_id: response.order_id,
      user_id: response.customer_details.customer_id,
      order_amount: response.order_amount,
      order_status: response.order_status,
      order_token: response.order_token,
      order_note: response.order_note,
      stock_id: bodyData.stock_id,
      no_of_stocks: bodyData.no_of_stocks,
      no_of_lots: bodyData.no_of_lots,
      left_shares: bodyData.no_of_stocks,
      price_per_share: bodyData.price_per_share,
    });
    await result.save();
    return res.send({
      error: false,
      message: "order was built",
      data: data.data,
    });
  } catch (e) {
    console.log(e);
    return res.send({
      error: true,
      message: "error occurred",
    });
  }
};

exports.returnOrderUrl = async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  console.log(req.params);
};

exports.getOrderFromBackend = async (req, res) => {
  let body = req.params;
  console.log(body);
  if (!body.order_id || !body.order_token) {
    return res.send({ error: true, message: "please send whole data" });
  }
  try {
    let data = await Order.findOne({
      order_id: body.order_id,
      order_token: body.order_token,
    });
    if (data) {
      return res.send({
        error: false,
        message: "found the order",
        order: data,
      });
    } else {
      return res.send({ error: true, message: "order not found" });
    }
  } catch (e) {
    console.log(e);
    return res.send({ error: true, message: "error occurred" });
  }
};

exports.getOrderFromCashFree = async (req, res) => {
  let body = req.params;
  console.log(body);
  if (!body.order_id) {
    return res.send({ error: true, message: "please send whole data" });
  }

  try {
    let order = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${body.order_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-01-01",
          "x-client-id": "1561324e9a620d30e67f19f047231651",
          "x-client-secret": "50555d26086eadafa93b63873c7dcb5cbbb0665a",
        },
      }
    );

    if (order.data) {
      let data = await Order.findOne({
        order_id: body.order_id,
      });
      data.order_status = order.data.order_status;
      await data.save();
      return res.send({
        error: false,
        message: "found the order",
        order: data,
      });
    } else {
      return res.send({ error: true, message: "order not found" });
    }
  } catch (e) {
    console.log(e);
    return res.send({ error: true, message: "error occurred" });
  }
};

exports.generatePayment = async (req, res) => {
  let body = req.body;
  try {
    let result = await Payment.create({
      order_id: body.order_id,
      user_id: body.user_id,
      payment_amount: body.order_amount,
      payment_status: body.order_status,
      stock_id: body.stock_id,
      no_of_stocks: body.no_of_stocks,
      no_of_lots: body.no_of_lots,
    });
    if (body.order_status === "PAID") {
      if (body.isReferred) {
        let referral = Referral.create({
          for_order_id: body.order_id,
          referral_code: body.referred_code,
          price_to_be_availed: (body.order_amount * 0.5) / 100,
          purchased_by: body.user_id,
        });
        let user = await User.findOne({ referral_code: body.referred_code });
        if (user) {
          user.wallet_balance =
            user.wallet_balance + (body.order_amount * 0.5) / 100;
          await user.save();
        }
        await referral.save();
      }
    }
    await result.save();
    return res.send({
      error: false,
      message: "payment generated successfully",
      data: result,
    });
  } catch (e) {
    return res.send({ error: true, message: "payment was not generated" });
  }
};

exports.getUserOrders = async (req, res) => {
  let params = req.params;
  if (!params.id) {
    res.send({ error: true, message: "user id is required" });
  }
  try {
    let data = await Order.find({
      user_id: params.id,
      order_status: "PAID",
    }).populate({
      path: "stock_id",
    });
    res.send({ error: false, message: "orders fetched", data: data });
  } catch (e) {
    console.log(e);
    res.send({ error: true, message: "eror occurred" });
  }
};


//get all order
exports.getAll = async (req, res, next) => {
  try {
    console.log('get All')
    let result = await Order.find();
    res.send({
      message: "List of All Order",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

exports.availableOrder = async (req, res, next) => {
  try {
    console.log("available order")
    let result = await Order.find({ order_status: "Available" });
    res.send({
      message: "stock created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};