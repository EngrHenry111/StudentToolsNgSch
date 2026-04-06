/*
JAMB Score Calculator

Features:
- Input 4 UTME subjects
- Automatic total calculation
- Displays admission readiness
*/

import { useState } from "react";
import { Helmet } from "react-helmet";
import "./jamb.css";

const JAMBScore = () => {

 const [subjects,setSubjects] = useState({
  english:"",
  subject2:"",
  subject3:"",
  subject4:""
 });

 const [total,setTotal] = useState(0);
 const [status,setStatus] = useState("");

 const handleChange = (subject,value)=>{

  setSubjects({
   ...subjects,
   [subject]:value
  });

 };

 const calculateScore = ()=>{

  const sum =
   Number(subjects.english) +
   Number(subjects.subject2) +
   Number(subjects.subject3) +
   Number(subjects.subject4);

  setTotal(sum);

  // Admission readiness indicator
  if(sum >= 300){
   setStatus("Excellent Score");
  }
  else if(sum >= 250){
   setStatus("Very Competitive");
  }
  else if(sum >= 200){
   setStatus("Good Score");
  }
  else if(sum >= 180){
   setStatus("Minimum Admission Range");
  }
  else{
   setStatus("Low Admission Chances");
  }

 };

 return(

  <div className="jamb-container">
   <Helmet>

<title>JAMB Score Calculator | Calculate Your UTME Score Online</title>

<meta
 name="description"
 content="Free JAMB score calculator for Nigerian students. Enter your UTME subject scores and instantly know your total score."
/>

<meta
 name="keywords"
 content="JAMB calculator, UTME calculator, calculate JAMB score, Nigerian admission score"
/>

<link
    rel="canonical"
    href="https://studenttoolsng.com/jamb-score-calculator"
  />

</Helmet>

   <h1>JAMB Score Calculator</h1>

   <p>Enter your UTME subject scores to calculate total</p>

   <div className="jamb-inputs">

    <input
     type="number"
     placeholder="English"
     onChange={(e)=>handleChange("english",e.target.value)}
    />

    <input
     type="number"
     placeholder="Subject 2"
     onChange={(e)=>handleChange("subject2",e.target.value)}
    />

    <input
     type="number"
     placeholder="Subject 3"
     onChange={(e)=>handleChange("subject3",e.target.value)}
    />

    <input
     type="number"
     placeholder="Subject 4"
     onChange={(e)=>handleChange("subject4",e.target.value)}
    />

   </div>

   <button className="calculate-btn" onClick={calculateScore}>
    Calculate Score
   </button>

   {total > 0 && (

    <div className="jamb-result">

     <h2>Total Score: {total}</h2>

     <p className="status">{status}</p>

    </div>

   )}

  </div>

 );

};

export default JAMBScore;