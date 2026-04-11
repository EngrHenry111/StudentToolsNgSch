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

   console.log(err);

  }

 };

 const url = "https://studenttoolsng.com/contact";
 const title = "Contact StudentToolsNG | Support & Enquiries";
 const description = "Contact StudentToolsNG for questions, academic support, feedback, or partnership opportunities. We are here to help students succeed.";

 const image = "https://studenttoolsng.com/logo.png";

 return(

  <div className="contact">

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
     placeholder="Email"
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

  </div>

 );

};

export default Contact;