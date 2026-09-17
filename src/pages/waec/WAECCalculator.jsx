/*
Advanced WAEC Grade Calculator

Features:
- Add subjects
- Convert score to grade
- Display performance summary
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./waec.css";

// AI-drafted (2026-09-13) — factual/explanatory content per Google's "low
// value content" guidance. Needs human review before final: the 0–100
// score bands below are WAEC's published grading scale, but individual
// university admission requirements (which subjects, which grades count
// as a "credit") vary by institution and course — verify current
// requirements before presenting any of this as admission advice.
const waecFaq = [
 {
  q: "What is the best WAEC grade?",
  a: "A1 is the highest and best grade a candidate can obtain, representing a score of 75–100 in that subject."
 },
 {
  q: "What is the minimum passing grade for WAEC?",
  a: "C6 (a score of 50–54) is WAEC's lowest official credit grade. D7 and E8 are still passes, but they don't count as credits for most admission purposes."
 },
 {
  q: "Do I have to retake every subject if I fail one?",
  a: "No — you can register as a private candidate for just the subject(s) you failed in a later WAEC diet, rather than resitting subjects you've already passed."
 },
 {
  q: "Can I calculate my WAEC grade before results are released?",
  a: "This calculator converts a raw score you already have (or expect) into its corresponding grade using WAEC's official scale — it doesn't predict or access real WAEC results."
 }
];

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

  <div className="waec-cal">

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
 content="https://studenttoolsng.com/logoH.png"
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
 content="https://studenttoolsng.com/logoH.png"
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

{/* FAQ structured data */}
<script type="application/ld+json">
{JSON.stringify({
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: waecFaq.map((f) => ({
  "@type": "Question",
  name: f.q,
  acceptedAnswer: { "@type": "Answer", text: f.a }
 }))
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

  <h2>What is the WAEC grading system?</h2>
  <p>
    WAEC (West African Examinations Council) conducts the WASSCE (West
    African Senior School Certificate Examination), the exam most Nigerian
    students sit at the end of senior secondary school. For every subject,
    your raw score out of 100 is converted into a letter grade from A1
    (Excellent) down to F9 (Fail). Universities, polytechnics, and colleges
    of education use these grades — not the raw scores — to decide
    admission eligibility.
  </p>

  <h2>WAEC grade breakdown</h2>
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

  <h2>Why the "credit" grades matter most</h2>
  <p>
    Grades A1 through C6 are all classified as <strong>credit</strong>{" "}
    passes. This distinction matters because most Nigerian tertiary
    institutions require a minimum number of credit passes — commonly five
    subjects, almost always including English Language and Mathematics —
    before you're even eligible to apply for admission, regardless of your
    JAMB score. D7 and E8 are passes, but they don't count as credits.
    The exact number of credits and which other subjects must be among
    them is set by each institution and course, so always confirm the
    specific requirement for the course you're applying to.
  </p>

  <h2>How to use this calculator</h2>
  <p>
    Enter each subject name and the raw score you have (or expect) for it,
    then press <strong>Calculate Grades</strong>. The tool converts every
    score into its WAEC letter grade instantly using the scale above, so
    you can quickly see which of your results are credit passes.
  </p>

  <h2>Worked example</h2>
  <p>
    A student scores 78 in Mathematics, 62 in English Language, and 51 in
    Biology. Using the scale above: 78 converts to <strong>A1</strong>, 62
    converts to <strong>C4</strong>, and 51 converts to{" "}
    <strong>C6</strong>. All three are credit passes.
  </p>

  <h2>WAEC vs NECO</h2>
  <p>
    NECO (National Examinations Council) is Nigeria's other major
    school-leaving exam body, and it uses a very similar A1–F9 grading
    scale. Most institutions treat WAEC and NECO credit passes as
    equivalent, but always check your target institution's specific
    admission requirements.
  </p>

  <h2>Frequently Asked Questions</h2>

  {waecFaq.map((f) => (
   <p key={f.q}>
    <strong>{f.q}</strong>
    <br />
    {f.a}
   </p>
  ))}

  <p>
  You can also calculate your{" "}
  <Link to="/cgpa-calculator">CGPA</Link> or check your{" "}
  <Link to="/jamb-score-calculator">JAMB Score</Link>.
</p>

</section>
  </div>

 );

};

export default WAECCalculator;