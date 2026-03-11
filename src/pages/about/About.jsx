import { Helmet } from "react-helmet";
import "./about.css";

const About = () => {

 return(

 <div className="about-page">

 <Helmet>

 <title>About StudentToolsNG</title>

 <meta
 name="description"
 content="StudentToolsNG provides free academic tools and tutorials for Nigerian students including CGPA calculators, WAEC grade calculators, JAMB score calculators and study resources."
 />

 </Helmet>

 <h1>About StudentToolsNG</h1>

 <p>

 StudentToolsNG is an educational platform designed to help students 
 easily calculate their academic results and access helpful learning resources.

 </p>

 <p>

 Our platform provides free tools such as CGPA calculators, WAEC grade calculators, 
 and JAMB score calculators to simplify academic planning for Nigerian students.

 </p>

 <p>

 In addition to academic tools, StudentToolsNG also provides tutorials, 
 study guides, and scholarship opportunities to help students succeed in school.

 </p>

 <h2>Our Mission</h2>

 <p>

 Our mission is to make academic tools and educational resources easily 
 accessible to every Nigerian student.

 </p>

 <h2>What We Offer</h2>

 <ul>

 <li>CGPA Calculator for university students</li>

 <li>WAEC grade calculator</li>

 <li>JAMB score calculator</li>

 <li>Study tutorials and guides</li>

 <li>Scholarship opportunities</li>

 <li>Study planning tools</li>

 </ul>

 <h2>Contact Us</h2>

 <p>

 If you have questions, suggestions, or feedback, feel free to reach out through our
 contact page.

 </p>

 </div>

 );

};

export default About;