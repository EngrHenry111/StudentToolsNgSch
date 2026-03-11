import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import './login.css'

const AdminLogin = () => {

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();

 const handleLogin = async(e)=>{

  e.preventDefault();

  try{

   const res = await API.post("/admin/login",{
    email,
    password
   });

   localStorage.setItem("adminToken",res.data.token);

   navigate("/admin");

  }catch(error){

   alert("Invalid email or password",error);

  }

 };

 return(

<div className="admin-login-container">

   <h2>Admin Login</h2>

   <form onSubmit={handleLogin} className="admin-login-form">

    <input
     placeholder="Email"
     value={email}
     onChange={(e)=>setEmail(e.target.value)}
    />

    <input
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e)=>setPassword(e.target.value)}
    />

    <button>Login</button>

   </form>

</div>
 );

};

export default AdminLogin;