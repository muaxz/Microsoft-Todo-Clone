const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:String,
    age:Number,
})

module.exports = mongoose.model("users",userSchema)