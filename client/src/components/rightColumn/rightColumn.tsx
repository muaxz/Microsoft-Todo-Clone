import React, { useContext, useState } from 'react';
import {AppContextOrigin} from "../../context/app-context"
import TodoElement from './todoElement';
import {TextField,InputAdornment,Button} from "@mui/material"
import {Add} from "@mui/icons-material"
import {CreateTodo} from "../../Api/requests"
import DetailSection from "./detailSection"

export default function RightColumn(){

    const {state,dispatch} = useContext(AppContextOrigin)
    const [todoTextValue,setTodoTextValue] = useState<string>("")
 
    const CreateTodoHandler=()=>{
        if(!todoTextValue.length) return;

        setTodoTextValue("")
        CreateTodo({
            listId:state.currentList,
            dispatch:dispatch,
            text:todoTextValue
        })

    }
    var completeController: boolean = false;
    for (const item of state.Todos) {
        if(item.isDone){
            completeController = true;
            break;
        }
    }
    return(
        <div className='right-column-outer'>
            <div className="todo-section">
                <div className="right-column-inner">
                    {state.Todos.length ? state.Todos.map((item,index)=>{
                        return (<>{!item.isDone ? <TodoElement deadLine={item.deadLine} isDone={item.isDone} todoId={item._id} text={item.text}></TodoElement> : null}</>)
                    }) : <div style={{textAlign:"center",color:"white"}}><h1>You do not have an assignment yet ):</h1></div>}
                    {
                        completeController && 

                        (<>
                            <div className="middle-border"></div>
                            {state.Todos.map((item,index)=>{
                                return (<>{item.isDone ? <TodoElement deadLine={item.deadLine} isDone={item.isDone} todoId={item._id} text={item.text}></TodoElement> : null}</>)
                            })}
                        </>)
                    }
                </div>
                <div  className="add-duty-part">
                    <TextField 
                        onChange={(e)=>setTodoTextValue(e.target.value)}
                        value={todoTextValue}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment style={{cursor:"pointer"}} position="start">
                                <Button onClick={CreateTodoHandler}><Add></Add></Button>
                            </InputAdornment>
                        ),
                    }}  fullWidth variant="outlined" placeholder="Add an assignment"></TextField>
                </div>
            </div>
            <div className={`detail-section ${state.detailActivate && "active"}`}>
                <DetailSection></DetailSection>
            </div>
        </div>
    )

}