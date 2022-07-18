const express = require("express");
const { login } = require("../Controller/loginController");
const router = express.Router();

router.route("/login").post(login);

module.exports = router

