import React, { useEffect, useState ,useContext} from 'react';
import {TextField,Button} from "@mui/material"
import {CreateList} from "../../Api/requests"
import {AppContextOrigin} from "../../context/app-context"

interface Props{
    close:()=>void
}

export default function CreateListWindow(props:Props){

    const [nameValue,setNameValue] = useState<string>("")
    const [loading,setLoading] = useState(false);
    const {dispatch} = useContext(AppContextOrigin)

    const SubmitList=()=>{
        setLoading(true)
        CreateList({
            listName:nameValue,
            userId:"1",
            setLoading:setLoading,
            dispatch:dispatch
        }).then((res)=>console.log(res))
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