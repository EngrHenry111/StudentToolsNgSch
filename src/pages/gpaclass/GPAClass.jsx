import { useState } from "react";
import { Helmet } from "react-helmet-async"; // ✅ FIXED
import "./gpaclass.css";

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
 const image = "https://studenttoolsng.com/logo.png";

 return(

  <div className="gpa-container">

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

    </Helmet>

<h1>GPA Class Calculator Nigeria</h1>

   <p>Enter your CGPA to know your degree classification</p>

   <div className="gpa-input">

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

   </div>
<section className="gpa-content">

  <h2>What is Degree Classification in Nigeria?</h2>
  <p>
    Degree classification in Nigeria is based on a student's CGPA and determines
    the class of degree awarded upon graduation.
  </p>

  <h2>How to Convert CGPA to Degree Class</h2>
  <p>
    Nigerian universities use a 5.0 grading scale. Your CGPA determines your
    degree class as shown in the table above.
  </p>

  <h2>Examples</h2>
  <p>
    If your CGPA is 4.70, you will graduate with a First Class degree.  
    If your CGPA is 3.80, you will have a Second Class Upper.
  </p>

  <h2>Why Degree Classification Matters</h2>
  <ul>
    <li>Important for job opportunities</li>
    <li>Required for postgraduate studies</li>
    <li>Used for scholarships and internships</li>
  </ul>

  <h2>Frequently Asked Questions</h2>

  <p><strong>What CGPA is First Class?</strong><br/>
  4.50 and above.</p>

  <p><strong>Can I graduate with Second Class Upper?</strong><br/>
  Yes, with a CGPA between 3.50 and 4.49.</p>    <p>
You can also calculate your 
<a href="/cgpa-calculator"> {" "}CGPA</a> or check your 
<a href="/jamb-score-calculator"> {" "} JAMB Score</a>.
</p> 

</section>
  </div>

 );

};

export default GPAClass;