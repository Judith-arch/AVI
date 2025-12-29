import { Link } from "react-router-dom";
import "./Head.css";

export default function Head() {
  return (
    <header className="header">
      <nav className="nav">

        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/Products">Products</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/map">Mapa</Link></li>
        </ul>

        {/* LOGO + FLECHA SUPERPUESTA */}
        <div className="logo-wrapper">

          <svg
            className="header-arrow"
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 20 H82 L82 17 L96 25 L82 33 L82 30 H0 Z"
              fill="rgba(255,255,255,0.35)"
            />
          </svg>

          <h1 className="logo">AVI</h1>

        </div>

      </nav>
    </header>
  );
}