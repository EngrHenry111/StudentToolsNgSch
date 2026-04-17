/*
Admission Chance Estimator
Predicts admission probability
*/

import { useState } from "react";
import { Helmet } from "react-helmet-async";
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

 const url = "https://studenttoolsng.com/admission-predictor";
const title = "Admission Chance Calculator Nigeria | JAMB & Post UTME Predictor";
const description = "Predict your admission chances in Nigerian universities using your JAMB and Post UTME scores. Free admission calculator for students.";
const image = "https://studenttoolsng.com/logo.png";

 return(

  <div className="predictor">

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
      name: "Admission Chance Predictor",
      url: url,
      applicationCategory: "EducationalApplication",
      description: description
    })}
  </script>
</Helmet>

<h1>Admission Chance Calculator Nigeria</h1>

   <input
   type="number"
  min="0"
  max="400"
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

   <section className="predictor-content">

  <h2>How Admission is Calculated in Nigeria</h2>
  <p>
    Most Nigerian universities use a combination of JAMB and Post UTME scores 
    to determine admission eligibility. Each school has its own formula.
  </p>

  <h2>How This Admission Predictor Works</h2>
  <p>
    This tool estimates your admission chances using a weighted formula:
    60% JAMB score and 40% Post UTME score.
  </p>

  <h2>Example Calculation</h2>
  <p>
    If you score 250 in JAMB and 70 in Post UTME:
  </p>
  <p><strong>(250 × 0.6) + (70 × 0.4) = 178</strong></p>

  <h2>Admission Chance Guide</h2>
  <ul>
    <li>70+ → High Admission Chance</li>
    <li>60–69 → Moderate Chance</li>
    <li>Below 60 → Low Chance</li>
  </ul>

  <h2>Important Note</h2>
  <p>
    Admission depends on your course, school cut-off mark, and competition level.
    This tool provides an estimate, not a guarantee.
  </p>

  <p>
  You can also calculate your 
  <a href="/jamb-score-calculator">JAMB Score</a> and 
  <a href="/cgpa-calculator">CGPA</a>.
</p>

</section>

  </div>

 );

};

export default AdmissionPredictor;