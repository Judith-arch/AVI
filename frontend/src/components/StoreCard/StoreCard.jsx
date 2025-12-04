import ReviewCarousel from "../ReviewCarousel/ReviewCarousel";
import "./StoreCard.css";

export default function StoreCard({ 
    logo, 
    name, 
    subtitle, 
    rating, 
    reviews, 
    address, 
    hours, 
    phone, 
    tags 
}) {

    return (
        <div className="store-card">

            {/* IZQUIERDA */}
            <div className="store-column-left">
                <img 
                    src={logo}
                    className="store-logo"
                />

                <div className="store-left-info">
                    <h2 className="store-name">{name}</h2>
                    {subtitle && <p className="store-subtitle">{subtitle}</p>}

                    <div className="store-top-inline">
                        <div className="store-rating-inline">
                            ⭐ <span>{rating}</span>
                        </div>

                        <button className="store-button-inline">Ver tienda</button>
                    </div>
                </div>
            </div>

            {/* CENTRO: CARRUSEL */}
            <div className="store-column-center">
                <ReviewCarousel reviews={reviews} />
            </div>

            {/* DERECHA */}
            <div className="store-column-right">
                <div className="store-details">
                    <p><b>📍 Dirección:</b> {address}</p>
                    <p><b>⏰ Horario:</b> {hours}</p>
                    <p><b>📞 Teléfono:</b> {phone}</p>
                </div>

                <div className="tag-list">
                    {tags?.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                    ))}
                </div>
            </div>

        </div>
    );
}
