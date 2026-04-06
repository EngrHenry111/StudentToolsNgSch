import { Helmet } from "react-helmet";
import "./terms.css";

const Terms = () => {

 return(

 <div className="terms-page">

 <Helmet>

 <title>Terms and Conditions | StudentToolsNG</title>

 <meta
 name="description"
 content="Terms and conditions for using StudentToolsNG academic tools and tutorials."
 />

 
<link
    rel="canonical"
    href="https://studenttoolsng.com/terms"
  />

 </Helmet>

 <h1>Terms and Conditions</h1>

 <p>
 Welcome to StudentToolsNG. By accessing and using this website, you agree to comply with the following terms and conditions.
 </p>

 <h2>Use of Our Tools</h2>

 <p>
 StudentToolsNG provides academic tools such as CGPA calculators, WAEC grade calculators, and JAMB score calculators for educational purposes only.
 </p>

 <p>
 While we strive to provide accurate calculations, users should verify their academic results with their respective institutions.
 </p>

 <h2>Educational Content</h2>

 <p>
 Tutorials and educational materials published on StudentToolsNG are intended to support students in their learning journey.
 </p>

 <p>
 We do not guarantee academic outcomes based on the use of our tools or tutorials.
 </p>

 <h2>User Responsibility</h2>

 <p>
 Users are responsible for ensuring the accuracy of the information they enter into any calculators or tools on this website.
 </p>

 <h2>External Links</h2>

 <p>
 StudentToolsNG may contain links to external websites. We are not responsible for the content or practices of these external sites.
 </p>

 <h2>Changes to These Terms</h2>

 <p>
 We reserve the right to update these terms at any time. Users are encouraged to review this page periodically.
 </p>

 <h2>Contact</h2>

 <p>
 If you have questions about these Terms and Conditions, please contact us through the contact page.
 </p>

 </div>

 );

};

export default Terms;