/*
Advanced WAEC Grade Calculator

Features:
- Add subjects
- Convert score to grade
- Display performance summary
*/

import { useState } from "react";
import "./waec.css";
import { Helmet } from "react-helmet-async";
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

{/* Primary SEO */}
<title>
WAEC Grade Calculator Nigeria | Convert WAEC Scores to Grades
</title>

<meta
 name="description"
 content="Free WAEC grade calculator for Nigerian students. Convert your WAEC scores to grades (A1–F9) instantly and understand the WAEC grading system."
/>

<meta
 name="keywords"
 content="WAEC grade calculator Nigeria, WAEC grading system, WAEC score to grade, WAEC calculator online"
/>

{/* Canonical */}
<link
 rel="canonical"
 href="https://studenttoolsng.com/waec-grade-calculator"
/>

{/* Open Graph */}
<meta property="og:type" content="website" />

<meta
 property="og:title"
 content="WAEC Grade Calculator Nigeria"
/>

<meta
 property="og:description"
 content="Convert WAEC scores to grades (A1–F9) instantly using our free calculator."
/>

<meta
 property="og:image"
 content="https://studenttoolsng.com/logo.png"
/>

<meta
 property="og:url"
 content="https://studenttoolsng.com/waec-grade-calculator"
/>

<meta property="og:site_name" content="StudentToolsNG" />

{/* Twitter */}
<meta name="twitter:card" content="summary_large_image" />

<meta
 name="twitter:title"
 content="WAEC Grade Calculator"
/>

<meta
 name="twitter:description"
 content="Convert WAEC scores into official grades instantly."
/>

<meta
 name="twitter:image"
 content="https://studenttoolsng.com/logo.png"
/>

{/* Structured Data (Tool) */}
<script type="application/ld+json">
{JSON.stringify({
 "@context": "https://schema.org",
 "@type": "WebApplication",
 name: "WAEC Grade Calculator",
 url: "https://studenttoolsng.com/waec-grade-calculator",
 applicationCategory: "EducationalApplication",
 operatingSystem: "All",
 description: "Convert WAEC scores into grades (A1–F9) instantly.",
 offers: {
   "@type": "Offer",
   price: "0",
   priceCurrency: "NGN"
 }
})}
</script>

</Helmet>


<h1>WAEC Grade Calculator Nigeria</h1>

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

<section className="waec-content">

  <h2>What is WAEC Grading System?</h2>
  <p>
    The WAEC grading system is used to evaluate student performance in the West African Senior School Certificate Examination (WASSCE). Grades range from A1 (Excellent) to F9 (Fail).
  </p>

  <h2>WAEC Grade Breakdown</h2>
  <ul>
    <li>A1: 75 – 100 (Excellent)</li>
    <li>B2: 70 – 74 (Very Good)</li>
    <li>B3: 65 – 69 (Good)</li>
    <li>C4: 60 – 64 (Credit)</li>
    <li>C5: 55 – 59 (Credit)</li>
    <li>C6: 50 – 54 (Credit)</li>
    <li>D7: 45 – 49 (Pass)</li>
    <li>E8: 40 – 44 (Pass)</li>
    <li>F9: 0 – 39 (Fail)</li>
  </ul>

  <h2>How to Calculate WAEC Grades</h2>
  <p>
    To calculate your WAEC grade, simply input your subject scores into the calculator above. The system automatically converts each score into the corresponding grade.
  </p>

  <h2>Example of WAEC Grade Calculation</h2>
  <p>
    If you score 78 in Mathematics, your grade will be A1. If you score 62 in English, your grade will be C4.
  </p>

  <h2>Frequently Asked Questions</h2>

  <p><strong>What is the best WAEC grade?</strong><br />
  A1 is the highest and best grade.</p>

  <p><strong>What is the minimum passing grade?</strong><br />
  The minimum passing grade is D7 or E8 depending on requirements.</p>         <p>
  You can also calculate your 
  <a href="/cgpa-calculator"> {""} CGPA</a> or check your 
  <a href="/jamb-score-calculator">{""} JAMB Score</a>.
</p> 

</section>
  </div>

 );

};

export default WAECCalculator;