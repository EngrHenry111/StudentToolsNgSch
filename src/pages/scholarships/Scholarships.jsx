/*
Scholarship Opportunities
Displays available scholarships
*/

import { Helmet } from "react-helmet-async";
import "./scholarships.css";

const Scholarships = () => {

 const scholarships = [

  {
   name:"MTN Foundation Scholarship",
   link:"https://mtn.ng/scholarships"
  },

  {
   name:"Federal Government Scholarship",
   link:"#"
  },

  {
   name:"Agbami Medical Scholarship",
   link:"#"
  }

 ];

 const url = "https://studenttoolsng.com/scholarships";
const title = "Scholarships for Nigerian Students 2026 | Apply Now";
const description = "Explore available scholarships for Nigerian students including MTN, Federal Government, and Agbami scholarships. Learn eligibility and how to apply.";
const image = "https://studenttoolsng.com/og-image.png";

 return(

  <div className="scholarships">
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
      "@type": "CollectionPage",
      name: "Scholarships for Nigerian Students",
      url: url,
      description: description
    })}
  </script>
</Helmet>

   <h1>Scholarship Opportunities</h1>

   <div className="scholarship-grid">

    {scholarships.map((s,i)=>(
     
     <div key={i} className="scholarship-card">

      {/* <h3>{s.name}</h3> */}
      <h3>{s.name}</h3>
<p>
  Learn about eligibility, application process, and deadlines for this scholarship.
</p>

      <a href={s.link} target="_blank">
       View Details
      </a>

     </div>

    ))}

   </div>

   <section className="scholarship-content">

  <h2>Scholarships for Nigerian Students</h2>
  <p>
    Scholarships help Nigerian students reduce the cost of education and 
    achieve their academic goals without financial stress. Many organizations 
    including government bodies and private companies offer scholarships yearly.
  </p>

  <h2>Types of Scholarships Available</h2>
  <ul>
    <li>Undergraduate scholarships</li>
    <li>Postgraduate scholarships</li>
    <li>Merit-based scholarships</li>
    <li>Need-based scholarships</li>
  </ul>

  <h2>How to Apply for Scholarships</h2>
  <p>
    To apply for scholarships in Nigeria, students should monitor deadlines,
    prepare required documents, and apply through official portals.
  </p>

  <h2>Who Offers Scholarships in Nigeria?</h2>
  <ul>
    <li><strong>Federal and state governments:</strong> through scholarship boards and education trust funds, often for undergraduates in Nigerian universities and for study abroad in priority courses.</li>
    <li><strong>Companies:</strong> especially oil and gas, banking and telecoms firms, many of which run yearly undergraduate awards for students in their host communities or in particular courses.</li>
    <li><strong>Foundations and NGOs:</strong> private and religious foundations that support students with financial need or outstanding results.</li>
    <li><strong>Universities:</strong> internal awards for the best students in a faculty or department.</li>
    <li><strong>Foreign governments and international bodies:</strong> for example the Commonwealth and Chevening scholarships for postgraduate study in the United Kingdom.</li>
  </ul>

  <h2>Common Eligibility Requirements</h2>
  <ul>
    <li>Admission into, or current study at, an accredited institution.</li>
    <li>A minimum academic standard, such as five O-level credits including English and Mathematics, a minimum JAMB score, or a minimum CGPA (often 3.0 or 3.5 on a 5-point scale).</li>
    <li>A particular course of study, level, state of origin or community.</li>
    <li>Proof of financial need for need-based awards.</li>
    <li>For postgraduate and international awards: a good first degree, work experience and evidence of leadership.</li>
  </ul>
  <p>
    Not sure where you stand? Use our <a href="/cgpa-calculator">CGPA Calculator</a> and
    <a href="/gpa-class-calculator"> GPA Class Calculator</a> to check your result against
    the minimum required before you apply.
  </p>

  <h2>Documents You Usually Need</h2>
  <ul>
    <li>Birth certificate or declaration of age, and a valid means of identification (NIN slip, passport).</li>
    <li>O-level results (WAEC or NECO) and JAMB result slip.</li>
    <li>University admission letter and current student ID card.</li>
    <li>Academic transcript or statement of result showing your CGPA.</li>
    <li>Local government or state of origin certificate, where required.</li>
    <li>Passport photographs.</li>
    <li>A personal statement or essay, and reference letters for many awards.</li>
  </ul>
  <p>Scan these documents clearly in advance so you can apply quickly when a scholarship opens.</p>

  <h2>Tips for a Strong Application</h2>
  <ul>
    <li><strong>Start early:</strong> many scholarships open and close within a few weeks each year.</li>
    <li><strong>Read the requirements carefully</strong> and submit every document asked for; incomplete applications are often rejected automatically.</li>
    <li><strong>Write your own essay:</strong> explain your goals, your challenges, what you have achieved and how the award will help you. Be specific and honest.</li>
    <li><strong>Choose referees who know you well</strong>, such as a lecturer or principal, and give them enough time.</li>
    <li><strong>Prepare for aptitude tests and interviews:</strong> many company scholarships include an online test in verbal and numerical reasoning.</li>
    <li><strong>Keep your grades up:</strong> most awards require you to maintain a minimum CGPA to keep the scholarship.</li>
  </ul>

  <h2>Avoid Scholarship Scams</h2>
  <ul>
    <li>Genuine scholarships do not ask you to pay a fee to receive an award.</li>
    <li>Apply only through the official website or portal of the organisation offering the scholarship.</li>
    <li>Be wary of messages promising guaranteed awards or asking for your bank PIN or BVN.</li>
    <li>Check announcements on the organisation's official website or verified social media pages.</li>
  </ul>


<p>
  You can also use our <br /> <br />
  <a href="/cgpa-calculator">CGPA Calculator</a>  <br /> <br />
  to track your academic performance while applying for scholarships.
</p>
</section>

  </div>

 );

};

export default Scholarships;