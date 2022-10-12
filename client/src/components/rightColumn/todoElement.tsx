import React from 'react';
import {Checkbox} from "@mui/material"
import {CheckCircle,RadioButtonUnchecked} from "@mui/icons-material"

export default function TodoElement (){

    return(
        <div className="todo-outer">
            <div className="todo-inner">
                <div>
                    <Checkbox  icon={<RadioButtonUnchecked></RadioButtonUnchecked>} checkedIcon={<CheckCircle></CheckCircle>}></Checkbox>
                </div>
                <div>
                    <p>Reading the article</p>
                </div>
            </div>
        </div>
    )

}