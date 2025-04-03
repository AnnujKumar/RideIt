const jwt = require("jsonwebtoken");
const captainModel = require("../../models/captainModel")
module.exports = async (req,res,next)=>{
    try{
    const token = req.cookies.token||req.headers.authorization?.split(" ")[1];
    if(token===null) return res.status(401).json({message:"No valid auth token"});
    console.log("TOKEN IS " +" " +token)
    const isValid = jwt.verify(token,process.env.JWT_SECRET);
    if(!isValid)return res.status(401).json({message:"Couldnt verify your login session"});
    req.user = await captainModel.findById({_id:isValid.id})
    next()
    }
    catch(err){
        res.status(401).json(err)
    }
}