import "./Map.css";
import { useState, useEffect } from "react";

function ReviewCarousel({ reviews }) {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const next = () => {
        setFade(true);
        setTimeout(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
            setFade(false);
        }, 250);
    };

    const prev = () => {
        setFade(true);
        setTimeout(() => {
            setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
            setFade(false);
        }, 250);
    };

    return (
        <div className="carousel-container">

            {/* RESEÑA ACTUAL */}
            <div className={`carousel-review ${fade ? "fade-out" : "fade-in"}`}>
                <div className="carousel-stars">⭐⭐⭐⭐⭐</div>
                <p className="carousel-text">"{reviews[index].text}"</p>
                <small className="carousel-author">- {reviews[index].author}</small>
            </div>

            {/* CONTROLES */}
            <div className="carousel-controls">
                <button className="carousel-btn" onClick={prev}>◀</button>

                <div className="carousel-dots">
                    {reviews.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === index ? "active" : ""}`}
                        ></span>
                    ))}
                </div>

                <button className="carousel-btn" onClick={next}>▶</button>
            </div>

        </div>
    );
}

export default function Map() {
    return (
        <div className="map-page">

            <h1 className="map-title">Tiendas Mejor Valoradas</h1>
            <p className="map-subtitle">Estas son algunas de las tiendas con mejores opiniones.</p>

            {/* MAPA */}
            <div className="map-container">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29933.410002730193!2d-3.7169938!3d40.4236524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422881a7be3c0f%3A0x5b45c36c1ebd672a!2sCentro%20de%20Madrid%2C%20España!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"  
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>

            </div>

            {/* ===================== TARJETAS ===================== */}
            <div className="stores-list">

                {/* -------- TIENDA 1 -------- */}
                <div className="store-card">

                    {/* IZQUIERDA */}
                    <div className="store-column-left">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                            className="store-logo"
                        />

                        <div className="store-left-info">

                            {/* RATING + BOTÓN A LA DERECHA DEL LOGO */}

                              {/* NOMBRE + SUBTÍTULO DEBAJO */}
                            <h2 className="store-name">Tienda Central</h2>
                            <p className="store-subtitle">La tienda mejor valorada de la zona.</p>
                            <div className="store-top-inline">
                                <div className="store-rating-inline">
                                    ⭐ <span>4.8/5</span>
                                </div>

                                <button className="store-button-inline">Ver tienda</button>
                            </div>

                        </div>
                    </div>

                    {/* CENTRO: CARRUSEL */}
                    <div className="store-column-center">
                        <ReviewCarousel
                            reviews={[
                                { text: "Excelente atención y productos de calidad.", author: "Marta G." },
                                { text: "Servicio rápido y amable. Muy recomendable.", author: "Daniel R." },
                                { text: "Productos frescos de verdad, volveré.", author: "Laura S." }
                            ]}
                        />
                    </div>

                    {/* DERECHA */}
                    <div className="store-column-right">
                        <div className="store-details">
                            <p><b>📍 Dirección:</b> Calle Mayor 123, Madrid</p>
                            <p><b>⏰ Horario:</b> 09:00 - 20:00</p>
                            <p><b>📞 Teléfono:</b> 912 345 678</p>
                        </div>

                        <div className="tag-list">
                            <span className="tag">Frescura</span>
                            <span className="tag">Premium</span>
                            <span className="tag">Atención</span>
                            <span className="tag">Top Seller</span>
                            <span className="tag">Local</span>
                        </div>
                    </div>
                </div>
            </div>

                {/* -------- TIENDA 3 -------- */}
            <div className="store-card">
                {/* IZQUIERDA */}   
                <div className="store-column-left">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                        className="store-logo"
                    />

                    <h2 className="store-name">Tienda Central</h2>
                    <p className="store-description">La tienda mejor valorada de la zona.</p>

                    <div className="store-rating-inline">
                        ⭐<span>4.8/5</span>
                    </div>

                    <button className="store-button">Ver tienda</button>
                </div>

                {/* CENTRO: CARRUSEL */}
                <div className="store-column-center">
                    <ReviewCarousel
                        reviews={[
                            { text: "Excelente atención y productos de calidad.", author: "Marta G." },
                            { text: "Servicio rápido y amable. Muy recomendable.", author: "Daniel R." },
                            { text: "Productos frescos de verdad, volveré.", author: "Laura S." }
                        ]}
                    />
                </div>

                {/* DERECHA */}
                <div className="store-column-right">
                    <div className="store-details">
                        <p><b>📍 Dirección:</b> Calle Mayor 123, Madrid</p>
                        <p><b>⏰ Horario:</b> 09:00 - 20:00</p>
                        <p><b>📞 Teléfono:</b> 912 345 678</p>
                    </div>

                    <div className="tag-list">
                        <span className="tag">Frescura</span>
                        <span className="tag">Premium</span>
                        <span className="tag">Atención</span>
                        <span className="tag">Top Seller</span>
                        <span className="tag">Local</span>
                    </div>
                </div>

            </div> 
                 <div className="store-card">
                {/* IZQUIERDA */}
                <div className="store-column-left">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                        className="store-logo"
                    />

                    <h2 className="store-name">Tienda Central</h2>
                    <p className="store-description">La tienda mejor valorada de la zona.</p>

                    <div className="store-rating-inline">
                        ⭐<span>4.8/5</span>
                    </div>

                    <button className="store-button">Ver tienda</button>
                </div>

                {/* CENTRO: CARRUSEL */}
                <div className="store-column-center">
                    <ReviewCarousel
                        reviews={[
                            { text: "Excelente atención y productos de calidad.", author: "Marta G." },
                            { text: "Servicio rápido y amable. Muy recomendable.", author: "Daniel R." },
                            { text: "Productos frescos de verdad, volveré.", author: "Laura S." }
                        ]}
                    />
                </div>

                {/* DERECHA */}
                <div className="store-column-right">
                    <div className="store-details">
                        <p><b>📍 Dirección:</b> Calle Mayor 123, Madrid</p>
                        <p><b>⏰ Horario:</b> 09:00 - 20:00</p>
                        <p><b>📞 Teléfono:</b> 912 345 678</p>
                    </div>

                    <div className="tag-list">
                        <span className="tag">Frescura</span>
                        <span className="tag">Premium</span>
                        <span className="tag">Atención</span>
                        <span className="tag">Top Seller</span>
                        <span className="tag">Local</span>
                    </div>
                </div>
            </div>  
        </div>
    );
}
