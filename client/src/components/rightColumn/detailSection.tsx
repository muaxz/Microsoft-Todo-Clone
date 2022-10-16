import React,{useContext, useEffect, useState} from 'react';
import {TextField,Checkbox,FormControlLabel,Button,ListItem,List,InputAdornment} from "@mui/material"
import {AppContextOrigin} from "../../context/app-context"
import {UpdateDetails} from "../../Api/requests"
import { CheckCircle, RadioButtonUnchecked ,Add, Cancel} from '@mui/icons-material';

export default function DetailSection(){

    const {state,dispatch} = useContext(AppContextOrigin)
    const [textValue,setTextValue] = useState<string>("");
    const [noteValue,setNoteValue] = useState<string>(state.detailStuff.note)
    const [deadline,setDeadline] = useState<string>("")
    useEffect(()=>{
        if(state.detailStuff.deadLine.length){
            setNoteValue(state.detailStuff.note)
            console.log(state.detailStuff)
            const newDate = new Date(state.detailStuff.deadLine)
            var realDate = newDate.toISOString().split('T')[0]
            setDeadline(realDate)
        }
    },[state.detailStuff])

    const SaveDetails=()=>{
        
        console.log(deadline)
        UpdateDetails({
            note:noteValue,
            steps:state.detailStuff.steps,
            todoId:state.detailStuff.id,
            Deadline:deadline
        })
    }

    const AddStep=()=>{
        setTextValue("")
        if(textValue.length === 0 ) return;
        dispatch({type:"add_step",payload:{text:textValue}})
    }

    const CheckSteps=(index:number)=>{
        dispatch({type:"check_steps",payload:{stepId:index}})
    }

    return(
        <div className="detail-inner">
            <div style={{textAlign:"right"}}><span onClick={()=>dispatch({type:"deactive_detail"})}><Cancel style={{color:"lightgrey",cursor:"pointer"}}></Cancel></span></div>
            <div className="save-button"><Button style={{backgroundColor:"#06d6a0"}} onClick={SaveDetails} variant="contained">Save</Button></div>
            <TextField onChange={(e)=>setNoteValue(e.target.value)} value={noteValue} rows={5} multiline fullWidth placeholder='Attach a note'></TextField>
            <div style={{paddingTop:"10px",paddingBottom:"10px",color:"#ef476f"}}>
                <span><b>Add Steps</b></span>
            </div>    
            <List>
                {state.detailStuff.steps.map((item,index)=>{
                    return ( 
                    <ListItem alignItems="center" >
                        <FormControlLabel label={item.text} control={ <Checkbox
                            checked={item.isDone}
                            onChange={()=>CheckSteps(index)}
                            icon={<RadioButtonUnchecked></RadioButtonUnchecked>}
                            checkedIcon={<CheckCircle></CheckCircle>}
                        />}/>
                    </ListItem>)
                })}
                <div style={{paddingLeft:"20px"}}><TextField value={textValue} InputProps={{endAdornment:<Button size="small"  onClick={AddStep} startIcon={<Add></Add>} style={{textTransform:"capitalize"}}>Add</Button>}} onChange={(e)=>setTextValue(e.target.value)} variant="standard" size="small"></TextField></div>
            </List>
            <div style={{paddingTop:"10px",paddingBottom:"20px",color:"#ef476f"}}>
                <span><b>Set a deadline</b></span>
            </div>
            <div>
                <TextField
                onChange={(e)=>setDeadline(e.target.value)}
                size='small'
                id="date"
                label="Deadline"
                type="date"
                value={deadline || ""}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
                />
            </div>
        </div>
    )

}