/*
Contact Page
Sends message to backend API
*/

import { useState } from "react";
import API from "../../services/api";
import { Helmet } from "react-helmet";
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

 return(

  <div className="contact">

    <Helmet>

    <title>Contact Us | StudentToolsNG</title>

    <meta
    name="description"
    content="Contact StudentToolsNG for questions, feedback or academic support."
    />

    <link
    rel="canonical"
    href="https://studenttoolsng.com/contact"
  />

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