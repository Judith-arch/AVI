import "./Map.css";
import StoreCard from "../../components/StoreCard/StoreCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";
import { useState } from "react";
import OffersNearYou from "../../sections/OffersNearYou/OfferNearYou";


export default function Map() {

    const storeReviews = [
        { text: "Excelente atención y productos de calidad.", author: "Marta G." },
        { text: "Servicio rápido y amable. Muy recomendable.", author: "Daniel R." },
        { text: "Productos frescos de verdad, volveré.", author: "Laura S." }
    ];

    const stores = [

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Central",
            subtitle: "La tienda mejor valorada de la zona.",
            rating: "4.8/5",
            reviews: storeReviews,
            address: "Calle Mayor 123, Madrid",
            hours: "09:00 - 20:00",
            phone: "912 345 678",
            tags: ["Frescura", "Premium", "Atención", "Top Seller", "Local"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },

            {
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            name: "Tienda Norte",
            subtitle: "Especializada en productos locales.",
            rating: "4.7/5",
            reviews: storeReviews,
            address: "Calle Norte 22, Madrid",
            hours: "10:00 - 21:00",
            phone: "912 000 111",
            tags: ["Local", "Artesanal"]
            },
        ];

            const [page, setPage] = useState(0);
            const [fade, setFade] = useState(false);

            const ITEMS_PER_PAGE = 3;
            const totalPages = Math.ceil(stores.length / ITEMS_PER_PAGE);

            const startIndex = page * ITEMS_PER_PAGE;
            const visibleStores = stores.slice(startIndex, startIndex + ITEMS_PER_PAGE);

            const nextPage = () => {
                setFade(true);
                setTimeout(() => {
                    setPage((prev) => (prev + 1) % totalPages);
                    setFade(false);
                }, 300);
            };

            const prevPage = () => {
                setFade(true);
                setTimeout(() => {
                    setPage((prev) => (prev - 1 + totalPages) % totalPages);
                    setFade(false);
                }, 300);
            };

            
    return (
        <div className="map-layout">

            {/* COLUMNA IZQUIERDA */}
            <div className="map-content">

                
                <h1 className="map-title">Mapa de tiendas</h1>
                <p className="map-subtitle">Ubicación de las tiendas según tu ubicación</p>


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

                <h2 className="stores-title">Tiendas cercanas de tu ubicación:</h2>

                <div className={`stores-list ${fade ? "fade-out" : "fade-in"}`}>
                {visibleStores.map((store, index) => (
                    <StoreCard key={index} {...store} />
                ))}
                </div>

                <div className="pagination-controls">
                    <button onClick={prevPage}>◀ Anterior</button>
                    <button onClick={nextPage}>Siguiente ▶</button>
                </div>
                <OffersNearYou />
            </div>

            

            {/* COLUMNA DERECHA */}
            <div className="filters-panel-wrapper">
                <FiltersPanel />
                
            </div>

        </div>
    );
}
