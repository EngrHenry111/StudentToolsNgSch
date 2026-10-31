import authorImg from "../assets/images/author-card.webp";
import "./authorCard.css";
import { Link } from "react-router-dom";
const AuthorCard = () => {

 return(

 <div className="author-card">

 <img
 src={authorImg}
 alt="Engr. Henry Akpan"
 className="author-image"
 width="90"
 height="90"
 loading="lazy"
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