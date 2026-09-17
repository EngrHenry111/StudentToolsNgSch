import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ✅ FIXED
import "./cgpa.css";

const CGPACalculator = () => {

 const gradePoints = {
  A:5,
  B:4,
  C:3,
  D:2,
  E:1,
  F:0
 };

 const [courses,setCourses] = useState([
  {course:"",unit:0,grade:"A"}
 ]);

 const [cgpa,setCgpa] = useState(0);
 const [totalUnits,setTotalUnits] = useState(0);

 const addCourse = () => {
  setCourses([
   ...courses,
   {course:"",unit:0,grade:"A"}
  ]);
 };

 const removeCourse = (index) => {
  const updated = courses.filter((_,i)=>i!==index);
  setCourses(updated);
 };

 const handleChange = (index,field,value)=>{
  const updated = [...courses];
  updated[index][field] = value;
  setCourses(updated);
 };

 const calculateCGPA = ()=>{
  let units = 0;
  let points = 0;

  courses.forEach((course)=>{
   const unit = Number(course.unit);
   const grade = gradePoints[course.grade];
   units += unit;
   points += unit * grade;
  });

  const result = units ? (points / units).toFixed(2) : 0;

  setCgpa(result);
  setTotalUnits(units);
 };

 const resetCalculator = ()=>{
  setCourses([{course:"",unit:0,grade:"A"}]);
  setCgpa(0);
  setTotalUnits(0);
 };

 const url = "https://studenttoolsng.com/cgpa-calculator";
 const title = "CGPA Calculator Nigeria | Calculate University CGPA Online";
 const description = "Free CGPA calculator for Nigerian university students. Calculate your GPA and cumulative CGPA instantly using the Nigerian grading system.";
 const image = "https://studenttoolsng.com/logoH.png";

 // AI-drafted (2026-09-13) — factual/explanatory content per Google's "low
 // value content" guidance (this page was previously a bare calculator with
 // three truncated placeholder sentences). Needs human review before final:
 // the 5-point A–F scale below is the most common one in Nigerian
 // universities but is NOT universal — some polytechnics/colleges of
 // education use a 4-point scale, and grade-point boundaries vary slightly
 // by institution. Verify against your specific school's academic
 // regulations before treating any number here as authoritative.
 const cgpaFaq = [
  {
   q: "What is a good CGPA in Nigeria?",
   a: "There's no single official cutoff, but as a general guide: 4.50–5.00 is First Class, 3.50–4.49 is Second Class Upper, and anything from 3.00 and above is usually considered a strong CGPA for job and postgraduate applications."
  },
  {
   q: "What's a common mistake when calculating CGPA by hand?",
   a: "The most common one is averaging the grade points directly instead of weighting them by credit unit — a 5-unit course and a 2-unit course don't count equally. This calculator applies the credit-unit weighting automatically so a manual slip doesn't throw off your result."
  },
  {
   q: "Is the CGPA scale the same at every Nigerian university?",
   a: "No. The 5-point scale (A=5 to F=0) used on this page is the most common one, but some institutions — particularly polytechnics and colleges of education awarding HND — use a 4-point scale instead. Always check your own school's grading policy."
  },
  {
   q: "Does retaking a failed course improve my CGPA?",
   a: "It depends on your institution's carry-over policy. Some universities replace the failing grade with your new grade once you pass the retake, while others keep the original failing grade on your record and simply add the new pass as a separate entry. Check your school's specific policy — it changes how much a retake actually moves your CGPA."
  }
 ];

 return(

  <div className="cgpa-container">

   <Helmet>
    {/* Primary SEO */}
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="CGPA calculator Nigeria, university CGPA calculator, GPA calculator Nigeria, calculate CGPA online" />

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

    {/* Structured Data (VERY POWERFUL FOR GOOGLE) */}
    <script type="application/ld+json">
     {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "CGPA Calculator Nigeria",
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
      mainEntity: cgpaFaq.map((f) => ({
       "@type": "Question",
       name: f.q,
       acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
     })}
    </script>
   </Helmet>

   <h1>Advanced CGPA Calculator</h1>

   <p>Calculate your university CGPA using Nigerian grading system</p>

   {/* EVERYTHING BELOW REMAINS EXACTLY THE SAME */}

   <table className="cgpa-table">
    <thead>
     <tr>
      <th>Course</th>
      <th>Unit</th>
      <th>Grade</th>
      <th>Action</th>
     </tr>
    </thead>

    <tbody>
     {courses.map((course,index)=>(
      <tr key={index}>
       <td>
        <input
         type="text"
         placeholder="Course Code"
         value={course.course}
         onChange={(e)=>handleChange(index,"course",e.target.value)}
        />
       </td>

       <td>
        <input
         type="number"
         value={course.unit}
         onChange={(e)=>handleChange(index,"unit",e.target.value)}
        />
       </td>

       <td>
        <select
         value={course.grade}
         onChange={(e)=>handleChange(index,"grade",e.target.value)}
        >
         <option>A</option>
         <option>B</option>
         <option>C</option>
         <option>D</option>
         <option>E</option>
         <option>F</option>
        </select>
       </td>

       <td>
        <button
         className="remove-btn"
         onClick={()=>removeCourse(index)}
        >
         Remove
        </button>
       </td>
      </tr>
     ))}
    </tbody>
   </table>

   <div className="cgpa-buttons">
    <button onClick={addCourse}>Add Course</button>
    <button className="calculate-btn" onClick={calculateCGPA}>
     Calculate CGPA
    </button>
    <button className="reset-btn" onClick={resetCalculator}>
     Reset
    </button>
   </div>

   <div className="cgpa-summary">
    <div className="summary-card">
     <h3>Total Units</h3>
     <p>{totalUnits}</p>
    </div>

    <div className="summary-card">
     <h3>Your CGPA</h3>
     <p>{cgpa}</p>
    </div>
   </div>

   <section className="cgpa-content">

  <h2>What is CGPA?</h2>
  <p>
    CGPA stands for Cumulative Grade Point Average. It is the figure Nigerian
    universities use to summarize a student's overall academic performance
    across every semester completed so far, from 100 level up to final year.
    Unlike a single semester's GPA, which resets each term, your CGPA carries
    forward and updates every time new results are released — it's the
    number that ends up printed on your transcript and certificate.
  </p>

  <h2>GPA vs CGPA — what's the difference?</h2>
  <p>
    GPA (Grade Point Average) covers one semester only. CGPA (Cumulative
    Grade Point Average) is the running average across all the semesters
    you've completed. A bad GPA in one semester will pull your CGPA down,
    but because CGPA is cumulative, a single weak semester matters less as
    more semesters — and more total credit units — are added to the average.
  </p>

  <h2>How CGPA is calculated in Nigeria</h2>
  <p>
    Most Nigerian universities calculate CGPA using this formula:
  </p>
  <p>
    <strong>
      CGPA = (Sum of Grade Point × Credit Unit for every course) ÷ (Sum of
      all Credit Units)
    </strong>
  </p>
  <p>
    In practice: for each course, multiply the credit unit (e.g. 2, 3, or 4
    units) by the grade point earned (A=5, B=4, C=3, D=2, E=1, F=0). Add up
    those totals for every course you've ever taken, then divide by the
    total number of credit units. That single number is your CGPA. This
    calculator performs that exact calculation for you — just enter each
    course's unit and grade above.
  </p>

  <h2>Worked example</h2>
  <p>
    Say a student took four courses in a semester:
  </p>
  <ul>
    <li>MTH101 (3 units) — grade A (5 points) → 15 grade points</li>
    <li>PHY101 (3 units) — grade B (4 points) → 12 grade points</li>
    <li>CHM101 (2 units) — grade C (3 points) → 6 grade points</li>
    <li>GST101 (2 units) — grade B (4 points) → 8 grade points</li>
  </ul>
  <p>
    Total grade points = 15 + 12 + 6 + 8 = 41. Total units = 3 + 3 + 2 + 2 =
    10. GPA for that semester = 41 ÷ 10 = <strong>4.10</strong>. To get your
    CGPA, you carry this same running total (grade points and units) into
    the next semester instead of starting over.
  </p>

  <h2>The Nigerian university grading scale</h2>
  <p>
    This is the 5-point scale used by the calculator above, and by most
    (though not all) Nigerian universities:
  </p>
  <ul>
    <li>A = 5 points (70–100, Excellent)</li>
    <li>B = 4 points (60–69, Very Good)</li>
    <li>C = 3 points (50–59, Good)</li>
    <li>D = 2 points (45–49, Fair)</li>
    <li>E = 1 point (40–44, Pass)</li>
    <li>F = 0 points (Below 40, Fail)</li>
  </ul>
  <p>
    <strong>Note:</strong> exact score-to-grade boundaries and the number of
    points per grade can differ slightly between universities, and some
    polytechnics and colleges of education use a 4-point scale instead of
    this 5-point one. Always confirm the exact scale in your own
    institution's academic handbook.
  </p>

  <h2>How your CGPA maps to a degree class</h2>
  <p>
    At graduation, your final CGPA is converted into a degree classification.
    Use our{" "}
    <Link to="/gpa-class-calculator">GPA Class Calculator</Link>{" "}
    to see exactly which class your CGPA falls into, along with the typical
    CGPA ranges for First Class, Second Class Upper, Second Class Lower,
    Third Class, and Pass.
  </p>

  <h2>Frequently Asked Questions</h2>

  {cgpaFaq.map((f) => (
   <p key={f.q}>
    <strong>{f.q}</strong>
    <br />
    {f.a}
   </p>
  ))}

<p className="cgpa-links">
  <strong>Explore more tools:</strong>{" "}
  You can also check our{" "}
  <Link to="/waec-grade-calculator">WAEC Calculator</Link>{" "}
  and{" "}
  <Link to="/jamb-score-calculator">JAMB Calculator</Link>.
</p>
</section>



  </div>
 );
};

export default CGPACalculator;