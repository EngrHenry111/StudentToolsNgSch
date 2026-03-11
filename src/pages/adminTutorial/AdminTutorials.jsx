import { useEffect,useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import "./adminTutrials.css"

const AdminTutorials = () => {

 const [tutorials,setTutorials] = useState([]);

 useEffect(()=>{

  fetchTutorials();

 },[]);

 const fetchTutorials = async ()=>{

  const res = await API.get("/tutorials");

  setTutorials(res.data.tutorials || res.data);

 };

 const deleteTutorial = async (id)=>{

  if(!window.confirm("Delete tutorial?")) return;

  await API.delete(`/tutorials/${id}`);

  fetchTutorials();

 };

 return(

  <div className="admin-tutorials-container">

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