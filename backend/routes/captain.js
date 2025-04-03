const express = require("express");
const captainModel = require("../models/captainModel");
const captainSchema = require("../Validations/captainValidations")
const {registerCaptain,loginCaptain,logoutCaptain,getProfile} = require("../controllers/captain")
const captainAuth  = require("../middleware/user/captainAuth")
const blacklistToken = require("../models/blocklistToken");
const router = express.Router();
router.post("/register",registerCaptain);
router.post("/login",loginCaptain);
router.get("/logout",captainAuth,logoutCaptain);
router.get("/profile",captainAuth,(req,res)=>res.status(201).json(req.user))
router.get("/profile",captainAuth,getProfile)



module.exports = router;
