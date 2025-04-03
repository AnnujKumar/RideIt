const crypto = require("crypto");
const captainModel = require("../models/captainModel")
const {getCoordinates} = require("../services/maps.services")
const getfare = (rideType,distance,duration,surgeMultiplier=1)=>{
    const fareRates = {
        car: { baseFare: 50, perKm: 12, perMin: 2 },
        moto: { baseFare: 30, perKm: 8, perMin: 1 },
        auto: { baseFare: 40, perKm: 10, perMin: 1.5 }
    };

    if (!fareRates[rideType]) {
        throw new Error("Invalid ride type! Choose from 'car', 'moto', or 'auto'.");
    }

    const { baseFare, perKm, perMin } = fareRates[rideType];

    let totalFare = baseFare + (distance * perKm) + (duration * perMin);
    totalFare *= surgeMultiplier;
    return totalFare.toFixed(2);
}
const getAllFares = (distance,duration,surgeMultiplier=1)=>{
    const fareRates = {
        car: { baseFare: 50, perKm: 12, perMin: 2 },
        moto: { baseFare: 30, perKm: 8, perMin: 1 },
        auto: { baseFare: 40, perKm: 10, perMin: 1.5 }
    };
    const totalFares = {
        car:0,
        moto:0,
        auto:0
    }
    for(let f in totalFares){
        const { baseFare, perKm, perMin } = fareRates[`${f}`];
        let totalFare = baseFare + (distance * perKm) + (duration * perMin);
        totalFare *= surgeMultiplier;
        totalFares[f] = totalFare.toFixed(2);
    }
    return totalFares
}
const getOtp = (length = 4) => {
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length);
    return otp.toString();
};

const getAllDrivers = async(pickup,radius)=>{
    const coordinates = await getCoordinates(pickup);
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ coordinates.lat, coordinates.lng ], radius / 6371 ]
            }
        }
    })
    return captains;
}


module.exports.getAllFares = getAllFares
module.exports.getFare = getfare
module.exports.getOtp = getOtp
module.exports.getAllDrivers = getAllDrivers