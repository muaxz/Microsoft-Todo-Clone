const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
     text:String,
     isDone:{
        type:Boolean,
        default:false,
     },
     Deadline:{
        type:Date,
        default:'0000-00-00'
     },
     notes:{
        type:Array,
        default:[]
     },
     listId:mongoose.SchemaTypes.ObjectId
})

module.exports = mongoose.model("todos",todoSchema)