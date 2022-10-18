const express = require("express")
const cors = require("cors")
const DB = require("./connection/dbConnection")
const User = require("./Schemas/usersModel")
const TodoListModel = require("./Schemas/todoListModel")
const Todos = require("./Schemas/todosModel")
const app = express()
const path = require("path")


app.use(cors({origin:"http://localhost:3000"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/createList",async (req,res,next)=>{

    try {

        const {listName} = req.body;
        console.log(listName)
        const newList = new TodoListModel({listName:listName})
        await newList.save()
        return res.json({state:"success",data:newList})

    } catch (error){
        return next()
    }

})


app.post("/deleteList",async (req,res,next)=>{
   
    try {

        const {listId} = req.body;
        console.log(listId)
        await TodoListModel.deleteOne({_id:listId})
       
        return res.json({state:"success"})

    } catch (error){
        return next()
    }

})

app.get("/getList",async(req,res,next)=>{

    try {

        const list = await TodoListModel.find()
        console.log(list)
        return res.json({data:list})

    } catch (error){
        return next()
    }

})

app.post("/createTodo",async (req,res,next)=>{
   
    try {

        const {listId,text} = req.body;
    
        const newTodo = new Todos({ 
            text:text,
            listId:listId,
        })

        await newTodo.save()

        return res.json({data:newTodo})

    } catch (error){
        console.log(error)
        return next()
    }

})

app.post("/checkTodo",async (req,res,next)=>{

    try {

        const {todoId} = req.body;
    
        const newTodo = await Todos.findById(todoId)

        newTodo.isDone = !newTodo.isDone;

        await newTodo.save()

        return res.json({state:"success"})

    } catch (error){
        console.log(error)
        return next()
    }
})

app.post("/updateTodo",async (req,res,next)=>{

    try {

        const {todoId,note,steps,Deadline} = req.body;
        console.log(Deadline)
        const newTodo = await Todos.findById(todoId)

        newTodo.note = note;
        newTodo.steps = steps;
        newTodo.deadLine = Deadline

        await newTodo.save()

        return res.json({state:"success"})

    } catch (error){
        console.log(error)
        return next()
    }
})

app.get("/getTodos/:listId",async(req,res,next)=>{

    const {listId} = req.params;

    try {
      
       const  relatedTodos = await Todos.find({listId:listId},{text:true,isDone:true,listId:true,_id:true,deadLine:true})
     
       return res.json({data:relatedTodos})

    } catch (error) {
       return next()
    }

})

app.get("/getTodoDetail/:todoId",async(req,res,next)=>{

    const {todoId} = req.params;

    try {
      
       const selectedTodo = await Todos.findById(todoId,{note:true,steps:true,deadLine:true})

       console.log(selectedTodo) 
       return res.json({data:selectedTodo})

    } catch (error) {
       return next()
    }

})

app.use(express.static("public"))

app.get("*",(req,res,next)=>{
  res.sendFile(path.resolve(__dirname,"../public","index.html"))
  //res.sendFile(path.resolve(__dirname,"public","index.html"))
})

app.get("*",()=>{
    return res.json({state:"error"})
})

app.listen(3001,()=>console.log("server listening..."))