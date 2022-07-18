let mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
  {
    mobile_number: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
    },
    email_id: {
      type: mongoose.Schema.Types.String,
      trim: true,
      required: false,
    },
    password: {
      type: mongoose.Schema.Types.String,
    }
  }
);

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
