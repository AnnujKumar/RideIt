const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user")
const captainRoutes = require("./routes/captain");
const mapsRoutes = require("./routes/maps")
const rideRoutes = require("./routes/ride")
const connectToDb  = require("./db/db")
const cookieParser = require("cookie-parser");

app.use(cors());
connectToDb();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/users",userRoutes);
app.use("/captain",captainRoutes)
app.use("/maps",mapsRoutes)
app.use("/ride",rideRoutes)
app.use("*",(err,req,res,next)=>{
    const {status=401,message} = err;
    return res.status(status).json({message:message})
})
module.exports = app;