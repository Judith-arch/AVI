import { useState } from "react";
import "./ReviewCarousel.css";

export default function ReviewCarousel({ reviews }) {
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

            <div className={`carousel-review ${fade ? "fade-out" : "fade-in"}`}>
                <div className="carousel-stars">⭐⭐⭐⭐⭐</div>
                <p className="carousel-text">"{reviews[index].text}"</p>
                <small className="carousel-author">- {reviews[index].author}</small>
            </div>

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
