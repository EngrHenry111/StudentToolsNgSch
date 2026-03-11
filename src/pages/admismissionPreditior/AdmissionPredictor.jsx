/*
Admission Chance Estimator
Predicts admission probability
*/

import { useState } from "react";
import "./admissionPredictor.css";

const AdmissionPredictor = ()=>{

 const [jamb,setJamb] = useState("");
 const [postutme,setPostutme] = useState("");
 const [chance,setChance] = useState("");

 const predict = ()=>{

  const score =
   (Number(jamb)*0.6) +
   (Number(postutme)*0.4);

  if(score>70) setChance("High Admission Chance");
  else if(score>60) setChance("Moderate Chance");
  else setChance("Low Chance");

 };

 return(

  <div className="predictor">

   <h1>Admission Chance Predictor</h1>

   <input
    placeholder="JAMB Score"
    onChange={(e)=>setJamb(e.target.value)}
   />

   <input
    placeholder="Post UTME Score"
    onChange={(e)=>setPostutme(e.target.value)}
   />

   <button onClick={predict}>
    Predict Admission
   </button>

   <h2>{chance}</h2>

  </div>

 );

};

export default AdmissionPredictor;