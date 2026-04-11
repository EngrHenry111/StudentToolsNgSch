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