import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import "./editorTutorial.css";

const EditTutorial = () => {

 const {id} = useParams();

 const [title,setTitle] = useState("");
 const [content,setContent] = useState("");

 useEffect(()=>{

  fetchTutorial();

 },[]);

 const fetchTutorial = async ()=>{

  const res = await API.get(`/tutorials/${id}`);

  setTitle(res.data.title);
  setContent(res.data.content);

 };

 const updateTutorial = async ()=>{

  await API.put(`/tutorials/${id}`,{
   title,
   content
  });

  alert("Tutorial updated");

 };

 return(

  <div className="edit-tutorial-container">

   <h1>Edit Tutorial</h1>

   <input
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    placeholder="Tutorial Title"
   />

   <textarea
    value={content}
    onChange={(e)=>setContent(e.target.value)}
    placeholder="Tutorial Content"
   />

   <button onClick={updateTutorial}>
    Update Tutorial
   </button>

  </div>

 );

};

export default EditTutorial;