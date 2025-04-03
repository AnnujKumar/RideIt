const {getCoordinates,getJourneyDetails,getAutoCompleteSuggestions} = require("../services/maps.services");
module.exports.getCoordinate = async(req,res,next)=>{
    if(!req.query){
        throw new Error("No adddress provided");
    }
    else{
        const coordinates =await  getCoordinates(req.query.address);
        return res.status(201).json(coordinates);

    }
}
module.exports.getJourneyDetail = async(req,res,next)=>{
    try{
    const {origin,destination} = req.query;
    if(!origin||!destination){
        throw new Error("Either origin or destination not given");
    }
    else{
        const data = await getJourneyDetails(origin,destination);
        if(!data){
            throw new Error("Something went wrong in Journey details File");
        }
        else{
            res.status(201).json(data)
        }
    }}
    
    
    catch(err){
        next(err)
    }
}
module.exports.getAutoCompleteSuggestion = async(req,res,next)=>{
    const {input} = req.query;
    if(!input){
        throw new Error("No place given as input");
    }
    try{
        const data = await getAutoCompleteSuggestions(input);
        res.status(201).json(data);
    }
    catch(err){
        console.log(err);
        throw err;
    }
}