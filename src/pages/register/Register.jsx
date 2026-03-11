/*
Register new student account
*/

import { useState } from "react";
import { registerUser } from "../../services/authService";
import "./register.css";

const Register = ()=>{

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const handleSubmit = async(e)=>{

  e.preventDefault();

  await registerUser({name,email,password});

  alert("Account created");

 };

 return(

  <div className="auth-container">

   <h2>Create Account</h2>

   <form onSubmit={handleSubmit}>

    <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />

    <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

    <input
     type="password"
     placeholder="Password"
     onChange={(e)=>setPassword(e.target.value)}
    />

    <button>Create Account</button>

   </form>

  </div>

 );

};

export default Register;