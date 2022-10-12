const express = require("express")
const cors = require("cors")
const DB = require("./connection/dbConnection")
const User = require("./Schemas/usersModel")
const TodoListModel = require("./Schemas/todoListModel")
const Todos = require("./Schemas/todosModel")
const app = express()


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
    console.log("inside")
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

        return res.json({state:"success"})

    } catch (error){
        return next()
    }

})


app.get("/getTodos/:listId",async(req,res,next)=>{

    const {listId} = req.params;

    try {
      
       const  relatedTodos = await Todos.find({_id:listId})

       return res.json({data:relatedTodos})

    } catch (error) {
        
    }

})


app.get("*",()=>{
    return res.json({state:"error"})
})

app.listen(3001,()=>console.log("server listening..."))