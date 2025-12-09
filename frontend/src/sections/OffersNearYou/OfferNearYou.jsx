import { useRef, useEffect } from "react";
import OfferCard from "../../components/OfferCard/OfferCard";
import "./OffersNearYou.css";

export default function OffersNearYou() {

  // 🔥 20 productos autogenerados
    const offers = Array.from({ length: 20 }).map((_, i) => ({
        image: `https://picsum.photos/200?random=${i}`,
        name: `Producto ${i + 1}`,
        price: (Math.random() * 10 + 1).toFixed(2),
        oldPrice: (Math.random() * 12 + 2).toFixed(2),
        discount: Math.floor(Math.random() * 40) + 10,
        store: "Tienda Central"
    }));

    const scrollRef = useRef(null);
    let isDown = false;
    let startX;
    let scrollLeft;

    // 🚀 AUTO-SCROLL
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

    const speed = 0.3; // velocidad suave

        const interval = setInterval(() => {
        el.scrollLeft += speed;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
            el.scrollLeft = 0;
        }
        }, 10);

    return () => clearInterval(interval);
        }, []);

        // 🖱 DRAG TO SCROLL
        const handleMouseDown = (e) => {
            isDown = true;
            startX = e.pageX - scrollRef.current.offsetLeft;
            scrollLeft = scrollRef.current.scrollLeft;
        };

        const handleMouseLeave = () => { isDown = false; };
        const handleMouseUp = () => { isDown = false; };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 1.5;
            scrollRef.current.scrollLeft = scrollLeft - walk;
        };

        return (
            <div className="offers-section">

            <h2 className="offers-title">Productos en oferta cerca de ti</h2>
            <p className="offers-subtitle">Descubre descuentos exclusivos cerca de tu ubicación.</p>

            <div className="offers-slider">
                <div className="offers-track">
                    {offers.concat(offers).map((offer, i) => (
                    <OfferCard key={i} {...offer} />
                    ))}
                </div>
            </div>
            <button className="offers-button">Ver todas las ofertas</button>

            </div>
        );
        }