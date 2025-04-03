const socketIo = require("socket.io");
const captainModel = require("./models/captainModel");
const userModel = require("./models/userModel")
let io;
const RideModel = require("./models/ride")


const startRide = async()=>{


}

module.exports.initializeSocket = (server)=>{
     io = socketIo(server,{
        cors:{
            origin:"*",
            request:["GET","POST"]
        }
    })
    io.on("connection",(socket)=>{
        console.log("Socket id is "+socket.id);
        socket.on("join",async({userId,userType})=>{
            
                if(userType==="user"){
                        console.log("action called" + " " + userId)
                        const users = await userModel.findByIdAndUpdate(userId,{socketId:socket.id});
                        console.log(`connected user with socket id ${socket.id}`)
                }
                else if(userType==="captain"){
                    const captain = await captainModel.findByIdAndUpdate(userId,{socketId:socket.id});
                    console.log(`connected captain with socket id ${socket.id}`)
                }
        })
        socket.on("update-captain-location",async (data)=>{
            const {userId,location} = data;
            if(!location|| !location.ltd|| !location.lng){
                return socket.emit("error",{message:"location not provided correctly"})
            }
            const captain = await captainModel.findByIdAndUpdate(userId,{location:{
                ltd:location.ltd,
                lng:location.lng
            }});
        socket.on("ride-accepted",async(id)=>{
            socket.to(id).emit("ride-accepted",)
        })
        })
    })
}
module.exports.sendMessage = (event,{socketId,message})=>{
    if(io){
        io.to(socketId).emit(event,message);
    }
    else {
        console.log("socket is not initialised")
    }
    
}
