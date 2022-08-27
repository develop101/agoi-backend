const Login = require("../Model/loginModel")
const crypto = require("crypto");

exports.login = async (req, res, next) => {
    try {
      let token = crypto.randomBytes(8).toString("hex");
      let userPassword = req.body.password;
      if(userPassword == "Aveek@321@agoi"){
        const loginData = {
          mobile_number: req.body.mobile_number,
          email_id: req.body.email_id,
          password: req.body.password,
          token: token, 
        } 
  
       
      // const data = await Login.create(loginData);
       return res.send({
          message: loginData,
        })
      }
      return res.status(401).send({
        message: "wrong credentials",
      })
      
    } catch (err) {
        res.send({
            message: err.message,
        })
    }
}