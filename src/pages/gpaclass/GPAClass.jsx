import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ✅ FIXED
import "./gpaclass.css";

// AI-drafted (2026-09-13) — factual/explanatory content per Google's "low
// value content" guidance. Needs human review before final: the CGPA-to-
// class boundaries below (e.g. 4.50 for First Class) are the most common
// convention in Nigerian universities but are set by each institution's
// senate, not by a single national standard — some universities use 4.00
// (not 4.50) as the First Class boundary on a 5-point scale. Verify against
// your specific institution's academic regulations.
const gpaFaq = [
 {
  q: "What CGPA is First Class in Nigeria?",
  a: "On the common 5-point scale, 4.50 and above is First Class at most universities — but some institutions set the boundary at 4.00 instead. Check your own school's academic regulations to be sure."
 },
 {
  q: "Can I graduate with Second Class Upper?",
  a: "Yes — a CGPA between 3.50 and 4.49 is typically classified as Second Class Upper (also written as \"Second Class Upper Division\") at most Nigerian universities."
 },
 {
  q: "If my CGPA is exactly on a boundary, like exactly 4.50, which class do I get?",
  a: "In the ranges shown here, the boundary value itself is included in the higher class — 4.50 counts as First Class, not Second Class Upper. But always confirm your institution's own rounding rule: some universities calculate CGPA to more decimal places than they display, so a displayed 4.50 could actually be 4.499 once rounded, which changes the outcome."
 },
 {
  q: "Can a strong final year still change my degree class?",
  a: "Yes. Because CGPA is cumulative across every semester, a strong final year adds more weight the more credit units you've already accumulated — it won't erase a weak early semester, but it can be enough to push a borderline CGPA into a higher class by graduation."
 }
];

const GPAClass = () => {

 const [cgpa,setCgpa] = useState("");
 const [result,setResult] = useState("");

 const calculateClass = () => {

  const value = Number(cgpa);

  if(value >= 4.5){
   setResult("First Class");
  }
  else if(value >= 3.5){
   setResult("Second Class Upper");
  }
  else if(value >= 2.4){
   setResult("Second Class Lower");
  }
  else if(value >= 1.5){
   setResult("Third Class");
  }
  else if(value >= 1.0){
   setResult("Pass");
  }
  else{
   setResult("Invalid CGPA");
  }

 };

 const url = "https://studenttoolsng.com/gpa-class-calculator";
 const title = "GPA Class Calculator | Nigerian Degree Classification";
 const description = "Convert your CGPA to degree classification in Nigeria. Instantly know if you have First Class, Second Class Upper or Lower using our free GPA class calculator.";
 const image = "https://studenttoolsng.com/logoH.png";

 return(

  <div className="gpa-class">

    <Helmet>

    {/* Primary SEO */}
    <title>{title}</title>

    <meta name="description" content={description} />

    <meta name="keywords" content="GPA class calculator Nigeria, degree classification Nigeria, first class CGPA Nigeria, convert CGPA to class" />

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

    {/* Structured Data (Tool Optimization) */}
    <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "GPA Class Calculator",
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
      mainEntity: gpaFaq.map((f) => ({
       "@type": "Question",
       name: f.q,
       acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    })}
    </script>

    </Helmet>

<h1>GPA Class Calculator Nigeria</h1>

   <p>Enter your CGPA to know your degree classification</p>

   <div className="input-gpa">

    <input
     type="number"
     step="0.01"
     
     placeholder="Enter CGPA"
     onChange={(e)=>setCgpa(e.target.value)}
    />

    <button onClick={calculateClass}>
     Convert
    </button>

   </div>

   {result && (

    <div className="gpa-result">
     <h2>{result}</h2>
    </div>

   )}

   <div className="grading-table">

    <h3>Nigerian Degree Classification</h3>

    <table>

     <thead>
      <tr>
       <th>CGPA Range</th>
       <th>Degree Class</th>
      </tr>
     </thead>

     <tbody>

      <tr>
       <td>4.50 – 5.00</td>
       <td>First Class</td>
      </tr>

      <tr>
       <td>3.50 – 4.49</td>
       <td>Second Class Upper</td>
      </tr>

      <tr>
       <td>2.40 – 3.49</td>
       <td>Second Class Lower</td>
      </tr>

      <tr>
       <td>1.50 – 2.39</td>
       <td>Third Class</td>
      </tr>

      <tr>
       <td>1.00 – 1.49</td>
       <td>Pass</td>
      </tr>

     </tbody>

    </table>

    <p className="grading-table-note">
     This is the most common scale on Nigerian universities' 5-point
     system — some institutions use 4.00, not 4.50, as the First Class
     boundary. See "A note on variation between institutions" further
     down this page.
    </p>

   </div>
<section className="gpa-content">

  <h2>What is degree classification in Nigeria?</h2>
  <p>
    Degree classification is the honours label — First Class, Second Class
    Upper, and so on — printed alongside your final CGPA on your degree
    certificate when you graduate from a Nigerian university. It's a
    single-tier summary of everything your CGPA already represents: your
    cumulative academic performance across every semester of your program.
  </p>

  <h2>How CGPA converts to degree class</h2>
  <p>
    Most Nigerian universities use the 5-point CGPA scale shown in the table
    above to place graduating students into one of five classes. Your CGPA
    is calculated the same way throughout your program — see our{" "}
    <Link to="/cgpa-calculator">CGPA Calculator</Link> for the full formula
    — and at graduation, your final cumulative figure is simply matched
    against the class ranges above.
  </p>

  <h2>Worked examples</h2>
  <p>
    A final CGPA of 4.70 falls in the 4.50–5.00 range, so that graduate
    receives a First Class degree. A final CGPA of 3.80 falls in the
    3.50–4.49 range, so that graduate receives a Second Class Upper. A
    final CGPA of 2.90 falls in the 2.40–3.49 range — Second Class Lower.
  </p>

  <h2>Why degree classification matters</h2>
  <ul>
    <li>Many employers use it as an initial screening criterion for graduate roles</li>
    <li>Most postgraduate programs (Master's, PGD) set a minimum class or CGPA for admission</li>
    <li>Some scholarships, fellowships, and NYSC-linked opportunities favour First Class and Second Class Upper graduates</li>
  </ul>

  <h2>A note on variation between institutions</h2>
  <p>
    The ranges above reflect the most common convention on a 5-point scale,
    but they are not a single fixed national law — each university's senate
    sets its own exact boundaries, and a small number of institutions use a
    4-point scale with different cut-offs entirely. If you're close to a
    class boundary, confirm the precise figures in your own institution's
    academic regulations.
  </p>

  <h2>Frequently Asked Questions</h2>

  {gpaFaq.map((f) => (
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

export default GPAClass;