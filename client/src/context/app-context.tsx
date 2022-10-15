import React,{createContext,useState,useReducer} from 'react';


interface Props{
    children:JSX.Element
}

interface stateType{
    newLists:{_id:string,listName:string}[],
    user:{},
    Todos:any[],
    currentList:string,
    detailActivate:boolean,
    detailStuff:{
        note:string,
        id:string,
        steps:any[],
        deadLine:string
    }
}

function Reducer(state:stateType,action:{type:string,payload:any}){
    switch (action.type){
        case "create_list":
            return {...state,newLists:[...state.newLists,{...action.payload.list}]}
        case "populate_list":
            return {...state,newLists:action.payload.list}    
        case "delete_list":
            const deletedIndex = state.newLists.findIndex((item)=>item._id === action.payload.listId)
            console.log(deletedIndex)
            state.newLists.splice(deletedIndex,1)
            return {...state}
        case "populate_todos":
            return {...state,Todos:action.payload.list}
        case "create_todo":
            return {...state,Todos:[...state.Todos,action.payload.todo]}    
        case "select_currentList":
            return {...state,currentList:action.payload.listId}
        case "check_todo":
            state.Todos.forEach((item)=>{
                if(item._id === action.payload.todoId){
                    item.isDone = !item.isDone
                }
            })
            return {...state}    
        case "active_detail":
            state.detailActivate = true
            return {...state,detailStuff:{note:action.payload.detail.note,steps:action.payload.detail.steps,id:action.payload.detail._id,deadLine:action.payload.detail.deadLine}}  
        case "deactive_detail":
            state.detailActivate = false
            return {...state}      
        case "add_step":
            state.detailStuff.steps.push({text:action.payload.text,isDone:false})
            return {...state}  
        case "check_steps":
            state.detailStuff.steps[action.payload.stepId].isDone = !state.detailStuff.steps[action.payload.stepId].isDone
            console.log(state.detailStuff.steps[action.payload.stepId])
            return {...state}      
        default:
            return {...state}
    }
}

const InitialState = {
    user:{},
    newLists:[],
    Todos:[],
    currentList:"",
    detailActivate:false,
    detailStuff:{
        note:"",
        steps:[],
        id:"",
        deadLine:""
    }
}

export const AppContextOrigin = createContext<{state:stateType,dispatch:any}>({
    state:{...InitialState},
    dispatch:""
})

export default function AppContext(props:Props){
    
    const [state,dispatch] = useReducer(Reducer,InitialState)

    return(

        <AppContextOrigin.Provider value={{state,dispatch}}>
            {props.children}
        </AppContextOrigin.Provider>

    )

}