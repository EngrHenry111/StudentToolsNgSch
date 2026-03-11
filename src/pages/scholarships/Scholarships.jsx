/*
Scholarship Opportunities
Displays available scholarships
*/

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

 return(

  <div className="scholarships">

   <h1>Scholarship Opportunities</h1>

   <div className="scholarship-grid">

    {scholarships.map((s,i)=>(
     
     <div key={i} className="scholarship-card">

      <h3>{s.name}</h3>

      <a href={s.link} target="_blank">
       View Details
      </a>

     </div>

    ))}

   </div>

  </div>

 );

};

export default Scholarships;