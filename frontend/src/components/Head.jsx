import { Link } from "react-router-dom";
import "./Head.css";

export default function Head() {
    return (
        <header className="header">
        <nav className="nav">
            <h2 className="logo">Mi Web</h2>

            <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/Products">Products</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/map">Mapa</Link></li>
            </ul>
        </nav>
        </header>
    );
}
