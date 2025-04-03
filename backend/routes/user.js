const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logoutUser,getProfile} = require("../controllers/user")
const jwt = require("jsonwebtoken")
const bocklistToken = require("../models/blocklistToken")
const userModel = require("../models/userModel");
const blocklistToken = require("../models/blocklistToken");
const {authUser} = require("../middleware/user/userAuth")
router.post("/register",registerUser)
router.post("/login",(req,res,next)=>{
    if(req.cookies.token){
    console.log(req.cookies.token)
    }
    console.log("reached here")
    next();
},loginUser)
router.get("/logout",(req,res,next)=>{console.log("gotcha");next()},authUser,logoutUser)
router.get("/profile",authUser,getProfile)
module.exports = router;