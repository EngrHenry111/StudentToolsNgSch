import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const seoContent = {

 "cgpa-calculator-nigeria": {
  title:"CGPA Calculator Nigeria | Calculate Your CGPA Easily",
  description:"Use this CGPA calculator designed for Nigerian universities to easily calculate your cumulative grade point average.",
  heading:"CGPA Calculator for Nigerian Universities",
  content:"This tool helps Nigerian university students calculate their CGPA easily using the standard 5-point grading system."
 },

 "how-to-calculate-cgpa": {
  title:"How to Calculate CGPA in Nigerian Universities",
  description:"Step-by-step guide on how to calculate CGPA in Nigerian universities using credit units and grade points.",
  heading:"How to Calculate CGPA",
  content:"To calculate CGPA, multiply each course unit by its grade point and divide the total points by the total units."
 },

 "waec-grading-system": {
  title:"WAEC Grading System Explained",
  description:"Learn how WAEC grades are calculated from A1 to F9.",
  heading:"WAEC Grading System",
  content:"WAEC grading ranges from A1 (Excellent) to F9 (Fail). Understanding this system helps students evaluate their results."
 },

 "jamb-score-calculator-nigeria": {
  title:"JAMB Score Calculator Nigeria",
  description:"Calculate your JAMB score and understand how admission points are determined.",
  heading:"JAMB Score Calculator",
  content:"JAMB scores are calculated from four subjects each worth 100 marks giving a maximum score of 400."
 }

};

const SeoPage = ()=>{

 const {slug} = useParams();

 const page = seoContent[slug];

 if(!page){
  return <h2>Page not found</h2>;
 }

 const url = `https://studenttoolsng.com/${slug}`;
 const image = "https://studenttoolsng.com/logo.png";

 return(

 <div style={{padding:"40px",maxWidth:"900px",margin:"auto"}}>

 <Helmet>

 {/* Basic SEO */}
 <title>{page.title}</title>

 <meta name="description" content={page.description}/>

 {/* Canonical */}
 <link rel="canonical" href={url} />

 {/* Open Graph (light) */}
 <meta property="og:title" content={page.title} />
 <meta property="og:description" content={page.description} />
 <meta property="og:image" content={image} />
 <meta property="og:url" content={url} />
 <meta property="og:type" content="article" />

 {/* Twitter */}
 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content={page.title} />
 <meta name="twitter:description" content={page.description} />
 <meta name="twitter:image" content={image} />

 </Helmet>

 <h1>{page.heading}</h1>

 <p>{page.content}</p>

 </div>

 );

};

export default SeoPage;