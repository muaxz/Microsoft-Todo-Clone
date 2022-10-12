import React,{createContext,useState,useReducer} from 'react';


interface Props{
    children:JSX.Element
}

interface stateType{
    newLists:{_id:string,listName:string}[],
    user:{},
    Todos:any[]
}

export const AppContextOrigin = createContext<{state:stateType,dispatch:any}>({
    state:{
        user:{},
        newLists:[],
        Todos:[]
    },
    dispatch:""
})

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
        default:
            return {...state}
    }
}

const InitialState = {
    user:{},
    newLists:[],
    Todos:[]
}

export default function AppContext(props:Props){
    
    const [state,dispatch] = useReducer(Reducer,InitialState)

    return(

        <AppContextOrigin.Provider value={{state,dispatch}}>
            {props.children}
        </AppContextOrigin.Provider>

    )

}