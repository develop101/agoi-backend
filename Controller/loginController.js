const Login = require("../Model/loginModel")
const crypto = require("crypto");

exports.login = async (req, res, next) => {
    try {
      let token = crypto.randomBytes(8).toString("hex");
      const loginData = {
        mobile_number: req.body.mobile_number,
        email_id: req.body.email_id,
        password: req.body.password,
        token: token, 
      } 

     
    // const data = await Login.create(loginData);
      res.send({
        message: loginData,
      })
    } catch (err) {
        res.send({
            message: err.message,
        })
    }
}