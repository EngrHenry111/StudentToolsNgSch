/*
Study Planner
Allows students plan daily study tasks
*/

import { useState } from "react";
import "./studyPlanner.css";
import { Helmet } from "react-helmet-async";
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


 const url = "https://studenttoolsng.com/study-planner";
const title = "Study Planner for Students | Plan Your Daily Study Schedule";
const description = "Free study planner for Nigerian students. Organize your daily study tasks, improve productivity, and achieve academic success.";
const image = "https://studenttoolsng.com/logo.png";

 return(

  <div className="planner">

    <Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={url} />

  <meta name="twitter:card" content="summary_large_image" />

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Study Planner",
      url: url,
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      description: description
    })}
  </script>
</Helmet>

   <h1>Study Planner for Students</h1>

   <div className="planner-input">

    <input
     placeholder="Add study task"
     value={task}
     onChange={(e)=>setTask(e.target.value)}
      required
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

   <section className="planner-content">

  <h2>What is a Study Planner?</h2>
  <p>
    A study planner helps students organize their daily academic tasks,
    manage time effectively, and improve productivity.
  </p>

  <h2>Why You Need a Study Planner</h2>
  <ul>
    <li>Stay organized with your subjects</li>
    <li>Avoid last-minute cramming</li>
    <li>Improve academic performance</li>
    <li>Manage your time better</li>
  </ul>

  <h2>How to Use This Study Planner</h2>
  <p>
    Add your daily study tasks above and track your progress. You can
    delete tasks once completed.
  </p>

  <h2>Study Tips for Nigerian Students</h2>
  <p>
    Create a daily routine, focus on difficult subjects first, and
    use tools like CGPA calculators to track your progress.
  </p>   
   <p className="planLink"> 
  You can also use our 
  <a href="/cgpa-calculator">CGPA Calculator</a> 
  and 
  <a href="/jamb-score-calculator">JAMB Score Calculator</a>.
</p> 

</section>

  </div>

 );

};

export default StudyPlanner;