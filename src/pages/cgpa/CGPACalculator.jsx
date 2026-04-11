import { useState } from "react";
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
 const image = "https://studenttoolsng.com/logo.png";

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

  </div>
 );
};

export default CGPACalculator;