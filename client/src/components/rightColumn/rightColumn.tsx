import React, { useContext } from 'react';
import {AppContextOrigin} from "../../context/app-context"
import TodoElement from './todoElement';
import {TextField,InputAdornment} from "@mui/material"
import {Add} from "@mui/icons-material"

export default function RightColumn(){

    const {state,dispatch} = useContext(AppContextOrigin)
    state.Todos = [0,0,0]
    
    return(
        <div className='right-column-outer'>
            <div className="right-column-inner">
                 {state.Todos.map((item,index)=>{
                    return (<TodoElement></TodoElement>)
                 })}
            </div>
            <div className="add-duty-part">
            <TextField 
                InputProps={{
                startAdornment: (
                    <InputAdornment style={{cursor:"pointer"}} position="start">
                    <Add/>
                    </InputAdornment>
                ),
                }}  fullWidth variant="outlined" placeholder="Add an assignment"></TextField>
            </div>
        </div>
    )

}