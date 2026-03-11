/*
ToolCard component
Used to display each academic tool on the homepage.
Each card links to a specific calculator page.
*/

import { Link } from "react-router-dom";
import "./toolCard.css";

const ToolCard = ({ title, description, link }) => {
  return (
    <Link to={link} className="tool-card">

      <h3>{title}</h3>

      <p>{description}</p>

    </Link>
  );
};

export default ToolCard;