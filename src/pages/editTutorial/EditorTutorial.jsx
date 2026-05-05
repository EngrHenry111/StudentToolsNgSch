import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editorTutorial.css";

const EditTutorial = () => {

 const { id } = useParams();
 const navigate = useNavigate();

 const [loading, setLoading] = useState(true);

 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [category, setCategory] = useState("");
 const [topic, setTopic] = useState("");
 const [excerpt, setExcerpt] = useState("");
 const [tags, setTags] = useState("");
 const [image, setImage] = useState("");
 const [status, setStatus] = useState("draft");

 // FETCH
 useEffect(() => {
  if (id) fetchTutorial();
 }, [id]);

 const fetchTutorial = async () => {
  try {

   const res = await API.get(`/tutorials/${id}`);

   if (!res.data) {
    alert("Tutorial not found");
    return;
   }

   const t = res.data;

   setTitle(t.title || "");
   setContent(t.content || "");
   setCategory(t.category || "");
   setTopic(t.topic || "");
   setExcerpt(t.excerpt || "");
   setImage(t.image || "");
   setStatus(t.status || "draft");

   // convert array → string
   setTags(Array.isArray(t.tags) ? t.tags.join(", ") : "");

   setLoading(false);

  } catch (err) {
   console.log(err);
   alert("Error loading tutorial");
  }
 };

 // UPDATE
 const updateTutorial = async (e) => {
  e.preventDefault();

  try {

   await API.put(`/tutorials/${id}`, {
    title,
    content,
    category,
    topic,
    excerpt,
    image,
    status,
    tags: tags.split(",").map(tag => tag.trim())
   });

   alert("Tutorial updated successfully");

   navigate("/admin/tutorials");

  } catch (err) {
   console.log(err);
   alert("Update failed");
  }
 };

 if (loading) return <p>Loading...</p>;

 return (
  <div className="edit-tutorial-container">

   <h1>Edit Tutorial</h1>

   <form onSubmit={updateTutorial}>

    {/* TITLE */}
    <input
     value={title}
     onChange={(e) => setTitle(e.target.value)}
     placeholder="Tutorial Title"
    />

    {/* CATEGORY */}
    <select
     value={category}
     onChange={(e) => setCategory(e.target.value)}
    >
     <option value="">Select Subject</option>
     <option value="physics">Physics</option>
     <option value="mathematics">Mathematics</option>
     <option value="chemistry">Chemistry</option>
     <option value="biology">Biology</option>
     <option value="programming">Programming</option>
    </select>

    {/* TOPIC (FREE INPUT - IMPORTANT FIX) */}
    <input
     value={topic}
     onChange={(e) => setTopic(e.target.value)}
     placeholder="Topic (e.g. cell-structure)"
    />

    {/* IMAGE */}
    <input
     value={image}
     onChange={(e) => setImage(e.target.value)}
     placeholder="Image URL (optional)"
    />

    {/* TAGS */}
    <input
     value={tags}
     onChange={(e) => setTags(e.target.value)}
     placeholder="Tags (comma separated)"
    />

    {/* EXCERPT */}
    <textarea
     value={excerpt}
     onChange={(e) => setExcerpt(e.target.value)}
     placeholder="Short excerpt"
    />

    {/* STATUS */}
    <select
     value={status}
     onChange={(e) => setStatus(e.target.value)}
    >
     <option value="draft">Draft</option>
     <option value="published">Publish</option>
    </select>

    {/* CONTENT EDITOR */}
    <ReactQuill
     value={content}
     onChange={setContent}
     theme="snow"
    />

    <button type="submit">
     Update Tutorial
    </button>

   </form>

  </div>
 );
};

export default EditTutorial;