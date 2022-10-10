const mongoose = require("mongoose")
const User = require("../Schemas/usersModel")

mongoose.connect("mongodb+srv://muaxz:hamitozr1@cluster0.7r4nv0t.mongodb.net/todo_db?retryWrites=true&w=majority",()=>{
    console.log("connected to database")
})

const newUser = new User({userName:"emre",age:22})
newUser.save(()=>console.log("added"))


