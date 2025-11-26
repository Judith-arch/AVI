// frontend/src/pages/Productos.jsx

import React from 'react';
import './Productos.css'; // ⬅️ Importas el CSS aquí

function Productos() {
    const productos = [
        { id: 1, nombre: "Camiseta básica", precio: 15.99, imagen: "https://via.placeholder.com/150" },
        { id: 2, nombre: "Pantalón de mezclilla", precio: 29.99, imagen: "https://via.placeholder.com/150" },
        { id: 3, nombre: "Gorra deportiva", precio: 9.99, imagen: "https://via.placeholder.com/150" },
    ];

    return (
        <div className="productos-container">
        <h1>Productos</h1>

        <div className="productos-grid">
            {productos.map(prod => (
            <div key={prod.id} className="producto-card">
                <img src={prod.imagen} alt={prod.nombre} />

                <h3>{prod.nombre}</h3>
                <p className="precio">${prod.precio}</p>

                <button>Añadir al carrito</button>
            </div>
            ))}
        </div>
        </div>
    );
}

export default Productos;
