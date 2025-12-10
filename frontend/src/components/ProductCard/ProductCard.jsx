import "./ProductCard.css";

export default function ProductCard({ product }) {
    return (
        <div className="product-card">
            <img src={product.img} className="product-img" />
            <h4>{product.name}</h4>
            <p className="price">{product.price} €</p>
            <button>Añadir</button>
        </div>
    );
}
