const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");
const authUser = async(req,res,next)=>{
        try{
        console.log("gotcha")
        const token = req.cookies.token||req.headers.authorization?.split(" ")[1];

        if(!token)
                {console.log("Yes the error is here")
                        return res.status(401).json({message:"Auth token is missing"});

                }
        console.log("Token in user auth is " + token)
        const isValid = jwt.verify(token,process.env.JWT_SECRET);
        console.log(isValid)
        if(!isValid)return res.status(401).json({message:"Not a valid token sorry"});
        req.user = await userModel.findById({_id:isValid.id});
        next();
        }
        catch(err){
                res.status(401).json({message:err.message})
        }
}
module.exports.authUser = authUser;