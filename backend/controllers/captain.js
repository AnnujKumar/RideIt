const captainModel = require("../models/captainModel");
const jwt = require("jsonwebtoken");
const captainSchema = require("../Validations/captainValidations");
const vehicleModel = require("../models/vehicleModel")
const blocklistToken = require("../models/blocklistToken")
module.exports.registerCaptain = async (req,res)=>{
    console.log("bhai yha tak toh aaya hai iske aage nhi gya toh error mujhme hi hai ")
    const {captain,vehicleData} =req.body;
    console.log(captain,vehicleData);
    try{
            const ans = await captainSchema.validateAsync({fullname:{
                firstname:captain.firstname,
                lastname:captain.lastname
            },email:captain.email,password:captain.password,vehicle:vehicleData});
    
    const hashedPassword = await captainModel.hashPassword(captain.password);
    const user = new captainModel({fullname:{
        firstname:captain.firstname,
        lastname:captain.lastname
    },email:captain.email,password:hashedPassword});
    const newVehicle = new vehicleModel(vehicleData);
    newVehicle.captain = user;
    user.Vehicle = newVehicle;
    await user.save();
    await newVehicle.save();
}
catch(err){
    console.log(err.message)
    return res.status(401).json({error:err.message});
}
    const token = user.getAuthToken();
    res.cookie("token",token);
    res.status(201).json(user);

}

module.exports.loginCaptain = async(req,res)=>{
    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select("+password");
    if(!captain)return res.status(401).json({message:"captain not found"});
    const isValid =  await captain.comparePassword(password);
    if(!isValid){
        return res.status(401).json({message:"Wrong password"});
    }
    else{
        const token = captain.getAuthToken();
        console.log(token)
        res.cookie("token",token);
        return res.status(201).json({user:captain,token:token});
    }
}

module.exports.logoutCaptain = async (req,res)=>{
    try{
        console.log("tried")
    const token = req.cookies.token||req.headers.authorization?.split(" ")[1];
    if(!token)return res.status(501).json({message:"Invalid Token"})
    res.clearCookie("token");
    const block = new blocklistToken({token:token});
    await block.save();
    console.log("user logged out successfully")
    res.status(201).json({message:"Successfully logged out Byeee!!!"})
    }
    catch(err){
        console.log("error detected")
        return res.status(501).json({message:err.message});
    }
}

module.exports.getProfile = async(req,res,next)=>{
    if(!req.user) return res.status(401).json({message:"No captain detected"});
    try{
            return res.status(201).json(captain);
    }catch(err){
        console.log(err)
    }
}