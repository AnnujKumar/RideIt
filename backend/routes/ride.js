const express = require("express");
const {authUser} = require("../middleware/user/userAuth");
const authCaptain = require("../middleware/user/captainAuth")
const {createRide,getAllFare,getConfirmRide,getRide,getRideStart,getRideEnd,getRideEndUser} = require("../controllers/ride")
const asyncWrap = require("../Errors/asyncCatch");
const router = express.Router();
router.get("/create-ride",authUser,asyncWrap(createRide));
router.get("/get-fare",authUser,asyncWrap(getAllFare))
router.post("/confirm-ride",authCaptain,asyncWrap(getConfirmRide))
router.get("/get-ride",authUser,asyncWrap(getRide))
router.get("/ride-start",authCaptain,getRideStart)
router.get("/user-ride-end",authUser,getRideEndUser);
router.get("/captain-ride-end",authCaptain,getRideEnd)
module.exports = router;