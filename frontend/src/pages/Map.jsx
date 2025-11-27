import "./Map.css";

export default function Map() {

    const tiendasTop = [
        {
            nombre: "Tienda Central",
            descripcion: "La tienda mejor valorada de la zona.",
            puntuacion: 4.8,
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            direccion: "Calle Mayor 123, Madrid",
            horario: "09:00 - 20:00",
            telefono: "912 345 678",
            tags: ["Frescura", "Premium", "Atención", "Top Seller", "Local"],
            enlace: "#"
        },
        {
            nombre: "Mercado Norte",
            descripcion: "Productos frescos y atención excelente.",
            puntuacion: 4.6,
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            direccion: "Avenida Norte 45, Madrid",
            horario: "08:00 - 21:00",
            telefono: "911 222 333",
            tags: ["Fruta", "Verdura", "Ofertas", "Popular", "Rápido"],
            enlace: "#"
        },
        {
            nombre: "Super Sur",
            descripcion: "Gran variedad y buenos precios.",
            puntuacion: 4.4,
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/IconoSuper.png",
            direccion: "Plaza Sur 9, Madrid",
            horario: "10:00 - 22:00",
            telefono: "913 111 777",
            tags: ["Económico", "Variedad", "Comodidad", "Familiar", "Top Value"],
            enlace: "#"
        }
    ];

    return (
        <div className="map-page">

            <h1 className="map-title">Nuestra Ubicación</h1>
            <p className="map-subtitle">Aquí puedes ver dónde estamos ubicados.</p>

            <div className="map-container">
                <iframe
                    title="Mapa"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24313.307975218786!2d-3.7037902!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6dee0f3ad0b71f%3A0x971d2b9e6eb3be42!2sMadrid!5e0!3m2!1ses!2ses!4v1732111700000!5m2!1ses!2ses"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

            {/* NUEVA SECCIÓN DE TIENDAS CON LOGOS + TAGS */}
            <div className="top-shops-section">
                <h2 className="section-title">Tiendas Mejor Valoradas</h2>
                <p className="section-description">Estas son algunas de las tiendas con mejores opiniones.</p>

                <div className="shops-grid">
                    {tiendasTop.map((tienda, index) => (
                        <div key={index} className="shop-card">

                            <div className="shop-card-top">

                                    {/* IZQUIERDA: LOGO */}
                                    <div className="shop-left">
                                        <img src={tienda.logo} alt="" className="shop-logo" />
                                    </div>

                                    {/* CENTRO: NOMBRE + DESCRIPCIÓN */}
                                    <div className="shop-center">
                                        <h3 className="shop-name">{tienda.nombre}</h3>
                                        <p className="shop-description">{tienda.descripcion}</p>

                                    {/* RATING Y BOTÓN */}
                                        <div className="shop-bottom-left">
                                            <p className="shop-rating">⭐ {tienda.puntuacion}/5</p>
                                            <a href={tienda.enlace} className="shop-button">Ver tienda</a>
                                        </div>
                                    </div>

                                    {/* DERECHA: DETALLES */}
                                    <div className="shop-right">
                                        <div className="shop-details">
                                            <p><strong>📍 Dirección:</strong> {tienda.direccion}</p>
                                            <p><strong>🕒 Horario:</strong> {tienda.horario}</p>
                                            <p><strong>📞 Teléfono:</strong> {tienda.telefono}</p>
                                        </div>

                                        {/* TAGS */}
                                        <div className="shop-tags">
                                            {tienda.tags.map((tag, i) => (
                                                <span key={i} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    );
}
