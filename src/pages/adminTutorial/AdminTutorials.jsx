import { useEffect,useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import "./adminTutrials.css"

const AdminTutorials = () => {

 const [tutorials,setTutorials] = useState([]);
 const [stats, setStats] = useState({});

useEffect(()=>{
 fetchStats();
},[]);

const fetchStats = async ()=>{
 const res = await API.get("/admin/stats");
 setStats(res.data);
};

 useEffect(()=>{

  fetchTutorials();

 },[]);

 const fetchTutorials = async ()=>{

  const res = await API.get("/tutorials/admin/list");

  setTutorials(res.data.tutorials || res.data);

 };

 const deleteTutorial = async (id)=>{

  if(!window.confirm("Delete tutorial?")) return;

  // Google standard for removed pages: 301 to the replacement if there is
  // one (keeps its ranking), otherwise the URL answers 410 Gone.
  const redirectTo = window.prompt(
   "Redirect its old URL to which tutorial?\n\nEnter the slug of the tutorial that replaces it (e.g. newtons-laws-of-motion) or a page path (e.g. /cgpa-calculator).\nLeave empty if nothing replaces it.",
   ""
  );
  if(redirectTo === null) return;

  try{
   const q = redirectTo.trim() ? `?redirectTo=${encodeURIComponent(redirectTo.trim())}` : "";
   await API.delete(`/tutorials/${id}${q}`);
  }catch(err){
   alert(err?.response?.data?.message || "Delete failed");
   return;
  }

  fetchTutorials();

 };

 return(

  <div className="admin-tuto">

   <h1>Manage Tutorials</h1>

   <div className="table-wrapper">

   <table className="tutorial-table">

    <thead>

     <tr>
      <th>Title</th>
      <th>Category</th>
      <th>Actions</th>
     </tr>

    </thead>

    <tbody>

     {tutorials.map((t)=>(

      <tr key={t._id}>

       <td>{t.title}</td>

       <td>{t.category}</td>

       <td className="actions">

        <Link to={`/admin/edit/${t._id}`} className="edit-btn">
         Edit
        </Link>

        <button
         onClick={()=>deleteTutorial(t._id)}
         className="delete-btn"
        >
         Delete
        </button>

       </td>

      </tr>

     ))}

    </tbody>

   </table>

   </div>

  </div>

 );

};

export default AdminTutorials;