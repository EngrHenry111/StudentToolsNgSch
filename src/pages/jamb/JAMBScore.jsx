import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ✅ FIXED
import "./jamb.css";

// AI-drafted (2026-09-13) — factual/explanatory content per Google's "low
// value content" guidance. Needs human review before final: JAMB's official
// pass mark / cut-off and individual universities' departmental cut-off
// marks are set (and changed) by JAMB and each institution every admission
// cycle. The score bands below are general, informal guidance carried over
// from the calculator's existing result logic — NOT an official JAMB
// publication. Verify current-year figures on jamb.gov.ng before treating
// any number here as authoritative.
const jambFaq = [
 {
  q: "What is the cut-off mark for JAMB?",
  a: "JAMB sets a general minimum mark each admission cycle, and it has changed from year to year rather than being fixed — so we're deliberately not quoting a specific number here. Each university and course then sets its own, usually higher, departmental cut-off on top of JAMB's minimum. JAMB publishes the current cycle's official minimum on jamb.gov.ng — that's the figure to check, not a number carried over from a previous year."
 },
 {
  q: "Can I gain admission with a score of 200?",
  a: "It depends entirely on the institution and course. Less competitive courses and institutions may admit with scores around 180–200, while competitive courses like Medicine or Law at top universities typically require much higher scores."
 },
 {
  q: "Do all four JAMB subjects carry the same weight?",
  a: "Yes — there's no bonus weighting for your strongest subject. All four scores, including English, are added at face value, so a weak score in any one subject costs you exactly as much as a weak score in any other."
 },
 {
  q: "Can I use last year's JAMB score for this year's admission?",
  a: "No. A JAMB/UTME score is only valid for the admission cycle in which you sat the exam — you need a fresh score for a new cycle."
 }
];

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
 const image = "https://studenttoolsng.com/logoH.png";

 return(

  <div className="jamb-tool">

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

    {/* FAQ structured data */}
    <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: jambFaq.map((f) => ({
       "@type": "Question",
       name: f.q,
       acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
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

  <h2>What is a JAMB score?</h2>
  <p>
    JAMB (Joint Admissions and Matriculation Board) administers the UTME
    (Unified Tertiary Matriculation Examination) — the entrance exam every
    Nigerian student sits before applying to universities, polytechnics,
    and colleges of education. Your "JAMB score" is the total of your marks
    across four subjects, out of a maximum possible 400.
  </p>

  <h2>How the JAMB score is calculated</h2>
  <p>
    Every candidate sits English Language (compulsory for all courses) plus
    three other subjects relevant to the course they're applying for — for
    example, a Physics/Chemistry/Biology combination for Medicine, or
    Government/Economics/Literature for Mass Communication. Each subject is
    scored out of 100, and the four scores are simply added together:
  </p>
  <p>
    <strong>
      JAMB Total = English score + Subject 2 score + Subject 3 score +
      Subject 4 score
    </strong>
  </p>

  <h2>Worked example</h2>
  <p>
    If you score 70 in English, 65 in Mathematics, 60 in Physics, and 55 in
    Chemistry:
  </p>
  <p><strong>Total = 70 + 65 + 60 + 55 = 250</strong></p>

  <h2>What counts as a good JAMB score?</h2>
  <p>
    There's no single official "good score" — it depends on your course and
    target institution's cut-off mark for that admission cycle. The result
    label this calculator shows you (from "Excellent" down to "Low Admission
    Chances") is based on these informal bands, not an official JAMB
    publication:
  </p>
  <ul>
    <li>300+ → Excellent, competitive for most courses</li>
    <li>250–299 → Very competitive for most courses</li>
    <li>200–249 → Reasonable for many courses</li>
    <li>180–199 → Around the general minimum range for some institutions</li>
    <li>Below 180 → Likely below JAMB's general minimum for most courses</li>
  </ul>
  <p>
    Always confirm your target course's actual departmental cut-off mark
    with the institution, and JAMB's official minimum for the current
    admission cycle on jamb.gov.ng — both can sit well above (or below)
    these general ranges, and both change every cycle.
  </p>

  <h2>After JAMB: what else affects admission?</h2>
  <p>
    Your UTME score alone rarely decides admission outright. Most
    institutions also run a Post-UTME screening exercise, and some
    factor in your WAEC/NECO O'Level grades alongside your JAMB score
    before making a final offer.
  </p>

  <h2>Frequently Asked Questions</h2>

  {jambFaq.map((f) => (
   <p key={f.q}>
    <strong>{f.q}</strong>
    <br />
    {f.a}
   </p>
  ))}

  <p className="calculators">
  You can also calculate your{" "}
  <Link to="/cgpa-calculator">CGPA</Link> or check the{" "}
  <Link to="/waec-grade-calculator">WAEC grading system</Link>.
</p>

</section>
  </div>

 );

};

export default JAMBScore;