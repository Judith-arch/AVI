import "./SearchBar.css";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <div className="searchbar-container">
            <input 
                type="text"
                placeholder="Buscar tiendas, productos, categorías..."
                value={query}
                onChange={handleChange}
                className="searchbar-input"
            />
            <span className="searchbar-icon">🔍</span>
        </div>
    );
}
