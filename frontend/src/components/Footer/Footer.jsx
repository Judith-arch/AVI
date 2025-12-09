import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        {/* LOGO + DESCRIPCIÓN */}
        <div className="footer-section footer-brand">
          <h2 className="footer-logo">AVI</h2>
          <p className="footer-description">
            Tu marketplace de confianza para encontrar tiendas locales, productos frescos 
            y servicios cerca de ti.
          </p>
        </div>

        {/* ENLACES */}
        <div className="footer-section">
          <h3 className="footer-title">Enlaces</h3>
          <ul className="footer-links">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Tiendas</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        {/* INFORMACIÓN */}
        <div className="footer-section">
          <h3 className="footer-title">Información</h3>
          <ul className="footer-links">
            <li><a href="#">Ayuda</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Política de cookies</a></li>
          </ul>
        </div>

        {/* REDES SOCIALES */}
        <div className="footer-section">
          <h3 className="footer-title">Síguenos</h3>
          <div className="footer-socials">
            <a href="#">🐦</a>
            <a href="#">📘</a>
            <a href="#">📸</a>
            <a href="#">▶️</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} AVI — Todos los derechos reservados.
      </div>

    </footer>
  );
}
