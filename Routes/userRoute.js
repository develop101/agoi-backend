const express = require("express");
const { generateOrder, returnOrderUrl, getOrderFromBackend: getOrder, getOrderFromCashFree, generatePayment, getUserOrders, availableOrder } = require("../Controller/OrdersController");
const { createUserByContact, findUserByContact, addKYCDetails, completeProfileDetails, findall, findById, deleteUserById , EditWalletAmount, getKYCDetails, getallKYCDetails, editUserById, getAll, editAdminDetails, getAllOrder, getOrderById, kyc, kycStatus, orderStatus, storeNotification, getAllNotification, getAllSellOrder, getAllPurchaseOrder, getAllCashout, getCashoutById, cashoutStatus, updateUserwithCashout, getAllAdminNotification, getAllUserNotification, userNotificationStatus, investmentByUserId} = require("../Controller/userController");
const router = express.Router();


router.route("/create").post(createUserByContact);
router.get("/",getAll);
router.route("/finduser").post(findUserByContact)
router.route("/addkyc").post(addKYCDetails)
router.route("/complete-profile").post(completeProfileDetails)
router.route("/createOrder").post(generateOrder)
router.route("/get-return-order").post(returnOrderUrl)
router.get("/order", getAllOrder);
router.get("/order/purchase", getAllPurchaseOrder);
router.get("/order/sell", getAllSellOrder);
router.get("/order/available", availableOrder);
router.get("/order/:id", getOrderById);
router.route("/order/:id").post(orderStatus);
router.get("/get-order/:order_id/:order_token", getOrder)
router.get("/get-order-cashfree/:order_id", getOrderFromCashFree)
router.post("/generate-payment", generatePayment)
router.get("/get-user-orders/:id", getUserOrders)
router.delete("/:id", deleteUserById);
router.get("/:id",findById);
router.get("/investment/:id", investmentByUserId);
router.route("/edit-wallet/:id").post(EditWalletAmount);
router.get("/kyc/all", kyc);
router.get("/kyc/:id", getKYCDetails);
router.route("/kyc/:id").post(kycStatus);
router.route("/editadmin").post(editAdminDetails);
router.route("/notify").post(storeNotification);
router.route("/user-notification/:id").get(getAllUserNotification);
router.route("/user-notification/:id").post(userNotificationStatus);
router.get("/notify/all", getAllNotification);
router.get("/admin-notification/all", getAllAdminNotification);
router.post("/cashout", updateUserwithCashout);
router.get("/cashout/all", getAllCashout);
router.get("/cashout/:id", getCashoutById);
router.post("/cashout/status/:id", cashoutStatus);

module.exports = router;