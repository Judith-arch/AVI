import "./FiltersPanel.css";
import { useState } from "react";

export default function FiltersPanel({ onFilterChange }) {

    const [filters, setFilters] = useState({
        categories: [],
        tags: [],
        minRating: 0,
        maxDistance: 10,
        sortBy: "relevance",
        openNow: false,
        promotions: false,
        discounts: false,
        schedule: [],
    });

    const toggleArray = (name, value) => {
        const updated = filters[name].includes(value)
            ? filters[name].filter(v => v !== value)
            : [...filters[name], value];

        updateFilter(name, updated);
    };

    const updateFilter = (name, value) => {
        const updated = { ...filters, [name]: value };
        setFilters(updated);
        onFilterChange && onFilterChange(updated);
    };

    return (
        <div className="filters-panel">

            <h2 className="filters-title">Filtros</h2>

            {/* ORDENAR */}
            <div className="filter-block">
                <h3>Ordenar por</h3>
                <select 
                    className="sort-select"
                    value={filters.sortBy}
                    onChange={(e) => updateFilter("sortBy", e.target.value)}
                >
                    <option value="relevance">Relevancia</option>
                    <option value="rating">Mejor valoración</option>
                    <option value="distance">Más cercano</option>
                    <option value="price_low">Precio más bajo</option>
                    <option value="price_high">Precio más alto</option>
                </select>
            </div>

            {/* CATEGORÍAS */}
            <div className="filter-block">
                <h3>Categorías</h3>
                {["Frutas", "Verduras", "Supermercado", "Carnicería", "Panadería", "Premium"].map((cat) => (
                    <label key={cat} className="filter-checkbox">
                        <input
                            type="checkbox"
                            checked={filters.categories.includes(cat)}
                            onChange={() => toggleArray("categories", cat)}
                        />
                        {cat}
                    </label>
                ))}
            </div>

            {/* ETIQUETAS */}
            <div className="filter-block">
                <h3>Etiquetas</h3>
                {["Ecológico", "Local", "Top Seller", "Gourmet", "Frescura", "Sostenible"].map((tag) => (
                    <label key={tag} className="filter-checkbox">
                        <input
                            type="checkbox"
                            checked={filters.tags.includes(tag)}
                            onChange={() => toggleArray("tags", tag)}
                        />
                        {tag}
                    </label>
                ))}
            </div>

            {/* VALORACIÓN */}
            <div className="filter-block">
                <h3>Valoración mínima</h3>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={filters.minRating}
                    onChange={(e) => updateFilter("minRating", e.target.value)}
                />
                <p>{filters.minRating} ⭐ o más</p>
            </div>

            {/* DISTANCIA */}
            <div className="filter-block">
                <h3>Distancia máxima</h3>
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={filters.maxDistance}
                    onChange={(e) => updateFilter("maxDistance", e.target.value)}
                />
                <p>Hasta {filters.maxDistance} km</p>
            </div>

            {/* HORARIO */}
            <div className="filter-block">
                <h3>Horario</h3>

                {["Mañana", "Tarde", "Noche"].map((time) => (
                    <label key={time} className="filter-checkbox">
                        <input
                            type="checkbox"
                            checked={filters.schedule.includes(time)}
                            onChange={() => toggleArray("schedule", time)}
                        />
                        {time}
                    </label>
                ))}

                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.openNow}
                        onChange={(e) => updateFilter("openNow", e.target.checked)}
                    />
                    Abierto ahora
                </label>
            </div>

            {/* PROMOCIONES */}
            <div className="filter-block">
                <h3>Ofertas</h3>

                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.promotions}
                        onChange={(e) => updateFilter("promotions", e.target.checked)}
                    />
                    Promociones activas
                </label>

                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.discounts}
                        onChange={(e) => updateFilter("discounts", e.target.checked)}
                    />
                    Con descuento
                </label>
            </div>

            <button className="filter-apply-btn">Aplicar filtros</button>
        </div>
    );
}