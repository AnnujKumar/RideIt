const axios = require("axios")
const getCoordinates = async(address)=>{
                if(address){
                        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC_pRE8gqJFNOryaU8S-u6PcutUIoJIryg`)
                        if(response.data.status==="OK")
                            {
                                console.log(response.data.results[0].geometry.location);
                                return response.data.results[0].geometry.location;
                            }
                            else {
                                throw new Error("Something went wrong in get Coordinates file")
                            }
                }
                else{
                    throw new Error("Address is not defined")
                }
}

const getJourneyDetails = async(origin,destination)=>{
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {


        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getAutoCompleteSuggestions = async(input)=>{
    if(!input) throw new Error("Couldn't process autocomplete request , Input not defined");
    const apiKey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try{
    const response = await axios.get(url);
  if(response.status!==200) throw new Error("there is some error with get request for autocomplete suggestion");
  const {data} = response;
  if(data.status!=="OK")throw new Error("There is some error with google autocomplete api");
  else{
    const output = data.predictions.map(prediction=>prediction.description).filter(value=>value);
    return output;
  }
}
catch(err){
    console.log(err);
    throw err;
}
}

module.exports.getAutoCompleteSuggestions = getAutoCompleteSuggestions;
module.exports.getJourneyDetails = getJourneyDetails;
module.exports.getCoordinates = getCoordinates