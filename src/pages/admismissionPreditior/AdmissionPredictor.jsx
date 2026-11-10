/*
Admission Chance Estimator
Predicts admission probability
*/

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./admissionPredictor.css";
import MarketplacePromo from "../../componentsMarketplace/MarketplacePromo";
import ShareButtons from "../../componentsMarketplace/ShareButtons";

const AdmissionPredictor = ()=>{

 const [jamb,setJamb] = useState("");
 const [postutme,setPostutme] = useState("");
 const [chance,setChance] = useState("");

 const predict = ()=>{

  // JAMB is out of 400, post-UTME out of 100: put JAMB on the same
  // 100-point scale first, or the 60% weight swamps everything.
  const score =
   (Number(jamb)/400*100*0.6) +
   (Number(postutme)*0.4);
  const rounded = Math.round(score*10)/10;

  if(score>=70) setChance(`Estimated score ${rounded}: High Admission Chance`);
  else if(score>=60) setChance(`Estimated score ${rounded}: Moderate Chance`);
  else setChance(`Estimated score ${rounded}: Low Chance`);

 };

 const url = "https://studenttoolsng.com/admission-predictor";
const title = "Admission Chance Calculator Nigeria | JAMB & Post UTME Predictor";
const description = "Predict your admission chances in Nigerian universities using your JAMB and Post UTME scores. Free admission calculator for students.";
const image = "https://studenttoolsng.com/og-image.png";

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
    type="number"
    min="0"
    max="100"
    placeholder="Post UTME Score (out of 100)"
    onChange={(e)=>setPostutme(e.target.value)}
   />

   <button onClick={predict}>
    Predict Admission
   </button>

   <h2>{chance}</h2>

   <ShareButtons
    url={url}
    title="Admission Chance Calculator"
    label={chance ? "Share with a friend:" : "Share this calculator:"}
    text="Free admission chance calculator for Nigerian universities. Check your chances with your JAMB and post-UTME scores:"
   />

   <section className="predictor-content">

  <h2>How Admission is Calculated in Nigeria</h2>
  <p>
    Most Nigerian universities use a combination of JAMB and Post UTME scores 
    to determine admission eligibility. Each school has its own formula.
  </p>

  <h2>How This Admission Predictor Works</h2>
  <p>
    This tool estimates your admission chances using a weighted formula:
    60% JAMB score and 40% Post UTME score. Your JAMB score (out of 400)
    is first converted to a mark out of 100, so both scores are on the
    same scale.
  </p>

  <h2>Example Calculation</h2>
  <p>
    If you score 250 in JAMB and 70 in Post UTME:
  </p>
  <p>JAMB out of 100: 250 ÷ 400 × 100 = 62.5</p>
  <p><strong>(62.5 × 0.6) + (70 × 0.4) = 37.5 + 28 = 65.5</strong> → Moderate Chance</p>

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

  <h2>Why Real Schools Use Different Formulas</h2>
  <p>
    The 60/40 split above is a simple general estimate. Each university sets its
    own screening formula. Many split the marks equally between UTME and the
    post-UTME test, some also add points for O'level grades (UNILAG and UNILORIN
    are reported to use 50% UTME, 30% post-UTME and 20% O'level), and others
    screen only with UTME and O'level results. For a school-specific estimate, use the{" "}
    <a href="/aggregate-score-calculator">aggregate score calculator</a>, which has
    the reported formulas for UNILAG, UI, OAU, UNN, UNIBEN and other universities.
  </p>

  <h2>What Else Decides Your Admission</h2>
  <ul>
    <li>
      <strong>The departmental cut-off mark.</strong> JAMB sets a national minimum
      UTME score each year, but each school and department sets its own, usually
      higher, cut-off. Medicine, Law, Nursing, Pharmacy and Engineering need far
      more than the minimum.
    </li>
    <li>
      <strong>O'level requirements.</strong> You normally need five credits,
      including English Language and Mathematics, in subjects relevant to your
      course, in no more than two sittings. A missing credit rules you out however
      high your score.
    </li>
    <li>
      <strong>The right UTME subject combination.</strong> Your four UTME subjects
      must match the combination JAMB lists for your course.
    </li>
    <li>
      <strong>Admission quotas.</strong> Federal universities fill places partly on
      merit, partly from their catchment states and partly from educationally less
      developed states, so your state of origin can affect your chances on the
      same score.
    </li>
    <li>
      <strong>Your choice of institution.</strong> Most admissions go to candidates
      who chose the school as first choice. Changing your institution or course on
      the JAMB portal can help if your score is below your first choice's cut-off.
    </li>
    <li>
      <strong>JAMB CAPS.</strong> Every admission must be offered and accepted on
      JAMB's Central Admissions Processing System (CAPS). An admission list from
      the school is not final until you accept the offer on CAPS.
    </li>
  </ul>

  <h2>How to Improve Your Chances</h2>
  <ul>
    <li>Check last year's departmental cut-off for your course before you choose it.</li>
    <li>Practise in the CBT format so you can push your UTME score up; our <a href="/jamb-cbt-practice">JAMB CBT practice</a> is free.</li>
    <li>Prepare seriously for the post-UTME, because in many schools it can move your aggregate more than a few extra UTME marks.</li>
    <li>Upload your O'level results to the JAMB portal early, and fix any errors in your data before screening.</li>
    <li>Keep a realistic second option, such as a less competitive course or a school with a lower cut-off.</li>
  </ul>

  <h2>Frequently Asked Questions</h2>
  <h3>Can I get admission with a score below 200?</h3>
  <p>
    Yes, in some schools and courses. Many state universities, polytechnics and
    colleges of education accept scores close to the JAMB minimum for less
    competitive courses. Federal universities and popular courses usually need more.
  </p>
  <h3>Is a high UTME score enough on its own?</h3>
  <p>
    No. You still need the right O'level credits, the correct subject combination,
    a good post-UTME or screening result where one is held, and acceptance on CAPS.
  </p>

  <p>
  You can also calculate your {""}
  <a href="/jamb-score-calculator">JAMB Score</a> and {""}
  <a href="/cgpa-calculator">CGPA</a>.
</p>

<MarketplacePromo
  heading="Preparing for your course?"
  text="Explore study guides and research documents by field in the Research Library — preview chapters 1 & 2 free."
/>

</section>

  </div>

 );

};

export default AdmissionPredictor;