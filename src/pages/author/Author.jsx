import { Helmet } from "react-helmet";
import authorImg from "../../assets/images/Focused coder at work.png"
import "./author.css";

const Author = () => {

 return(

 <div className="author-page">

 <Helmet>

 <title>Engr. Henry Akpan | Author | StudentToolsNG</title>

 <meta
 name="description"
 content="Engr. Henry Akpan is the founder of StudentToolsNG and a Full-Stack Web Developer helping students with academic tools and tutorials."
 />

 <link
    rel="canonical"
    href="https://studenttoolsng.com/author"
  />


 </Helmet>

 <img src={authorImg} alt="Henry Akpan" className="author-photo"/>

 <h1>Engr. Henry Akpan</h1>

 <p>

 Electrical and Electronics Engineer, Full-Stack Web Developer and Mathematics & Physics Tutor.
 Founder of StudentToolsNG.

 </p>

 <p>

 Passionate about building technology solutions that help students succeed academically.

 </p>

 </div>

 );

};

export default Author;