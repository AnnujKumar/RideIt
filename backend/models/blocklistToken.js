const mongoose = require("mongoose");
const {Schema} = mongoose;
const blockSchema = new Schema({
    token:{
        type:String,
        unique:true,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:84600
    }
})
module.exports = mongoose.model("block",blockSchema);