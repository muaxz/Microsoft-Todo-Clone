import React,{useContext} from 'react';
import {Checkbox, InputAdornment, Stack, TextField} from "@mui/material"
import {CheckCircle,Done,RadioButtonUnchecked,Star,KeyboardArrowRight, AccountCircle, InsertInvitation} from "@mui/icons-material"
import {CheckTodo,GetTodoDetail} from "../../Api/requests"
import {AppContextOrigin} from "../../context/app-context"
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface Props{
    text:string,
    todoId:string,
    isDone:boolean,
    deadLine:string
}


export default function TodoElement(props:Props){

    const {state,dispatch} = useContext(AppContextOrigin)


    const DoneTodoHandler=()=>{
        CheckTodo(props.todoId)
        dispatch({type:"check_todo",payload:{todoId:props.todoId}})
    }

    const fetchDetail=()=>{
        GetTodoDetail(props.todoId,dispatch)
    }
    
    const newDate = new Date(props.deadLine)
    var realDate = newDate.toISOString().split('T')[0]
  
    return(
        <div className="todo-outer" onClick={()=>fetchDetail()}>
            <div className="todo-inner">
                <div>
                    <Checkbox onClick={DoneTodoHandler} checked={props.isDone} icon={<RadioButtonUnchecked></RadioButtonUnchecked>} checkedIcon={<CheckCircle></CheckCircle>}></Checkbox>
                </div>
                <div className="todo-text-holder">
                    <p>{props.text}</p>
                    <div className='todo-right-arrow'><KeyboardArrowRight></KeyboardArrowRight></div>
                    {props.isDone && <span className='line-on-text'></span> }
                </div>
                <div style={{marginLeft:"auto"}}>
                    <Checkbox  icon={<Star></Star>} checkedIcon={<Star style={{color:"#ce4257"}}></Star>}></Checkbox>
                </div>
            </div>
            <Stack style={{padding:"15px"}} component="form" noValidate spacing={3}>
                <TextField
                    disabled
                    size='small'
                    id="date"
                    label="Deadline"
                    type="date"
                    value={realDate}
                    sx={{ width: 220 }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <InsertInvitation></InsertInvitation>
                          </InputAdornment>
                        ),
                      }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </Stack>
        </div>
    )

}