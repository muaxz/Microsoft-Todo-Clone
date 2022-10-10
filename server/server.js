const express = require("express")
const DB = require("./connection/dbConnection")
const app = express()


app.listen(3001,()=>console.log("server listening..."))