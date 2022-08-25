const Referral = require("../Model/referralModel");
const User = require("../Model/userModel");
const crypto = require("crypto");
const Order = require("../Model/orderModel");
const Notification = require("../Model/notificationModel");
const AdminNotification = require("../Model/adminNotificationModel");
const SellStock = require("../Model/sellStocksModel");
const Cashout = require("../Model/cashoutModel");


// USER START
//create
exports.createUserByContact = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = req.body;
    if (data.mobile_number === undefined) {
      res.send({
        message: "please enter your phone",
      });
    }
    let isExist = await User.findOne({ mobile_number: data.mobile_number });
    console.log(isExist);
    if (isExist) {
      return res.send({
        message: "user already exists",
      });
    }
    let referral_code = crypto.randomBytes(3).toString("hex");
    console.log(referral_code);
    let userData = {
      mobile_number: data.mobile_number,
      referral_code: referral_code,
    };
    if (data.referred_code) {
      let isValidReferred = await User.findOne({
        referral_code: data.referred_code,
      });
      if (isValidReferred) {
        userData["referred_code"] = data.referred_code;
        userData["isReferred"] = true;
        userData.referred_userDetails = isValidReferred._id;
      }
    }
    const result = await User.create(userData);
    const checkRefer = await Referral.findOne({
      receiver_contact_no: data.mobile_number,
    });
    // if (checkRefer.is_active == true) {
    //   result.wallet_balance = checkRefer.refer_amount;
    // }
    checkRefer.is_active = false;
    await checkRefer.save();
    await result.save();
    res.send({
      message: "record saved successfully",
      result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//GET all users
exports.getAll = async (req, res, next) => {
  try {

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const search = req.query.term || "";
    let total = await User.countDocuments();

    let result = await User.find({name: {$regex: search, $options: "i"}})
      .populate('referred_userDetails cashout notification')
      .skip((page - 1) * limit)
      .limit(limit);

    res.send({
      message: "List of All User",
      data: result,
      page: page,
      limit: limit,
      total:total
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//GET users byId
exports.findById = async (req, res, next) => {
  try {
    let result = await User.findById(req.params.id).populate('referred_userDetails cashout notification')//.populate('stock');  //cash out, notification
    res.send({
      message: "User succefully fetched",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//Edit Wallet Amount 
exports.EditWalletAmount = async (req, res, next) => {
  try {
    let data = req.body;
    let id = req.params.id;

    const result = await User.findById(id);

    if (!result) {
      return res.send({ error: true, message: "user not found" });
    }

    result.wallet_balance = data.wallet_balance ? data.wallet_balance : result.wallet_balance;

    await result.save();
    res.send({
      message: "walllet balance",
      data: result,
    });
  } catch (err) {
    res.send({
      message: err.message,
    })
  }
}

// GET user by Contact number
exports.findUserByContact = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = req.body;
    if (data.mobile_number === undefined) {
      res.send({
        message: "please enter your phone",
      });
    }

    const result = await User.findOne({
      mobile_number: data.mobile_number,
    });
    console.log(result);
    res.send({
      message: "user found",
      data: result,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
};

// ADD profile details
exports.completeProfileDetails = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = req.body;

    const result = await User.findOne({
      mobile_number: data.mobile_number,
    });

    if (!result) {
      return res.send({ error: true, message: "user not found" });
    }
    result.gender = data.gender ? data.gender : result.gender;
    result.dob = data.dob ? data.dob : result.dob;
    result.city = data.city ? data.city : result.city;
    result.designation = data.designation
      ? data.designation
      : result.designation;
    result.company_name = data.company_name
      ? data.company_name
      : result.company_name;
    result.income_range = data.income_range
      ? data.income_range
      : result.income_range;
    result.name = data.name ? data.name : result.name;
    result.is_completed_profile = data.is_completed_profile
      ? data.is_completed_profile
      : result.is_completed_profile;

    await result.save();
    res.send({
      message: "user found",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//DELETE
exports.deleteUserById = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
// Edit
exports.editUserById1 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const userData = await User.findById(id);

    if (!userDate) {
      return res.send({ message: "user not found" });
    }

    userData.name = data.name ? data.name : userData.name;
    userData.email_id = data.email_id ? data.email_id : userData.email_id;
    userData.mobile_number = data.mobile_number ? data.mobile_number : userData.mobile_number;

    //name, email, mobile & password

    await userData.save();
    res.send({
      message: userData
    })
  } catch (err) {
    res.send({
      message: message.err,
    })
  }

}

//Edit admin details 
exports.editUserById = async (req, res, next) => {
  try {
    let data = req.body;
    console.log("edit User", data)
    const userData = await User.findOne({
      mobile_number: data.mobile_number,
    });

    if (!userDate) {
      return res.send({ error: true, message: "user not found" });
    }

    userData.name = data.name ? data.name : userData.name;
    userData.email_id = data.email_id ? data.email_id : userData.email_id;
    // userData.mobile_number = data.mobile_number ? data.mobile_number : userData.mobile_number;

    //name, email, mobile & password

    await userData.save();
    res.send({
      message: userData
    })
  } catch (err) {
    res.send({
      message: message.err,
    })
  }

}

exports.editAdminDetails = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = req.body;

    const result = await User.findOne({
      mobile_number: data.mobile_number,
    });
    console.log(result);

    if (!result) {
      return res.send({ error: true, message: "user not found" });
    }
    // if (result.email_id) {
    //   result.email_id = data.email_id ? data.email_id : result.email_id;
    // } else {
    //   result.email_id.value = data.email_id;
    //   console.log('input does not exist');
    // }
    result.email_id = data.email_id ? data.email_id : result.email_id;
    result.name = data.name ? data.name : result.name;
    result.mobile_number = data.mobile_number ? data.mobile_number : result.mobile_number;
    // userData.mobile_number = data.mobile_number ? data.mobile_number : userData.mobile_number;

    // result.demat_acc_no = data.demat_acc_no
    //   ? data.demat_acc_no
    //   : result.demat_acc_no;
    // result.pan_card_number = data.pan_card_number
    //   ? data.pan_card_number
    //   : result.pan_card_link;

    await result.save();
    res.send({
      message: "user found",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

// USER ENDS

// ORDER START 
//get all Order
exports.getAllOrder = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const search = req.query.term || "";

    let result = await Order.find({order_note: {$regex: search, $options: "i"}}).populate('user_id');
    let orderArry = []

    result.forEach(obj => {
      let orderObj = {
        _id: obj._id,
        order_id: obj.order_id,
        price_per_share: obj.price_per_share,
        user_id: obj.user_id,
        order_amount: obj.order_amount,
        order_status: obj.order_status,
        order_token: obj.order_token,
        order_note: obj.order_note,
        stock_id: obj.stock_id,
        no_of_stocks: obj.no_of_stocks,
        left_shares: obj.left_shares,
        no_of_lots: obj.no_of_lots,
        is_order_approved: obj.is_order_approved,
        order_feedback: obj.order_feedback,
        orderType: 'purchase'
      }
      orderArry.push(orderObj)
    })

    let result1 = await SellStock.find({}).populate('user_id');

    let orderArry1 = []

    result1.forEach(obj => {
      let orderObj = {
        _id: obj._id,
        order_id: obj.order_id,
        user_id: obj.user_id,
        stocks_qty_to_be_sold: obj.stocks_qty_to_be_sold,
        total_amount: obj.total_amount,
        request_status: obj.request_status,
        orderType: 'sell'
      }
      orderArry1.push(orderObj)
    })

    let merged = orderArry.concat(orderArry1);

    function paginator(items, current_page, per_page_items) {
      let page = current_page || 1,
      per_page = per_page_items || 10,
      offset = (page - 1) * per_page,
    
      paginatedItems = items.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(items.length / per_page);
    
      return res.send({
        message: "List of All Order",
        data: paginatedItems,
        page: page,
        limit: limit,
        total: items.length,
        //per_page: per_page,
        // pre_page: page - 1 ? page - 1 : null,
        //next_page: (total_pages > page) ? page + 1 : null,
        //total_pages: total_pages,
      });
    }

   paginator(merged, page, limit);

  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//get all Order
exports.getAllPurchaseOrder = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.term || "";

    let result = await Order.find({order_note: {$regex: search, $options: "i"}})
      .populate('user_id')
      .skip((page - 1) * limit)
      .limit(limit);
    res.send({
      message: "List of All Purchase Order",
      data: result,
      page:page,
      limit: limit
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//get all sell order
exports.getAllSellOrder = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.term || "";

    let result = await SellStock.find({order_note: {$regex: search, $options: "i"}})
      .populate('user_id')
      .skip((page - 1) * limit)
      .limit(limit);
    res.send({
      message: "List of All Sell Order",
      data: result,
      page:page,
      limit: limit
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//get order by order_Id
exports.getOrderById = async (req, res, next) => {
  try {
    let result = await Order.findById(req.params.id).populate('user_id stock_id');
    res.send({
      message: "Order successfully fetched",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

// change order status
exports.orderStatus = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;
    console.log("req body", data);

    const orderData = await Order.findById(id);
    if (!orderData) {
      return res.send({ error: true, message: "order not found" });
    }

    orderData.is_order_approved = data.is_order_approved ? data.is_order_approved : orderData.is_order_approved;
    orderData.order_feedback = data.order_feedback ? data.order_feedback : orderData.order_feedback;

    await orderData.save()

    return res.send({
      message: "order status updated successfully",
      data: orderData
    });
  } catch (err) {
    res.send({
      message: err.message,
    })
  }
}

//ORDER ENDS


exports.addKYCDetails = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = req.body;

    const result = await User.findOne({
      mobile_number: data.mobile_number,
    });

    if (!result) {
      return res.send({ error: true, message: "user not found" });
    }
    result.email_id = data.email_id ? data.email_id : result.email_id;
    result.demat_acc_no = data.demat_acc_no
      ? data.demat_acc_no
      : result.demat_acc_no;
    result.pan_card_number = data.pan_card_number
      ? data.pan_card_number
      : result.pan_card_link;
    result.pan_card_link = data.pan_card_link
      ? data.pan_card_link
      : result.pan_card_link;
    result.account_number = data.account_number
      ? data.account_number
      : result.account_number;
    result.account_number_link = data.account_number_link
      ? data.account_number_link
      : result.account_number_link;
    result.aadhar_number = data.aadhar_number
      ? data.aadhar_number
      : result.aadhar_number;
    result.demat_screenshot = data.demat_screenshot
      ? data.demat_screenshot
      : result.demat_screenshot;
    result.nominee_name = data.nominee_name
      ? data.nominee_name
      : result.nominee_name;
    result.is_completed_profile = data.is_completed_profile
      ? data.is_completed_profile
      : result.is_completed_profile;
    result.is_completed_kyc = data.is_completed_kyc
      ? data.is_completed_kyc
      : result.is_completed_kyc;
    await result.save();
    // store notification for admin panel started 
    
    let SnoticationObj = new AdminNotification({
      user_id: result._id,
      message: "New Kyc submited"
    })
    await SnoticationObj.save();

    //ends
    res.send({
      message: "user found",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//GET ALL KYC DETAILS
exports.kyc = async (req, res, next) => {
  try {
    let allkyc = [];
    const kycData = await User.find();
    kycData.forEach(async (kyc) => {
      kyc = {
        _id: kyc.id,
        name: kyc.name,
        mobile_number: kyc.mobile_number,
        email_id: kyc.email_id,
        demat_acc_no: kyc.demat_acc_no,
        pan_card_number: kyc.pan_card_number,
        pan_card_link: kyc.pan_card_link,
        account_number: kyc.account_number,
        account_number_link: kyc.account_number_link,
        aadhar_number: kyc.aadhar_number,
        demat_screenshot: kyc.demat_screenshot,
        nominee_name: kyc.nominee_name,
        is_completed_profile: kyc.is_completed_profile,
        is_completed_kyc: kyc.is_completed_kyc,
        is_kyc_approved: kyc.is_kyc_approved
      }
      allkyc.push(kyc);
    })
    return res.send({
      data: allkyc
    });

  } catch (err) {
    res.send({
      message: err.message,
    })
  }
}

exports.getKYCDetails = async (req, res, next) => {
  try {
    const kycData = await User.findById(req.params.id);
    if (!kycData) {
      return res.send({ error: true, message: "user not found" });
    }
    const kycObj = {
      _id: kycData.id,
      name: kycData.name,
      mobile_number: kycData.mobile_number,
      email_id: kycData.email_id,
      demat_acc_no: kycData.demat_acc_no,
      pan_card_number: kycData.pan_card_number,
      pan_card_link: kycData.pan_card_link,
      account_number: kycData.account_number,
      account_number_link: kycData.account_number_link,
      aadhar_number: kycData.aadhar_number,
      demat_screenshot: kycData.demat_screenshot,
      nominee_name: kycData.nominee_name,
      is_completed_profile: kycData.is_completed_profile,
      is_completed_kyc: kycData.is_completed_kyc,
      is_approved: kycData.is_approved,
      is_kyc_approved: kycData.is_kyc_approved
    }

    return res.send({
      data: kycObj
    });
  } catch (err) {
    res.send({
      message: err.message,
    })
  }
}


exports.kycStatus = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;
    console.log("req body", data);

    const kycData = await User.findById(id);
    if (!kycData) {
      return res.send({ error: true, message: "user not found" });
    }

    kycData.is_kyc_approved = data.is_kyc_approved ? data.is_kyc_approved : kycData.is_kyc_approved;
    kycData.kyc_feedback = data.kyc_feedback ? data.kyc_feedback : kycData.kyc_feedback;

    await kycData.save()
     //genrate notification 
     if(!kycData.is_kyc_approved){
      let snotifyObj = new Notification({
        user_id: kycData._id,
        message: kycData.kyc_feedback
      });
      await snotifyObj.save()

      let eUser = await User.findByIdAndUpdate(
        kycData.user_id,
        {
          $push: { notification: snotifyObj._id }
        },
        { new: true, userFindAndModify: false },
      );
      console.log("notification sent");

    }

    return res.send({
      message: "kyc status updated",
      data: kycData
    });
  } catch (err) {
    res.send({
      message: err.message,
    })
  }
}



exports.storeNotification = async (req, res, next) => {
  try {
    let data = req.body;
    let ndata = [];

    for (let i = 0, l = data.user_id.length; i < l; i++) {

      var obj = data.user_id[i];
      var id = obj  // user id 

      ndata.push(id);
    }

    let snotifyObj = new Notification({
      user_id: ndata,
      message: data.message
    });
    await snotifyObj.save()

    for (let i = 0, l = ndata.length; i < l; i++) {
      console.log(i)
      var id = ndata[i];
      console.log("ids", id);

      let eUser = await User.findByIdAndUpdate(
        id,
        {
          $push: { notification: snotifyObj._id }
        },
        { new: true, userFindAndModify: false },
      );
    }

    return res.send({
      data: snotifyObj
    })

  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
}
//get all admin notification
exports.getAllAdminNotification = async (req, res, next) => {
  try{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 10;
    const total = await AdminNotification.countDocuments();
    const data = await AdminNotification.find().skip((page -1)* limit).limit(limit);

  res.send({
    message: "successfully fetched Admin notifications",
    data: data,
    page: page,
    limit: limit,
    total: total
  })
  }catch(err){
    res.send({
      message: err.message
    });
  }
}

//get all Notifications
exports.getAllNotification = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.term || "";

    let result = await Notification.find({message: {$regex: search, $options: "i"}})
    .populate('user_id')
    .skip((page - 1) * limit)
    .limit(limit);
    
    let data = [];

    result.forEach(obj => {
      let notificationObj = {
        ...obj._doc,
      };
      data.push(notificationObj);
    })

    res.send({
      message: "List of All Notification",
      data: data
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

// CASHOUT START

//create
//update user with cashout 
exports.updateUserwithCashout = async (req, res, next) => {
  try {
    const nCashout = req.body;
    const { user_id } = req.body;
    const ncashout = await Cashout.create(nCashout)
    const newBlog = await User.findByIdAndUpdate(
      user_id,
      {
        $push: { cashout: ncashout._id }
      },
      { new: true, useFindAndModify: false },
    );
    res.send({
      message: "cashout successfully created",
      data: ncashout,
    });
  } catch (err) {
    next(err)
  }
}

//get all cahout
exports.getAllCashout = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.term || "";

    let result = await Cashout.find() //{cashout_amount: {$regex: search, $options: "i"}}
    .populate('user_id')
    .skip((page - 1) * limit)
    .limit(limit);
    
    let data = [];

    result.forEach(obj => {
      let cashoutObj = {
        id: obj._id,
        user_id: obj.user_id,
        cashout_amount: obj.cashout_amount,
        cashout_status: obj.cashout_status,
        cashout_feedback: obj.cashout_feedback
      }
      data.push(cashoutObj);
    })

    res.send({
      message: "List of All Cashout",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

//get cashout by Id
exports.getCashoutById = async (req, res, next) => {
  try {
    let result = await Cashout.findById(req.params.id).populate('user_id');
    console.log(result);
    let obj = {
      id: result._id,
      user_id: result.user_id,
      cashout_amount: result.cashout_amount,
      cashout_status: result.cashout_status,
      cashout_feedback: result.cashout_feedback
    }
    res.send({
      message: "cashout",
      data: obj,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message,
    });
  }
};

// change cashout status
exports.cashoutStatus = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;

    const cashoutData = await Cashout.findById(id);
    if (!cashoutData) {
      return res.send({ error: true, message: "cashout not found" });
    }

    cashoutData.cashout_status = data.cashout_status;
    cashoutData.cashout_feedback = data.cashout_feedback ? data.cashout_feedback : cashoutData.cashout_feedback;

    await cashoutData.save()


    //genrate notification 
    if(!cashoutData.cashout_status){
      console.log("cashout notification false");
      let snotifyObj = new Notification({
        user_id: cashoutData._id,
        message: cashoutData.cashout_feedback
      });
      await snotifyObj.save()

      let eUser = await User.findByIdAndUpdate(
        cashoutData.user_id,
        {
          $push: { notification: snotifyObj._id }
        },
        { new: true, userFindAndModify: false },
      );
      console.log("notification sent");

    }

    return res.send({
      message: "order status updated successfully",
      data: cashoutData
    });
  } catch (err) {
    res.send({
      message: err.message,
    })
  }
}

// CASHOUT ENDS
