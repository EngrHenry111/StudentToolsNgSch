/*
View Contact Messages
*/

import { useEffect, useState } from "react";
import API from "../../services/api";

import "./adminMessages.css";

const AdminMessages = () => {

 const [messages, setMessages] = useState([]);

 useEffect(() => {

  fetchMessages();

 }, []);

 /* FETCH */
 const fetchMessages = async () => {

  try {

   const res = await API.get("/messages");

   setMessages(res.data);

  } catch (err) {

   console.log(err);

  }

 };

 /* DELETE */
 const deleteHandler = async (id) => {

  const confirmDelete = window.confirm(
   "Are you sure you want to delete this message?"
  );

  if (!confirmDelete) return;

  try {

   await API.delete(`/messages/${id}`);

   // remove instantly from UI
   setMessages(messages.filter((m) => m._id !== id));

  } catch (err) {

   console.log(err);

   alert("Failed to delete message");

  }

 };

 return (

  <div className="admin-messages">

   <h1>Contact Messages</h1>

   <div className="messages-grid">

    {messages.map((m) => (

     <div key={m._id} className="message-card">

      <h3>{m.name}</h3>

      <p className="email">{m.email}</p>

      <p className="message-text">{m.message}</p>

      <button
       className="delete-btn"
       onClick={() => deleteHandler(m._id)}
      >
       Delete
      </button>

     </div>

    ))}

   </div>

  </div>

 );

};

export default AdminMessages;