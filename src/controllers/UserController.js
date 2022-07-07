const User = require("../models/User");
const { body, validationResult } = require('express-validator');

const login = (req, res) => {
    let data = {
        "name" : "Ayobami"
    }
    res.json(data)
} 
body('email')

const registerValidation = [
    body('email').isEmail(),
]

const register = async(req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new User(req.body);
   
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