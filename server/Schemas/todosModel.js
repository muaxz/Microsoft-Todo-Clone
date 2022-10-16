const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
     text:{
       type:String,
       required:true
     },
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
     steps:[{text:String,isDone:Boolean}],
     listId:String,
     important:{
       type:Boolean,
       default:false
     }
})

module.exports = mongoose.model("todos",todoSchema)