import authorImg from "../assets/images/Focused coder at work.png" 
import "./authorCard.css";
import { Link } from "react-router-dom";
const AuthorCard = () => {

 return(

 <div className="author-card">

 <img
 src={authorImg}
 alt="Henry Akpan"
 className="author-image"
 />

 <div>

<Link to="/author">
 <h3>Engr. Henry Akpan</h3>

</Link>

 <p>
 Electrical and Electronics Engineer, Full-Stack Web Developer and Mathematics & Physics Tutor.
 Founder of StudentToolsNG.
 </p>

 </div>

 </div>

 );

};

export default AuthorCard;