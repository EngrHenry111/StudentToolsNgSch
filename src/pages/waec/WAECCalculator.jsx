/*
Advanced WAEC Grade Calculator

Features:
- Add subjects
- Convert score to grade
- Display performance summary
*/

import { useState } from "react";
import "./waec.css";
import { Helmet } from "react-helmet";
const WAECCalculator = () => {

 const [subjects,setSubjects] = useState([
  {name:"",score:""}
 ]);

 const [results,setResults] = useState([]);

 const gradeSystem = (score)=>{

  if(score>=75) return "A1";
  if(score>=70) return "B2";
  if(score>=65) return "B3";
  if(score>=60) return "C4";
  if(score>=55) return "C5";
  if(score>=50) return "C6";
  if(score>=45) return "D7";
  if(score>=40) return "E8";
  return "F9";

 };

 const addSubject = ()=>{
  setSubjects([...subjects,{name:"",score:""}]);
 };

 const removeSubject = (index)=>{
  const updated = subjects.filter((_,i)=>i!==index);
  setSubjects(updated);
 };

 const handleChange = (index,field,value)=>{

  const updated = [...subjects];
  updated[index][field] = value;

  setSubjects(updated);

 };

 const calculateGrades = ()=>{

  const graded = subjects.map((s)=>{

   const score = Number(s.score);
   const grade = gradeSystem(score);

   return {
    ...s,
    grade
   };

  });

  setResults(graded);

 };

 return(

  <div className="waec-container">

    
 <Helmet>

 <title>Terms and Conditions | StudentToolsNG</title>

 <meta
 name="description"
 content="Terms and conditions for using StudentToolsNG academic tools and tutorials."
 />

 
<link
    rel="canonical"
    href="https://studenttoolsng.com/waec-grade-calculator"
  />

 </Helmet>


   <h1>WAEC Grade Calculator</h1>

   <p>Convert WAEC scores into official grades</p>

   <table className="waec-table">

    <thead>

     <tr>
      <th>Subject</th>
      <th>Score</th>
      <th>Action</th>
     </tr>

    </thead>

    <tbody>

     {subjects.map((subject,index)=>(

      <tr key={index}>

       <td>

        <input
         placeholder="Subject Name"
         onChange={(e)=>
          handleChange(index,"name",e.target.value)
         }
        />

       </td>

       <td>

        <input
         type="number"
         placeholder="Score"
         onChange={(e)=>
          handleChange(index,"score",e.target.value)
         }
        />

       </td>

       <td>

        <button
         className="remove-btn"
         onClick={()=>removeSubject(index)}
        >
         Remove
        </button>

       </td>

      </tr>

     ))}

    </tbody>

   </table>

   <div className="waec-buttons">

    <button onClick={addSubject}>
     Add Subject
    </button>

    <button className="calculate-btn" onClick={calculateGrades}>
     Calculate Grades
    </button>

   </div>

   {results.length>0 && (

    <div className="waec-results">

     <h2>Results</h2>

     {results.map((r,i)=>(
      
      <div key={i} className="result-card">

       <p>{r.name}</p>

       <p>Score: {r.score}</p>

       <p>Grade: <strong>{r.grade}</strong></p>

      </div>

     ))}

    </div>

   )}

  </div>

 );

};

export default WAECCalculator;