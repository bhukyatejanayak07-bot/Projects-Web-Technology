import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import "./App.css";
function App(){

//javascript


const[task,addTask]=useState(0)
function AddedTask(){
    addTask(task+1)
    console.log(task)
}

    return(
        //html
        <div id="box">
<h1>To-Do App</h1>


<input type="text" placeholder="enter your task"/>
<button onClick={AddedTask}>add</button>

        </div>
       
        

    )
}
export default App