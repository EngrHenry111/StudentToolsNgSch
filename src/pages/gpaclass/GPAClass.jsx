/*
GPA Class Converter

This tool converts CGPA into degree classification
based on the Nigerian university grading system.
*/

import { useState } from "react";
import { Helmet } from "react-helmet";
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

 return(

  <div className="gpa-container">
    <Helmet>

<title>GPA Class Calculator | Nigerian Degree Classification</title>

<meta
 name="description"
 content="Check your university degree class using your CGPA. Find out if you have First Class, Second Class Upper or Lower in Nigeria."
/>

<meta
 name="keywords"
 content="GPA class calculator, degree classification Nigeria, first class CGPA"
/>

<link
    rel="canonical"
    href="https://studenttoolsng.com/gpa-class-calculator"
  />

</Helmet>

   <h1>GPA to Degree Class Converter</h1>

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

   {/* Grading System Table */}

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

  </div>

 );

};

export default GPAClass;