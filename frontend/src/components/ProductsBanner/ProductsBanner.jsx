import { useState, useEffect, useRef } from "react";
import "./ProductsBanner.css";

export default function ProductsBanner() {
    const [banners, setBanners] = useState([
        { id: 1, text: "🔥 Oferta del día: -30% en frutas" },
        { id: 2, text: "🍞 Panadería fresca ¡recién horneada!" },
        { id: 3, text: "🥦 Productos eco y sostenibles" }
    ]);

    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    // AUTO SLIDE
    useEffect(() => {
        if (banners.length === 0) return;

        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % banners.length);
        }, 3000);

        return () => clearInterval(intervalRef.current);
    }, [banners.length]);

    // ELIMINAR BANNER — VERSIÓN DEFINITIVA
    const removeBanner = (id) => {
        clearInterval(intervalRef.current);

        const updated = banners.filter((b) => b.id !== id);

        setBanners(updated);

        // Esperar a que React actualice la lista
        setTimeout(() => {
            // Si borramos el último, volver al primero
            if (index >= updated.length) {
                setIndex(0);
            }
        }, 50);
    };

    if (banners.length === 0) return null;

    return (
        <div className="banner-carousel">

            <button 
                type="button"
                className="banner-close"
                onClick={(e) => {
                    e.stopPropagation();  
                    e.preventDefault();    
                    removeBanner(banners[index].id);
                }}
                    >
                ✕
            </button>


            <div className="banner-slide">
                {banners[index].text}
            </div>

            <button 
                className="banner-arrow left"
                onClick={() => setIndex((prev) => (prev - 1 + banners.length) % banners.length)}
            >
                ◀
            </button>

            <button 
                className="banner-arrow right"
                onClick={() => setIndex((prev) => (prev + 1) % banners.length)}
            >
                ▶
            </button>

        </div>
    );
}
