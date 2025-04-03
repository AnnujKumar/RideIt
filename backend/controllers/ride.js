const {getCoordinates,getJourneyDetails,getAutoCompleteSuggestions} = require("../services/maps.services");
const {getFare,getOtp,getAllFares,getAllDrivers} = require("../services/ride.services");
const rideValidationSchema = require("../Validations/rideValidations");
const RideModel = require("../models/ride");
const {sendMessage} = require("../socket.js")
const createRide = async(req,res,next)=>{
    const{pickup,destination,vehicleType,fare,distance,duration} = req.query;
    if(!pickup||!destination||!vehicleType)throw new Error("All fields are required");
    try{
    const check = await rideValidationSchema.validateAsync({pickup:pickup,destination:destination,rideType:vehicleType});
    const otp = getOtp(4);
    const newRide = new RideModel({user:req.user,pickup:pickup,destination:destination,fare:fare,duration:duration.value,distance:distance.value,otp:otp});
    await newRide.save();
    const ride = await RideModel.findById(newRide._id)
  .populate("user") 
  .populate({
    path: "captain", 
    populate: { path: "Vehicle" } 
  });
    console.log("arrived here ")
    const captains = await getAllDrivers(pickup,50000);
    console.log(captains)
    captains.map((captain)=>{
            sendMessage("ride-available",{socketId:captain.socketId,message:ride})
    })
    console.log(newRide);
    res.status(201).json({ride:newRide});
    }
    catch(err){
        console.log(err)
        throw err
    }
next()
}
const getAllFare = async(req,res,next)=>{
        const {pickup,drop} = req.query;
        if(!pickup||!drop){
            throw new Error("Pickup and drop locations required for fare calculations");
        }
        try{
            const destination = drop;
            const {distance,duration} = await getJourneyDetails(pickup,destination);
            const fare = getAllFares((distance.value)/1000,(duration.value)/60);
            return res.status(201).json({fare:fare,distance:distance,duration:duration})
        }
        catch(err){
            console.log(err)
            throw err;
        }
}
const getConfirmRide =async (req,res,next)=>{
        if(!req.body.rideData||!req.body.captainData){
            return res.status(401).json({message:"both ride and captain data required"});

        }
        try{
            const {captainData,rideData} = req.body;
            let ride = await RideModel.findOneAndUpdate({_id:rideData._id},{
                captain:captainData._id,status:"accepted"
            },{new:true})
            ride = await RideModel.findOne({_id:rideData._id}).populate("user").populate({path:"captain",populate:({path:"Vehicle"})}).select("+otp");
            console.log(ride)
            console.log("MSGISBEST")
            sendMessage("ride-accepted",{
                socketId:ride.user.socketId,
                message:ride
            })
            return res.status(201).json({ride:ride})
        }
        catch(err){
            console.log(err)
        }
}
const getRide = async(req,res,next)=>{
    if(!req.query.userId){
        return res.status(401).json({message:"could not verify "});
    }
    const {userId} = res.query.userId;
    const ride = await rideModel.find({user:userId}).populate("user").populate({path:"captain",populate:({
        path:"Vehicle",
    })});
    console.log(ride)
    res.status(201).json({ride:ride});
    
}
const getRideStart = async(req,res,next)=>{
    console.log(req.query)
    if(!req.query.ride||!req.query.otp)return res.status(401).json({message:"either ride or otp not provided"});
    try{
        if(req.query.otp === req.query.ride.otp){
            const rides = await RideModel.findOneAndUpdate({_id:req.query.ride._id},{
                status:"ongoing"
            })
            sendMessage("ride-start",{
                socketId:req.query.ride.user.socketId,
                message:""
            })
            return res.status(201).json({message:"ride started"})
        }
        else{
            return res.status(401).json({message:"Your otp is wrong"})
        }
        
    }
    catch(err){

    }
}

const getRideEnd = async(req,res,next)=>{
    if(!req.query.ride){
        return res.status(401).json({message:"No ride available"});

    }
    try{
        const {ride} = req.query;
        const newRide = await RideModel.findOneAndUpdate({_id:ride._id},
        {
            status:"completed"
        }
        )
    if(newRide){
        sendMessage("ride-completed",{
            socketId:ride.user.socketId,
            message:""
        })
        return res.status(201).json({message:"ride completed"})
    }
    }
    catch(err){
        console.log(err)
    }
}
module.exports.getRideEnd = getRideEnd;
module.exports.getRideStart = getRideStart
module.exports.getRide = getRide
module.exports.getConfirmRide = getConfirmRide;
module.exports.getAllFare = getAllFare
module.exports.getRideEndUser = async(req,res,next)=>{
    if(!req.query.ride){
        return res.status(401).json({message:"No ride available"});

    }
    try{
        const {ride} = req.query;
        const newRide = await RideModel.findOneAndUpdate({_id:ride._id},
        {
            status:"completed"
        }
        )
    if(newRide){
        sendMessage("ride-completed",{
            socketId:ride.captain.socketId,
            message:""
        })
        return res.status(201).json({message:"ride completed"})
    }
    }
    catch(err){
console.log(err)
    }
}
module.exports.createRide = createRide