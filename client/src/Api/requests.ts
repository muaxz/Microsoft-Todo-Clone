import axios from "axios"

axios.defaults.baseURL = "http://localhost:3001/"

export const CreateList = async (param:{listName:string,userId:string,setLoading:(value:boolean)=>void,dispatch:(value:any)=>void})=>{

    try {
        
        const {data} = await axios.post("/createList",{listName:param.listName});
        console.log(data)
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
        console.log(data.data)
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