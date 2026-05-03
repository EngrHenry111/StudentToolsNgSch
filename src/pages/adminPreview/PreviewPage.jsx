import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const PreviewPage = () => {

 const { id } = useParams();
 const [tutorial, setTutorial] = useState(null);

 useEffect(() => {
  fetchTutorial();
 }, []);

 const fetchTutorial = async () => {
  try {
   const res = await API.get(`/tutorials/preview/${id}`);
   setTutorial(res.data);
  } catch (err) {
   console.log(err);
  }
 };

 if (!tutorial) return <p>Loading preview...</p>;

 return (
  <div style={{ padding: "20px" }}>

   <h1>{tutorial.title}</h1>

   <p><strong>Category:</strong> {tutorial.category}</p>
   <p><strong>Topic:</strong> {tutorial.topic}</p>

   <div
    dangerouslySetInnerHTML={{ __html: tutorial.content }}
   />

  </div>
 );
};

export default PreviewPage;