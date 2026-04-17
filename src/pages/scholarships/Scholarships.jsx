/*
Scholarship Opportunities
Displays available scholarships
*/

import "./scholarships.css";
import { Helmet } from "react-helmet-async";

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
const image = "https://studenttoolsng.com/logo.png";

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