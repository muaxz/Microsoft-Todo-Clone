const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
     text:String,
     isDone:{
        type:Boolean,
        default:false,
     },
     deadLine:{
        type:Date,
        default:'2002-12-09'
     },
     note:{
        type:String,
        default:""
     },
     steps:{
        type:[{text:String,isDone:Boolean}],
        default:[{text:"",isDone:false}]
     },
     listId:String
})

module.exports = mongoose.model("todos",todoSchema)