import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer glass-panel">
      <div>
        <div className="brand footer-brand">
          <span className="brand-mark"></span>
          <span>
            <strong>MART</strong>
            <small> SHOP MALL</small>
          </span>
        </div>
        <p>Modern shopping UI powered by the DummyJSON REST API.</p>
      </div>

      <div className="footer-links">
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/signin">Sign In</Link>
      </div>

      <div className="socials">
        <a href="https://github.com/Sreeramoff" target="_blank" rel="noreferrer"><Github size={18} /></a>
        <a href="https://www.linkedin.com/in/sree-ram-r-b298561b9/" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
        <a href="https://www.instagram.com/sreeram__official?stkn=MWc0YTgwMHNuNjNvYQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer"><Instagram size={18} /></a>
        <a href="mailto:rsree8773@gmail.com"><Mail size={18} /></a>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Shop Mart. Built with React.
      </div>
    </footer>
  );
}