import "./footer.css";
import { Link } from "react-router-dom";
import {
 FaFacebook,
 FaTwitter,
 FaInstagram,
 FaTiktok,
 FaWhatsapp,
 FaLinkedin
} from "react-icons/fa";

const Footer = () => {

 return (

  <footer className="footer">

   <div className="footer-container">

    {/* Website info */}

    <div className="footer-info">

     <h3>StudentToolsNG</h3>

     <p>Academic Tools for Nigerian Students</p>

    </div>

    {/* Social Media */}

    <div className="footer-social">

     <a
      href="https://facebook.com/Engrhenrytech"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
     >
      <FaFacebook />
     </a>

     <a
      href="https://twitter.com/EngrHenryTech"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
     >
      <FaTwitter />
     </a>

     <a
      href="https://instagram.com/engrhenrytech1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
     >
      <FaInstagram />
     </a>

     <a
      href="https://tiktok.com/@engrhenrytech11"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="TikTok"
     >
      <FaTiktok />
     </a>

     {/* WhatsApp direct chat */}

     <a
      href="https://wa.me/09028361165"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
     >
      <FaWhatsapp />
     </a>

     <a
      href="https://linkedin.com/in/engrhenrytech"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
     >
      <FaLinkedin />
     </a>

    </div>

    {/* Policy Links */}

    <div className="policy-tutorials">

     <Link to="/about">
      About
     </Link>
     
     <Link to="/privacy-policy">
      Privacy Policy
     </Link>

     <Link to="/tutorials">
      Tutorials
     </Link>

     <Link to="/contact">
      Contact
     </Link>
     <Link to="/terms">
      Conditions
     </Link>

    </div>

    {/* Copyright */}

    <div className="footer-bottom">

     © {new Date().getFullYear()} StudentToolsNG
     <div>EngrHenryTech</div>

    </div>

   </div>

  </footer>

 );

};

export default Footer;