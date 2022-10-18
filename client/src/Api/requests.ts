import axios from "axios"

axios.defaults.baseURL = process.env.NODE_ENV === "development" ?  "http://localhost:3001/" : "https://mongo-todo-app-soft.herokuapp.com/"

export const CreateList = async (param:{listName:string,userId:string,setLoading:(value:boolean)=>void,dispatch:(value:any)=>void})=>{

    try {
        
        const {data} = await axios.post("/createList",{listName:param.listName});
        
        param.setLoading(false)
        param.dispatch({type:"create_list",payload:{list:data.data}})
        
        return data;
    } catch (error) {
        console.log(error)
    }

}

export const GetTodoLists = async (dispatch:(value:any)=>void)=>{

    try {

        const {data} = await axios.get("/getList");
       
        dispatch({type:"populate_list",payload:{list:data.data}})
        
    } catch (error){
        console.log(error)
    }
}

export const DeleteList = async (listId:string,dispatch:(value:any)=>void)=>{

    try {

        const {data} = await axios.post("/deleteList",{listId});
        dispatch({type:"delete_list",payload:{listId:listId}})

       
    } catch (error){

        console.log(error)

    }
}

export const CreateTodo = async({text,listId,dispatch}:{text:string,listId:string,dispatch:(value:any)=>void})=>{

    try {

        const {data} = await axios.post("/createTodo",{
            text,
            listId,
        });

        dispatch({type:"create_todo",payload:{todo:data.data}})

       
    } catch (error){

        console.log(error)

    }
}


export const GetTodos = async(listId:string,dispatch:(value:any)=>void)=>{

    try {

        const {data} = await axios.get(`/getTodos/${listId}`);
        
        dispatch({type:"populate_todos",payload:{list:data.data}})
        
       
    } catch (error){

        console.log(error)

    }
}

export const GetTodoDetail = async(todoId:string,dispatch:(value:any)=>void)=>{

    try {

        const {data} = await axios.get(`/getTodoDetail/${todoId}`);
        console.log(data.data)
        dispatch({type:"active_detail",payload:{detail:data.data}})
        
       
    } catch (error){

        console.log(error)

    }
}


export const CheckTodo = async(todoId:string)=>{

    try {

        const {data} = await axios.post(`/checkTodo`,{todoId});
        
    } catch (error){

        console.log(error)

    }
}

export const UpdateDetails = async({note,todoId,steps,Deadline} : {note:string,todoId:string,steps:any[],Deadline:string})=>{

    try {

        const {data} = await axios.post(`/updateTodo`,{
            note,
            todoId,
            steps,
            Deadline
        }); 
        
    } catch (error){

        console.log(error)

    }
}


