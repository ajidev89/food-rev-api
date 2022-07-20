const User = require("../models/User");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
const { SendEmailTo } = require("../controllers/EmailController.js")
const ejs = require("ejs");
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
            'message':"User email not found"
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
        "message":"Invaild credentials",
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

const resetPassword = async(req, res) => {
    let request = req.body;
    let user = await User.findOne({'email' : request.email});

    if(!user){
        return res.status(404).json({
            'message': "User email not found"
        });
    }
    
    let generateString = randomstring.generate(24);

    try {  

        await User.findOneAndUpdate({'email' : request.email},{
            "password_reset" : generateString
        });

        user = await User.findOne({'email' : request.email})

        const template = await ejs.renderFile('src/views/mails/reset-password.ejs',{ 
            user: user
        });

        await SendEmailTo({
            from: '"Food Rev" <foo@example.com>', 
            to: request.email,
            subject: "Reset Password", 
            html: template 
        });

        return res.status(200).json({
            'message':"Succesfully sent an email"
        });

    } catch (error) {
        return res.status(500).json({
            'message':error
        });
    }
    
}


const changePassword = async(req,res) => {
    let request = req.body;
    let user = await User.findOne({'password_reset' : request.token});

    if(!user){
        return res.status(404).json({
            'message': "Token is invaild"
        });
    }

    try {  
        if( request.password == request.confirm_password){
            let hashedPassword =  await bcrypt.hash(request.password, 10);
            user  = await User.findOneAndUpdate({'password_reset' : request.token},{
                'password' : hashedPassword,
                'password_reset' : ""
            });
            return res.status(200).json({
                'message':"Succesfully changed password"
            });
        }else{
            return res.status(400).json({
                'message':"Password do not match"
            });
        }
    } catch (error) {
        return res.status(500).json({
            'message':error
        });
    }
}


module.exports = {
    login,
    register,
    resetPassword,
    changePassword
}