import { Link } from "react-router-dom"
import './Head.css'

function Head() {
    return (
        <header className="header">
            <h1 className="title">Bienvenidos</h1>

            <nav>
                <ul className="link-list">
                    <li><Link className="link" to="/">Home</Link></li>
                    <li><Link className="link" to="/blog">Nosotros</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Head
