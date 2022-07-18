const Login = require("../Model/login")

exports.login = async (req, res, next) => {
    try {
      const loginData = {
        mobile_number: req.body.mobile_number,
        email_id: req.body.email_id,
        password: req.body.password,
      } 
      const data = await Login.create(loginData);
      res.send({
        message: data,
      })
    } catch (err) {
        res.send({
            message: err.message,
        })
    }
}