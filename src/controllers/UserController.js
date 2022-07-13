const User = require("../models/User");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user) =>{

    let token = jwt.sign(user.toJSON(), process.env.JWT_KEY,{ expiresIn: 172800 });

    return token
}

const login = async (req, res) => {
    let request = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }

   let user = await User.findOne({
        'email':request.email
    })

    if(!user){
        return res.status(404).json({
            'user':"User not found"
        });
    }
    let compare = await bcrypt.compare(request.password,user.password)
    if(compare){
        let token = createToken(user);
        let data = {
            "user":user,
            "token":token
        }

        return res.json(data)
    }


    return res.json({
        "message":"Invaild credetials",
    },403)

   
} 

const register = async(req, res) => {
    let request = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let hashedPassword =  await bcrypt.hash(request.password, 10);

    const user = new User({
        "first_name" : request.first_name,
        "last_name" : request.last_name,
        "email" : request.email,
        "password" : hashedPassword,
        "role": "admin" 
    });
   
    try {
        await user.save()
        let data = {
            "message":"success",
            "user" : user
        }
        res.status(200).send(data)
    } catch (error) {
        let data = {
            "message":"failed",
            "error" : error,
        }
        res.status(400).send(data)
    }
} 



module.exports = {
    login,
    register
}