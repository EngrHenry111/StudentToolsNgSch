/*
View Contact Messages
*/

import { useEffect,useState } from "react";
import API from "../../services/api";
import "./adminMessages.css"

const AdminMessages = () => {

 const [messages,setMessages] = useState([]);

 useEffect(()=>{

  fetchMessages();

 },[]);

 const fetchMessages = async ()=>{

  const res = await API.get("/messages");

  setMessages(res.data);

 };

 return(

  <div className="admin-messages-container">

   <h1>Contact Messages</h1>

   <div className="messages-grid">

   {messages.map((m)=>(

    <div key={m._id} className="message-card">

     <h3>{m.name}</h3>

     <p className="email">{m.email}</p>

     <p className="message-text">{m.message}</p>

    </div>

   ))}

   </div>

  </div>

 );

};

export default AdminMessages;