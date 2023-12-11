
const jwt = require("jsonwebtoken");
const usermodel = require("../model/userModel");
const secret_key = "my-secret";

const middleware = {
   verifyToken : (req, res, next) => {
    let token = req.headers["authorization"];
    console.log(token);
    if (token) {
      token = token.split(" ")[1];
      console.log(token);
      jwt.verify(token, secret_key, async(error, success) => {
        if (error) {
          res.send({message:"Please provide valid token"});
        } else {
          
          const data = await usermodel.findById(success.user._id)
          if(!data){
            return 
          }
          req.user= data,
          next();
        }
      });
    } else {
      res.status(500).send({message:"Please add token with headers."});
    }
  }

}


module.exports = middleware ;
