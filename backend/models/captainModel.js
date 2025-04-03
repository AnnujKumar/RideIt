const mongoose = require("mongoose");
const {Schema} = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'Firstname must be at least 3 characters long' ],
        },
        lastname: {
            type: String,
            minlength: [ 3, 'Lastname must be at least 3 characters long' ],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
    },
    Vehicle:
    {
       type: Schema.Types.ObjectId,
        ref:"Vehicle"
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

captainSchema.methods.getAuthToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET);
}
captainSchema.methods.comparePassword = async  function(password){
    return await bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
module.exports = mongoose.model("captain",captainSchema);