import { useState } from "react";
import API from "../../services/api";
import { Helmet } from "react-helmet-async"; // ✅ FIXED
import "./contact.css";

const Contact = () => {

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [message,setMessage] = useState("");

 const handleSubmit = async (e)=>{

  e.preventDefault();

  try{

   await API.post("/messages",{
    name,
    email,
    message
   });

   alert("Message sent successfully");

   setName("");
   setEmail("");
   setMessage("");

  }catch(err){

 console.log("FULL ERROR:", err);

 console.log("SERVER:", err.response?.data);

 alert(
   err.response?.data?.message || "Something went wrong"
 );

}

 };

 const url = "https://studenttoolsng.com/contact";
 const title = "Contact StudentToolsNG | Support & Enquiries";
 const description = "Contact StudentToolsNG for questions, academic support, feedback, or partnership opportunities. We are here to help students succeed.";

 const image = "https://studenttoolsng.com/og-image.png";

 return(

  <div className="contact-con">

    <Helmet>

    {/* Primary SEO */}
    <title>{title}</title>

    <meta name="description" content={description} />

    <meta name="keywords" content="contact StudentToolsNG, student support Nigeria, academic help Nigeria, contact education platform" />

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

    {/* Structured Data */}
    <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact StudentToolsNG",
      url: url,
      description: description,
      publisher: {
        "@type": "Organization",
        name: "StudentToolsNG",
        url: "https://studenttoolsng.com"
      }
    })}
    </script>

    </Helmet>

   <h1>Contact Us</h1>

   <form onSubmit={handleSubmit}>

    <input
     placeholder="Your Name"
     value={name}
     onChange={(e)=>setName(e.target.value)}
    />

    <input
    type="email" placeholder="Email" required
     value={email}
     onChange={(e)=>setEmail(e.target.value)}
    />

    <textarea
     placeholder="Message"
     value={message}
     onChange={(e)=>setMessage(e.target.value)}
    />

    <button type="submit">
     Send Message
    </button>

   </form>


   <section className="contact-content">

  <h2>Get in Touch with StudentToolsNG</h2>
  <p>
    Do you have questions about our CGPA calculator, WAEC grading system, 
    or JAMB score tools? We are here to help Nigerian students succeed academically.
  </p>

  <h2>Why Contact Us?</h2>
  <ul>
    <li>Get help using our academic tools</li>
    <li>Report bugs or issues</li>
    <li>Request new features</li>
    <li>Partnership and collaboration enquiries</li>
  </ul>

  <h2>Support for Nigerian Students</h2>
  <p>
    StudentToolsNG provides free tools and tutorials designed specifically 
    for Nigerian universities, WAEC, and JAMB students.
  </p> 
  
  <p>
  You can also explore our 
  <a href="/cgpa-calculator">CGPA Calculator</a>, 
  <a href="/waec-grade-calculator">WAEC Calculator</a>, and 
  <a href="/jamb-score-calculator">JAMB Calculator</a>.
</p>

  <h2>What to Include in Your Message</h2>
  <ul>
    <li>The page or tool you were using, for example the CGPA calculator or a particular tutorial.</li>
    <li>What you expected to happen and what actually happened.</li>
    <li>The device and browser you used, if you are reporting a problem.</li>
    <li>For a tutorial request, the subject, topic and level (WAEC, JAMB or university).</li>
  </ul>
  <p>Clear details help us answer you faster and fix problems for every student.</p>

  <h2>Frequently Asked Questions</h2>
  <h3>Are the tools on StudentToolsNG free?</h3>
  <p>
    Yes. The CGPA, WAEC, JAMB and GPA class calculators, the study planner, the
    math calculator and the tutorials are free to use.
  </p>
  <h3>How is my CGPA calculated?</h3>
  <p>
    Each course's grade point is multiplied by its credit units, the results are
    added together, and the total is divided by the total units. Our
    <a href="/cgpa-calculator"> CGPA Calculator</a> does this for you and explains
    how CGPA works.
  </p>
  <h3>Can I suggest a tutorial topic?</h3>
  <p>
    Yes. Send us the subject and topic using the form above. We publish new
    physics, mathematics, biology, chemistry and programming tutorials regularly.
  </p>
  <h3>Can I sell my research or project materials?</h3>
  <p>
    Yes. Publishers can list research documents in our
    <a href="/marketplace"> Research Library</a> and set their own price.
  </p>
  <h3>How is my information used?</h3>
  <p>
    Please read our <a href="/privacy-policy">Privacy Policy</a> for details of the
    information we collect and how it is used.
  </p>

</section>

  </div>

 );

};

export default Contact;