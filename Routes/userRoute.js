const express = require("express");
const { generateOrder, returnOrderUrl, getOrderFromBackend: getOrder, getOrderFromCashFree, generatePayment, getUserOrders, availableOrder } = require("../Controller/OrdersController");
const { createUserByContact, findUserByContact, addKYCDetails, completeProfileDetails, findall, findById, deleteUserById , EditWalletAmount, getKYCDetails, getallKYCDetails, editUserById, getAll, editAdminDetails, getAllOrder, getOrderById} = require("../Controller/userController");
const router = express.Router();


router.route("/create").post(createUserByContact);
router.get("/",getAll);
router.route("/finduser").post(findUserByContact)
router.route("/addkyc").post(addKYCDetails)
router.route("/complete-profile").post(completeProfileDetails)
router.route("/createOrder").post(generateOrder)
router.route("/get-return-order").post(returnOrderUrl)
router.get("/order", getAllOrder);
router.get("/order/available", availableOrder);
router.get("/order/:order_id", getOrderById);
router.get("/get-order/:order_id/:order_token", getOrder)
router.get("/get-order-cashfree/:order_id", getOrderFromCashFree)
router.post("/generate-payment", generatePayment)
router.get("/get-user-orders/:id", getUserOrders)
router.delete("/:id", deleteUserById);
router.get("/:id",findById);
router.route("/edit-wallet/:id").post(EditWalletAmount);
router.get("/getallKYC", getallKYCDetails);
router.get("/getKYC/:id", getKYCDetails);
//router.route("/editadmin1").post(editUserById);
router.route("/editadmin").post(editAdminDetails);


module.exports = router;