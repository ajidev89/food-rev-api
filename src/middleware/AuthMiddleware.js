const jwt = require('jsonwebtoken');
require('dotenv').config();


const checkUserLoggedIn = (req,res,next)=>{
   let token = req.header('authorization');
   
   if(token && token.split(" ")[0] === "Bearer"){
    let jwtToken = token.split(" ")[1];
        jwt.verify(jwtToken,process.env.JWT_KEY,(err,dedcodeToken)=>{
            if(err){
                return res.status(403).json({
                    "message": "User's token has expired"
               });
            }
            res.user = dedcodeToken
            next;
        })
   }

   return res.status(403).json({
        "message": "User not logged in"
   })
}

module.exports = {
    checkUserLoggedIn
}