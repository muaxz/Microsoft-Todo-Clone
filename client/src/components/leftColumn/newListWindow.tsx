import React, { useEffect, useState } from 'react';
import {TextField,Button} from "@mui/material"

interface Props{
    close:()=>void
}

export default function CreateListWindow(props:Props){
    const [nameValue,setNameValue] = useState<string>("")

    const SubmitList=()=>{

    }
    return(
        <div>
            <div onClick={()=>props.close()} className="black-background"></div>
            <div className="list-window">
                <TextField onChange={(e)=>setNameValue(e.target.value)} value={nameValue} placeholder="List name..." variant="outlined" size="small"></TextField>
                <div style={{paddingTop:"20px"}}>
                    <Button onClick={SubmitList} style={{textTransform:"capitalize",backgroundColor:"#5adbb5",color:"white"}}> Create The List</Button>
                </div>
            </div>
        </div>
    )

}