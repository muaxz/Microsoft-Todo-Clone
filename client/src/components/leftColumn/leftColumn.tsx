import React, { useState } from 'react';
import ListWindow from "./newListWindow"
import {Add,Menu,StarBorder} from "@mui/icons-material"
import {Button} from "@mui/material"

export default function LeftColumn (){
    const [isActive,setIsActive] = useState<boolean>(false);
    
    return(
        <div className='left-column-outer'>
            {isActive &&  <ListWindow close={()=>setIsActive(false)}></ListWindow>}
            <div className="left-column-inner">
                <div>
                    <div className="left-column-child-important">
                        <p>Important</p>
                        <div style={{marginLeft:"auto"}}><StarBorder color="secondary"></StarBorder></div>
                    </div>
                    {["work","School","Workout"].map((item)=>{
                        return (<div className="left-column-child">
                                    <p>{item}</p>
                                    <div style={{marginLeft:"auto"}}><Menu></Menu></div>
                                </div>)
                    })}
                </div>
                <div className="left-newlist-holder"><Button onClick={()=>setIsActive(true)} fullWidth startIcon={<Add></Add>} variant="contained">New List</Button></div>    
            </div>
        </div>
    )

}