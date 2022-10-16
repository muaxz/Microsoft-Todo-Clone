import React, {useState,useContext, useEffect} from 'react';
import ListWindow from "./newListWindow"
import {Add,Menu,StarBorder,Delete} from "@mui/icons-material"
import {Button} from "@mui/material"
import {AppContextOrigin} from "../../context/app-context"
import {GetTodoLists,DeleteList,GetTodos} from "../../Api/requests"

export default function LeftColumn (){

    const [isActive,setIsActive] = useState<boolean>(false);
    const {dispatch,state} = useContext(AppContextOrigin)
   

    useEffect(()=>{
        GetTodoLists(dispatch)
    },[])

    const PopulateTodos=(listId:string)=>{
        
        GetTodos(listId,dispatch)
        dispatch({type:"select_currentList",payload:{listId}})
        dispatch({type:"deactive_detail"})
    }

    const DeleteOneList=(listId:string)=>{
        DeleteList(listId,dispatch)
    }

    return(
        <div  className={`left-column-outer`}>
            {isActive &&  <ListWindow close={()=>setIsActive(false)}></ListWindow>}
            <div className="left-column-inner">
                <div>
                    <div className="left-column-child-important">
                        <p>Important</p>
                        <div style={{marginLeft:"auto"}}><StarBorder style={{color:"#ef233c"}}></StarBorder></div>
                    </div>
                    {state.newLists.map((item,index)=>{
                        return (<div onClick={()=>PopulateTodos(item._id)} key={index} className={`left-column-child ${state.currentList === item._id ? "selected-list" : ""}`}>
                                    <div onClick={()=>DeleteOneList(item._id)} className="garbage-icon"><Delete style={{color:"#f07167"}}></Delete></div>
                                    <p>{item.listName}</p>
                                    <div style={{marginLeft:"auto"}}><Menu></Menu></div>
                                </div>)
                    })}
                </div>
                <div className="left-newlist-holder"><Button style={{backgroundColor:"#06d6a0"}} onClick={()=>setIsActive(true)} fullWidth startIcon={<Add></Add>} variant="contained">New List</Button></div>    
            </div>
        </div>
    )

}