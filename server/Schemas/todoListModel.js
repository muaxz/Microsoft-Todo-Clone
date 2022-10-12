const mongoose = require("mongoose")

const todoListSchema = new mongoose.Schema({
    listName:String,
})

module.exports = mongoose.model("lists",todoListSchema)