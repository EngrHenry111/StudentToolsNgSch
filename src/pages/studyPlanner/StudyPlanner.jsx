/*
Study Planner
Allows students plan daily study tasks
*/

import { useState } from "react";
import "./studyPlanner.css";

const StudyPlanner = () => {

 const [task,setTask] = useState("");
 const [tasks,setTasks] = useState([]);

 const addTask = () => {

  if(!task) return;

  setTasks([...tasks,task]);
  setTask("");

 };

 const deleteTask = (index) => {

  const updated = tasks.filter((_,i)=>i!==index);

  setTasks(updated);

 };

 return(

  <div className="planner">

   <h1>Study Planner</h1>

   <div className="planner-input">

    <input
     placeholder="Add study task"
     value={task}
     onChange={(e)=>setTask(e.target.value)}
    />

    <button onClick={addTask}>
     Add
    </button>

   </div>

   <ul>

    {tasks.map((t,i)=>(
     
     <li key={i}>

      {t}

      <button onClick={()=>deleteTask(i)}>
       Delete
      </button>

     </li>

    ))}

   </ul>

  </div>

 );

};

export default StudyPlanner;