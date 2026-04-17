import { useState } from "react";
import { Helmet } from "react-helmet-async"; // ✅ FIXED
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

 const url = "https://studenttoolsng.com/jamb-score-calculator";
 const title = "JAMB Score Calculator | Calculate Your UTME Score Online";
 const description = "Free JAMB score calculator for Nigerian students. Enter your UTME subject scores and instantly calculate your total score and admission chances.";
 const image = "https://studenttoolsng.com/logo.png";

 return(

  <div className="jamb-container">

   <Helmet>

    {/* Primary SEO */}
    <title>{title}</title>

    <meta name="description" content={description} />

    <meta name="keywords" content="JAMB calculator Nigeria, UTME score calculator, calculate JAMB score online, admission score Nigeria" />

    {/* Canonical */}
    <link rel="canonical" href={url} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    {/* Structured Data (Tool) */}
    <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "JAMB Score Calculator",
      url: url,
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      description: description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NGN"
      }
    })}
    </script>

   </Helmet>

   <h1>JAMB Score Calculator Nigeria</h1>

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


<section className="jamb-content">

  <h2>What is JAMB Score?</h2>
  <p>
    JAMB (Joint Admissions and Matriculation Board) score is the total score 
    obtained in the UTME examination by Nigerian students seeking admission 
    into universities, polytechnics, and colleges of education.
  </p>

  <h2>How to Calculate JAMB Score</h2>
  <p>
    JAMB score is calculated by adding the scores of four subjects:
    English (compulsory) and three other subjects related to your course.
  </p>

  <h2>JAMB Score Example</h2>
  <p>
    If you score 70 in English, 65 in Mathematics, 60 in Physics, 
    and 55 in Chemistry:
  </p>
  <p><strong>Total = 70 + 65 + 60 + 55 = 250</strong></p>

  <h2>What is a Good JAMB Score?</h2>
  <ul>
    <li>300+ → Excellent</li>
    <li>250–299 → Very Competitive</li>
    <li>200–249 → Good</li>
    <li>180–199 → Minimum Admission Range</li>
    <li>Below 180 → Low Chances</li>
  </ul>

  <h2>Frequently Asked Questions</h2>

  <p><strong>What is the cut-off mark for JAMB?</strong><br />
  The general cut-off mark is 180, but universities may require higher scores.</p>

  <p><strong>Can I gain admission with 200?</strong><br />
  Yes, depending on your course and institution.</p>


  <p className="calculators">
  You can also calculate your 
  <a href="/cgpa-calculator">CGPA</a> or check the 
  <a href="/waec-grade-calculator">WAEC grading system</a>.
</p>

</section>
  </div>

 );

};

export default JAMBScore;