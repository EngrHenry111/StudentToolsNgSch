import { useState, useEffect } from "react";
import API from "../../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createTutorial.css";

const CreateTutorial = () => {

 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [category, setCategory] = useState("");
 const [topic, setTopic] = useState("");
 const [excerpt, setExcerpt] = useState("");
 const [tags, setTags] = useState("");
 const [image, setImage] = useState("");

 // ✅ NEW STATES
 const [previewMode, setPreviewMode] = useState(false);
 const [loading, setLoading] = useState(false);

 // ✅ LOAD DRAFT IF EXISTS
 useEffect(() => {
  const draft = JSON.parse(localStorage.getItem("tutorialDraft"));
  if (draft) {
   setTitle(draft.title || "");
   setContent(draft.content || "");
   setCategory(draft.category || "");
   setTopic(draft.topic || "");
   setExcerpt(draft.excerpt || "");
   setTags(draft.tags || "");
   setImage(draft.image || "");
  }
 }, []);

 // ✅ SAVE DRAFT
 const saveDraft = () => {
  const draftData = {
   title,
   content,
   category,
   topic,
   excerpt,
   tags,
   image
  };

  localStorage.setItem("tutorialDraft", JSON.stringify(draftData));
  alert("Draft saved");
 };

 // ✅ CLEAR DRAFT
 const clearDraft = () => {
  localStorage.removeItem("tutorialDraft");
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !content || !category || !topic) {
   alert("Please fill all required fields");
   return;
  }

  try {
   setLoading(true);

   await API.post("/tutorials", {
    title,
    content,
    category: category.toLowerCase(),
    topic: topic.toLowerCase(),
    excerpt,
    tags: tags.split(",").map(tag => tag.trim()),
    image
   });

   alert("Tutorial created successfully");

   // RESET
   setTitle("");
   setContent("");
   setCategory("");
   setTopic("");
   setExcerpt("");
   setTags("");
   setImage("");

   clearDraft();

  } catch (err) {
   console.log(err);
   alert("Error creating tutorial");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="admin-container">

   <h1>Create Tutorial</h1>

   {/* ✅ TOGGLE BUTTON */}
   <div className="editor-actions">
    <button onClick={() => setPreviewMode(!previewMode)}>
     {previewMode ? "Back to Editor" : "Preview"}
    </button>

    <button type="button" onClick={saveDraft}>
     Save Draft
    </button>
   </div>

   {!previewMode ? (

   <form onSubmit={handleSubmit}>

    {/* TITLE */}
    <input
     placeholder="Tutorial Title"
     value={title}
     onChange={(e) => setTitle(e.target.value)}
    />

    {/* CATEGORY */}
    <select
     value={category}
     onChange={(e) => {
      setCategory(e.target.value);
      setTopic("");
     }}
    >
     <option value="">Select Subject</option>
     <option value="physics">Physics</option>
     <option value="mathematics">Mathematics</option>
     <option value="chemistry">Chemistry</option>
     <option value="biology">Biology</option>
     <option value="programming">Programming</option>
    </select>

    {/* TOPIC */}
    {category && (
    //  <select
    //   value={topic}
    //   onChange={(e) => setTopic(e.target.value)}
    //  >
    //   <option value="">Select Topic</option>

    //   {category === "physics" && (
    //    <>
    //     <option value="mechanics">Mechanics</option>
    //     <option value="electricity">Electricity</option>
    //     <option value="waves">Waves</option>
    //    </>
    //   )}

    //   {category === "mathematics" && (
    //    <>
    //     <option value="algebra">Algebra</option>
    //     <option value="calculus">Calculus</option>
    //     <option value="statistics">Statistics</option>
    //    </>
    //   )}

    //   {category === "chemistry" && (
    //    <>
    //     <option value="organic">Organic Chemistry</option>
    //     <option value="inorganic">Inorganic Chemistry</option>
    //    </>
    //   )}

    //   {category === "biology" && (
    //    <>
    //     <option value="genetics">Genetics</option>
    //     <option value="ecology">Ecology</option>
    //    </>
    //   )}

    //   {category === "programming" && (
    //    <>
    //     <option value="javascript">JavaScript</option>
    //     <option value="react">React</option>
    //     <option value="nodejs">Node.js</option>
    //    </>
    //   )}

    //  </select>

    <input
    placeholder="Topic (e.g. mechanics, algebra, javascript)"
    value={topic}
    onChange={(e)=>setTopic(e.target.value.toLowerCase())}
    />
    
    )}

    {/* IMAGE */}
    <input
     placeholder="Image URL (optional)"
     value={image}
     onChange={(e) => setImage(e.target.value)}
    />

    {/* TAGS */}
    <input
     placeholder="Tags (comma separated)"
     value={tags}
     onChange={(e) => setTags(e.target.value)}
    />

    {/* EXCERPT */}
    <textarea
     placeholder="Short excerpt (SEO description)"
     value={excerpt}
     onChange={(e) => setExcerpt(e.target.value)}
    />

    {/* CONTENT */}
    <ReactQuill
     value={content}
     onChange={setContent}
     theme="snow"
    />

    <button type="submit" disabled={loading}>
     {loading ? "Publishing..." : "Publish Tutorial"}
    </button>

   </form>

   ) : (

   /* ✅ LIVE PREVIEW MODE */
   <div className="live-preview">

    <h1>{title || "Preview Title"}</h1>

    <p className="preview-category">
     {category} {topic && `> ${topic}`}
    </p>

    {image && (
     <img src={image} alt="preview" className="preview-image" />
    )}

    <p className="preview-excerpt">
     {excerpt || "No excerpt provided"}
    </p>

    <div
     dangerouslySetInnerHTML={{
      __html: content || "<p>Start writing to see preview...</p>"
     }}
    />

   </div>

   )}

  </div>
 );
};

export default CreateTutorial;