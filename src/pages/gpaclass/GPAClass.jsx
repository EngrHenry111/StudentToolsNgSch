import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ✅ FIXED
import "./gpaclass.css";
import ShareButtons from "../../componentsMarketplace/ShareButtons";

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
  q: "Is 2.4 CGPA Second Class Lower?",
  a: "Yes. On the common 5-point scale, Second Class Lower runs from 2.40 to 3.49, so 2.40 is the lowest Second Class Lower CGPA. 2.39 and below is Third Class."
 },
 {
  q: "Is 3.5 CGPA Second Class Upper?",
  a: "Yes. Second Class Upper starts at exactly 3.50 and runs to 4.49. A CGPA of 3.49 is still Second Class Lower, so the boundary matters — confirm how your school rounds."
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

// 5-point scale boundaries (most common Nigerian convention — see note above).
const CLASSES = [
 { min: 4.5, name: "First Class", range: "4.50 – 5.00" },
 { min: 3.5, name: "Second Class Upper", range: "3.50 – 4.49" },
 { min: 2.4, name: "Second Class Lower", range: "2.40 – 3.49" },
 { min: 1.5, name: "Third Class", range: "1.50 – 2.39" },
 { min: 1.0, name: "Pass", range: "1.00 – 1.49" }
];

// Small epsilon so 2.40 typed as 2.4 (or 2.3999 from float maths) lands right.
const classify = (v) => {
 if (!Number.isFinite(v) || v < 1 || v > 5) return null;
 const i = CLASSES.findIndex((c) => v >= c.min - 1e-9);
 const cls = CLASSES[i];
 const next = i > 0 ? CLASSES[i - 1] : null;
 return { ...cls, next, gap: next ? Math.round((next.min - v) * 100) / 100 : 0 };
};

// The CGPAs students search for most ("2.89 cgpa is what class"), from
// Search Console — answered directly on the page.
const ASKED = [2.25, 2.33, 2.35, 2.38, 2.4, 2.41, 2.43, 2.45, 2.5, 2.53, 2.55, 2.6, 2.65, 2.67, 2.75, 2.76, 2.8, 2.89, 2.9, 3.0, 3.1, 3.17, 3.33, 3.35, 3.38, 3.42, 3.45, 3.47, 3.48, 3.5, 3.6, 3.67, 3.8, 4.0, 4.5];

// 1.0, 1.1 … 5.0 for the full lookup table.
const STEPS = Array.from({ length: 41 }, (_, i) => Math.round((1 + i * 0.1) * 10) / 10);

const GPAClass = () => {

 const [cgpa,setCgpa] = useState("");
 const [checked,setChecked] = useState(null); // { value, info } after Convert

 const calculateClass = () => {
  const value = Number(cgpa);
  setChecked({ value, info: cgpa === "" ? null : classify(value) });
 };

 const result = checked?.info ? checked.info.name : checked ? "Invalid CGPA" : "";

 const url = "https://studenttoolsng.com/gpa-class-calculator";
 const title = "What Class Is My CGPA? CGPA to Degree Class Checker Nigeria";
 const description = "2.40–3.49 is Second Class Lower, 3.50–4.49 Second Class Upper, 4.50+ First Class. Type any CGPA (e.g. 2.89 or 3.47) to see your class instantly.";
 const image = "https://studenttoolsng.com/og-image.png";

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

<h1>What Class Is My CGPA? Degree Class Calculator</h1>

   <p>Enter your CGPA (5.0 scale) to see your degree class and how far you are from the next one.</p>

   <div className="input-gpa">

    <input
     type="number"
     step="0.01"
     
     placeholder="Enter CGPA"
     min="1"
     max="5"
     inputMode="decimal"
     onChange={(e)=>setCgpa(e.target.value)}
     onKeyDown={(e)=>{ if (e.key === "Enter") calculateClass(); }}
    />

    <button onClick={calculateClass}>
     Convert
    </button>

   </div>

   {checked && (

    <div className="gpa-result">
     <h2>{result}</h2>
     {checked.info ? (
      <p>
       A CGPA of <strong>{checked.value.toFixed(2)}</strong> is <strong>{checked.info.name}</strong> ({checked.info.range}).
       {checked.info.next
        ? <> You need {checked.info.next.min.toFixed(2)} for {checked.info.next.name} — {checked.info.gap.toFixed(2)} more.</>
        : " That's the highest class."}
      </p>
     ) : (
      <p>Enter a CGPA between 1.00 and 5.00. Using a 4.0 scale? Convert it first with the <Link to="/cgpa-converter">CGPA converter</Link>.</p>
     )}
    </div>

   )}

   <ShareButtons
    url={url}
    title="GPA Class Calculator"
    label={result ? "Share your result:" : "Share this calculator:"}
    card={result && result !== "Invalid CGPA" ? { label: "My degree class", value: Number(cgpa).toFixed(2), sub: result } : undefined}
    text={result
     ? `My CGPA of ${cgpa} puts me in: ${result}. Check your degree class free on StudentToolsNG:`
     : "Free calculator: find out your degree class from your CGPA."}
   />

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

  <h2>What class is my CGPA? Quick answers</h2>
  <p>
    The CGPAs students ask about most, checked against the common 5-point
    scale. Values just under a boundary (2.39, 3.49, 4.49) are the ones to
    double-check with your faculty — see the note on rounding below.
  </p>
  <ul className="gpa-quick">
   {ASKED.map((v) => {
    const c = classify(v);
    return (
     <li key={v}>
      <strong>{v.toFixed(2)} CGPA</strong> is {c.name}
      {c.next && c.gap <= 0.15 ? ` (only ${c.gap.toFixed(2)} below ${c.next.name})` : ""}
     </li>
    );
   })}
  </ul>

  <h2>CGPA to degree class table (1.0 to 5.0)</h2>
  <div className="grading-table">
   <table>
    <thead>
     <tr><th>CGPA</th><th>Degree class</th><th>To reach the next class</th></tr>
    </thead>
    <tbody>
     {STEPS.map((v) => {
      const c = classify(v);
      return (
       <tr key={v}>
        <td>{v.toFixed(1)}</td>
        <td>{c.name}</td>
        <td>{c.next ? `+${c.gap.toFixed(2)} for ${c.next.name}` : "Highest class"}</td>
       </tr>
      );
     })}
    </tbody>
   </table>
  </div>

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

  <h2>Guides to each degree class</h2>
  <ul>
    <li><Link to="/cgpa-for-first-class">What CGPA is First Class in Nigeria?</Link></li>
    <li><Link to="/cgpa-for-second-class-upper">What CGPA is Second Class Upper?</Link></li>
    <li><Link to="/cgpa-for-second-class-lower">What CGPA is Second Class Lower?</Link></li>
    <li><Link to="/cgpa-for-third-class">What CGPA is Third Class?</Link></li>
    <li><Link to="/polytechnic-grading-system">Polytechnic grading system (ND and HND)</Link></li>
  </ul>

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