/*
Admin page to create tutorials
Uploads tutorial directly from React
*/

import { useState } from "react";
import API from "../../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createTutorial.css";

const CreateTutorial = () => {

 const [title,setTitle] = useState("");
 const [content,setContent] = useState("");
 const [category,setCategory] = useState("");
 const [excerpt,setExcerpt] = useState("");

 const handleSubmit = async (e)=>{

  e.preventDefault();

  try{

   const res = await API.post("/tutorials",{
 title,
 content,
 category,
 excerpt
});

   alert("Tutorial created successfully");

   setTitle("");
   setContent("");
   setCategory("");

  }catch(err){

   console.log(err);

  }

 };

 return(

  <div className="admin-container">

   <h1>Create Tutorial</h1>

   <form onSubmit={handleSubmit}>

    <input
     placeholder="Tutorial Title"
     value={title}
     onChange={(e)=>setTitle(e.target.value)}
    />

    <input
     placeholder="Category"
     value={category}
     onChange={(e)=>setCategory(e.target.value)}
    />
        <textarea
        placeholder="Tutorial Content"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        />

        <input
    placeholder="Short excerpt"
    value={excerpt}
    onChange={(e)=>setExcerpt(e.target.value)}
    />

    <button type="submit">
     Publish Tutorial
    </button>

   </form>

  </div>

 );

};

export default CreateTutorial;