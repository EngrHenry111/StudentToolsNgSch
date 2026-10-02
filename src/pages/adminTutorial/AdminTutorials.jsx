import { useEffect,useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import { tutorialCategoryList } from "../../utils/tutorialCategories";
import "./adminTutrials.css"

// Legacy rows were saved before `status` existed — treat them as drafts.
const statusOf = (t) => t.status === "published" ? "published" : "draft";

const FILTERS = [
 { key:"all", label:"All" },
 { key:"draft", label:"Drafts" },
 { key:"published", label:"Published" }
];

const AdminTutorials = () => {

 const [tutorials,setTutorials] = useState([]);
 const [filter,setFilter] = useState("draft");
 const [busyId,setBusyId] = useState(null);

 useEffect(()=>{

  fetchTutorials();

 },[]);

 const fetchTutorials = async ()=>{

  const res = await API.get("/tutorials/admin/list");

  setTutorials(res.data.tutorials || res.data);

 };

 const setStatus = async (t, status)=>{

  // The public site only routes the five taxonomy categories, so a
  // published tutorial outside them would be unreachable.
  if(status === "published" && !tutorialCategoryList.includes(t.category)){
   alert(`"${t.title}" has category "${t.category || "none"}", which isn't one of: ${tutorialCategoryList.join(", ")}.\n\nEdit it and pick a category before publishing.`);
   return;
  }

  const verb = status === "published" ? "Publish" : "Move to draft";
  if(!window.confirm(`${verb}: "${t.title}"?`)) return;

  setBusyId(t._id);
  try{
   await API.put(`/tutorials/${t._id}`, { status });
   setTutorials(list => list.map(x => x._id === t._id ? { ...x, status } : x));
  }catch(err){
   alert(err?.response?.data?.message || `${verb} failed`);
  }finally{
   setBusyId(null);
  }

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

 const counts = {
  all: tutorials.length,
  draft: tutorials.filter(t => statusOf(t) === "draft").length,
  published: tutorials.filter(t => statusOf(t) === "published").length
 };

 const visible = filter === "all"
  ? tutorials
  : tutorials.filter(t => statusOf(t) === filter);

 return(

  <div className="admin-tuto">

   <h1>Manage Tutorials</h1>

   <div className="status-filters">
    {FILTERS.map(f => (
     <button
      key={f.key}
      className={`status-filter ${filter === f.key ? "active" : ""}`}
      onClick={()=>setFilter(f.key)}
     >
      {f.label} <span className="count">{counts[f.key]}</span>
     </button>
    ))}
   </div>

   <div className="table-wrapper">

   <table className="tutorial-table">

    <thead>

     <tr>
      <th>Title</th>
      <th>Category</th>
      <th>Status</th>
      <th>Actions</th>
     </tr>

    </thead>

    <tbody>

     {visible.length === 0 && (
      <tr>
       <td colSpan={4} className="empty-row">No tutorials here.</td>
      </tr>
     )}

     {visible.map((t)=>{

      const status = statusOf(t);
      const busy = busyId === t._id;

      return(

      <tr key={t._id}>

       <td>{t.title}</td>

       <td>{t.category}</td>

       <td>
        <span className={`status-badge ${status}`}>
         {status === "published" ? "Published" : "Draft"}
        </span>
       </td>

       <td className="actions">

        {status === "draft" ? (
         <button
          onClick={()=>setStatus(t, "published")}
          className="publish-btn"
          disabled={busy}
         >
          {busy ? "Publishing…" : "Publish"}
         </button>
        ) : (
         <button
          onClick={()=>setStatus(t, "draft")}
          className="draft-btn"
          disabled={busy}
         >
          {busy ? "Saving…" : "Unpublish"}
         </button>
        )}

        <Link to={`/admin/tutorial-preview/${t._id}`} className="preview-btn">
         Preview
        </Link>

        <Link to={`/admin/edit/${t._id}`} className="edit-btn">
         Edit
        </Link>

        <button
         onClick={()=>deleteTutorial(t._id)}
         className="delete-btn"
         disabled={busy}
        >
         Delete
        </button>

       </td>

      </tr>

      );

     })}

    </tbody>

   </table>

   </div>

  </div>

 );

};

export default AdminTutorials;
