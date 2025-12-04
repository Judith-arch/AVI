import "./Map.css";
import StoreCard from "../../components/StoreCard/StoreCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";


export default function Map() {

    const storeReviews = [
        { text: "Excelente atención y productos de calidad.", author: "Marta G." },
        { text: "Servicio rápido y amable. Muy recomendable.", author: "Daniel R." },
        { text: "Productos frescos de verdad, volveré.", author: "Laura S." }
    ];

    return (
        <div className="map-layout">

            {/* COLUMNA IZQUIERDA */}
            <div className="map-content">

                
                <h1 className="map-title">Tiendas Mejor Valoradas</h1>
                <p className="map-subtitle">Estas son algunas de las tiendas con mejores opiniones.</p>


                <SearchBar />
                <div className="map-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=..."
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy"
                    />
                </div>

                <div className="stores-list">
                    <StoreCard
                        logo="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                        name="Tienda Central"
                        subtitle="La tienda mejor valorada de la zona."
                        rating="4.8/5"
                        reviews={storeReviews}
                        address="Calle Mayor 123, Madrid"
                        hours="09:00 - 20:00"
                        phone="912 345 678"
                        tags={["Frescura", "Premium", "Atención", "Top Seller", "Local"]}
                    />

                    <StoreCard
                        logo="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                        name="Tienda Central"
                        subtitle="La tienda mejor valorada de la zona."
                        rating="4.8/5"
                        reviews={storeReviews}
                        address="Calle Mayor 123, Madrid"
                        hours="09:00 - 20:00"
                        phone="912 345 678"
                        tags={["Frescura", "Premium", "Atención", "Top Seller", "Local"]}
                    />

                    <StoreCard
                        logo="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                        name="Tienda Central"
                        subtitle="La tienda mejor valorada de la zona."
                        rating="4.8/5"
                        reviews={storeReviews}
                        address="Calle Mayor 123, Madrid"
                        hours="09:00 - 20:00"
                        phone="912 345 678"
                        tags={["Frescura", "Premium", "Atención", "Top Seller", "Local"]}
                    />
                </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="filters-panel-wrapper">
                <FiltersPanel />
                
            </div>

        </div>
    );
}
