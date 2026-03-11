/*
Advanced CGPA Calculator for StudentToolsNG

Features:
- Add courses dynamically
- Remove courses
- Calculate CGPA
- Display total credit units
- Reset calculator
*/

import { useState } from "react";
import { Helmet } from "react-helmet";
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

 // Add new course
 const addCourse = () => {

  setCourses([
   ...courses,
   {course:"",unit:0,grade:"A"}
  ]);

 };

 // Remove course
 const removeCourse = (index) => {

  const updated = courses.filter((_,i)=>i!==index);

  setCourses(updated);

 };

 // Handle input change
 const handleChange = (index,field,value)=>{

  const updated = [...courses];

  updated[index][field] = value;

  setCourses(updated);

 };

 // Calculate CGPA
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

 // Reset calculator
 const resetCalculator = ()=>{

  setCourses([{course:"",unit:0,grade:"A"}]);

  setCgpa(0);

  setTotalUnits(0);

 };

 return(

  <div className="cgpa-container">

<Helmet>
<title>CGPA Calculator Nigeria | Calculate University CGPA Online</title>

<meta
 name="description"
 content="Free CGPA calculator for Nigerian university students. Calculate your GPA and cumulative CGPA instantly using the Nigerian grading system."
/>

<meta
 name="keywords"
 content="CGPA calculator Nigeria, university CGPA calculator, GPA calculator Nigeria, calculate CGPA online"
/>

</Helmet>
   <h1>Advanced CGPA Calculator</h1>

   <p>Calculate your university CGPA using Nigerian grading system</p>

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