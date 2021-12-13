require("dotenv").config();
const express = require("express") 
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const router = express.Router();
const newToken = (user) => {
   return  jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
}
const register = async (req, res)=> {
try {
let user = await User.findOne({email : req.body.email}).lean().exec()
if(user)

    return res.status(400).json({
        status : "failure",
        message: "Please provide another email",
    });

    user = await User.create(req.body);

    const token = newToken(user)
    res.status(201).json({user, token})
} catch (e)
{
    return res.status(500).json({status: "failed", message: e.message })
}
};

const movie = async (req, res)=> {
    try {
    let user = await User.findOne({email : req.body.email}).lean().exec()
    if(user)
    
        return res.status(400).json({
            status : "failure",
            message: "Please provide another email",
        });
    
        user = await User.create(req.body);
    
        const token = newToken(user)
        res.status(201).json({user, token})
    } catch (e)
    {
        return res.status(500).json({status: "failed", message: e.message })
    }
    };

const login = async  (req, res)=> {

    try {
        let user = await User.findOne({email : req.body.email})

        if(!user)

    return res.status(400).json({
        status : "failure",
        message: "Please provide correct email and password",
    });

    const match = await user.checkpassword(req.body.password)

    if(!match)

    return res.status(400).json({
        status : "failure",
        message: "Please provide correct email and password",
    });

    const token = newToken(user)
    res.status(201).json({user, token})
 
       }
          catch (e)
    {
        return res.status(500).json({status: "failed", message: e.message })
    
    };
}




module.exports= { register, login, movie}

//http://localhost:1212/login
//http://localhost:1212/register