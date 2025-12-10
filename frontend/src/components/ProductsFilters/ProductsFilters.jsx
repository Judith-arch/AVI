import "./ProductsFilters.css";
import { useState } from "react";

export default function ProductsFilters() {
    return (
        <div className="products-filters-panel">
            <h2>Filtros de Productos</h2>

            <div className="filter-block">
                <h3>Categorías</h3>
                <label><input type="checkbox" /> Frutas</label>
                <label><input type="checkbox" /> Verduras</label>
                <label><input type="checkbox" /> Lácteos</label>
                <label><input type="checkbox" /> Panadería</label>
                <label><input type="checkbox" /> Carnes</label>
            </div>

            <div className="filter-block">
                <h3>Dietas</h3>
                <label><input type="checkbox" /> Vegano</label>
                <label><input type="checkbox" /> Sin gluten</label>
                <label><input type="checkbox" /> Orgánico</label>
                <label><input type="checkbox" /> Bajo en azúcar</label>
            </div>

            <div className="filter-block">
                <h3>Popularidad</h3>
                <label><input type="checkbox" /> Más vendidos</label>
                <label><input type="checkbox" /> Nuevos productos</label>
            </div>

            <div className="filter-block">
                <h3>Rango de precios</h3>
                <input type="range" min="1" max="100" />
            </div>

            <div className="filter-block">
                <h3>Disponibilidad</h3>
                <label><input type="checkbox" /> En stock</label>
                <label><input type="checkbox" /> Con descuento</label>
                <label><input type="checkbox" /> Promociones</label>
            </div>

        </div>
    );
}