import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./adimedit.css"

const EditTutorial = () => {

 const { id } = useParams();
 const navigate = useNavigate();

 const [form, setForm] = useState({
  title: "",
  content: "",
  category: "",
  topic: "",
  excerpt: "",
  image: "",
  tags: [],
  status: "draft"
 });

 const [loading, setLoading] = useState(true);

 // =========================
 // FETCH TUTORIAL
 // =========================
 useEffect(() => {
  if (id) fetchTutorial();
 }, [id]);

 const fetchTutorial = async () => {
  try {
   const res = await API.get(`/tutorials/${id}`);

   if (!res.data) {
 alert("Tutorial not found");
 navigate("/admin/tutorials"); // 👈 redirect instead of crash
 return;
}

   // ✅ SAFE SET FORM
   setForm({
    title: res.data.title || "",
    content: res.data.content || "",
    category: res.data.category || "",
    topic: res.data.topic || "",
    excerpt: res.data.excerpt || "",
    image: res.data.image || "",
    tags: res.data.tags || [],
    status: res.data.status || "draft",
    _id: res.data._id
   });

   setLoading(false);

  } catch (error) {
   console.log(error);
   alert("Error loading tutorial");
  }
 };

 // =========================
 // SUBMIT UPDATE
 // =========================
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   await API.put(`/tutorials/${id}`, form);

   alert("Tutorial updated successfully");

   navigate("/admin/tutorials");

  } catch (error) {
   console.log(error);
   alert("Update failed");
  }
 };

 // =========================
 // LOADING STATE
 // =========================
 if (loading) return <p>Loading tutorial...</p>;

 return (
  <div className="admin-container">

   <h1>Edit Tutorial</h1>

   <form onSubmit={handleSubmit}>

    {/* TITLE */}
    <input
     placeholder="Title"
     value={form.title}
     onChange={(e) =>
      setForm({ ...form, title: e.target.value })
     }
    />

    {/* CATEGORY */}
    <select
     value={form.category}
     onChange={(e) =>
      setForm({ ...form, category: e.target.value, topic: "" })
     }
    >
     <option value="">Select Subject</option>
     <option value="physics">Physics</option>
     <option value="mathematics">Mathematics</option>
     <option value="chemistry">Chemistry</option>
     <option value="biology">Biology</option>
     <option value="programming">Programming</option>
    </select>

    {/* TOPIC */}
    {form.category && (
     <select
      value={form.topic}
      onChange={(e) =>
       setForm({ ...form, topic: e.target.value })
      }
     >
      <option value="">Select Topic</option>

      {form.category === "physics" && (
       <>
        <option value="mechanics">Mechanics</option>
        <option value="electricity">Electricity</option>
        <option value="waves">Waves</option>
       </>
      )}

      {form.category === "mathematics" && (
       <>
        <option value="algebra">Algebra</option>
        <option value="calculus">Calculus</option>
        <option value="statistics">Statistics</option>
       </>
      )}

      {form.category === "programming" && (
       <>
        <option value="javascript">JavaScript</option>
        <option value="react">React</option>
        <option value="nodejs">Node.js</option>
       </>
      )}
     </select>
    )}

    {/* IMAGE */}
    <input
     placeholder="Image URL (optional)"
     value={form.image}
     onChange={(e) =>
      setForm({ ...form, image: e.target.value })
     }
    />

    {/* TAGS */}
    <input
     placeholder="Tags (comma separated)"
     value={form.tags.join(",")}
     onChange={(e) =>
      setForm({
       ...form,
       tags: e.target.value.split(",").map(tag => tag.trim())
      })
     }
    />

    {/* EXCERPT */}
    <textarea
     placeholder="Short excerpt"
     value={form.excerpt}
     onChange={(e) =>
      setForm({ ...form, excerpt: e.target.value })
     }
    />

    {/* CONTENT */}
    <ReactQuill
     value={form.content}
     onChange={(val) =>
      setForm({ ...form, content: val })
     }
    />

    {/* STATUS */}
    <select
     value={form.status}
     onChange={(e) =>
      setForm({ ...form, status: e.target.value })
     }
    >
     <option value="draft">Draft</option>
     <option value="published">Published</option>
    </select>

    {/* ACTIONS */}
    <div style={{ marginTop: "10px" }}>

     <button
      type="button"
      onClick={() =>
       window.open(`/tutorial-preview/${form._id}`, "_blank")
      }
     >
      Preview
     </button>

     <button type="submit">
      Save Changes
     </button>

    </div>

   </form>

  </div>
 );
};

export default EditTutorial;