const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const userValidate = require("../Validations/userSchemaValidator");
const blocklistToken = require("../models/blocklistToken")
const jwt = require("jsonwebtoken")
module.exports.registerUser = async(req,res)=>{
    const {fullname,email,password} = req.body;
    try{
        const ans = await userValidate.validateAsync({fullname,email,password});
    }catch(err){
        return res.status(401).json({message:err.message});
    }
    const hashedPassword = await userModel.hashPassword(password);
    const newUser = new userModel({
        fullname:fullname,email:email,password:hashedPassword
    });
    await newUser.save();
    const token = newUser.generateAuthToken();
    res.status(201).json({token:token,user:newUser});   
}
module.exports.loginUser = async(req,res)=>{
    const {email,password}  = req.body;
    const user = await  userModel.findOne({email}).select("+password");
    if(!user){
        return res.status(401);
    }
    const isValid = await user.comparePassword(password);
    console.log(isValid)
    if(!isValid){
        res.status(401).json({message:"Password is wrong"});
    }else{
        const token = user.generateAuthToken();
        res.cookie("token",token);
        return res.status(201).json({user:user,token:token});
    }
}

module.exports.getProfile = async (req,res)=>{
    res.status(201).json(req.user);
}
module.exports.logoutUser = async (req,res)=>{
    res.clearCookie("token")
    const token = req.cookies.token||req.headers.authorization?.split(" ")[1]
            
            await blocklistToken.create({token})
            return res.status(201).json({message:"successfully logged out"});
}