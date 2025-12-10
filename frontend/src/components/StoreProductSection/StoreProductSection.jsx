import "./StoreProductSection.css";
import ProductCard from "../ProductCard/ProductCard";

export default function StoreProductSection({ store }) {

    return (
        <section className="store-section">
            <div className="store-header">
                <img src={store.logo} alt="" className="store-logo" />
                <div>
                    <h2>{store.name}</h2>
                    <p>⭐ {store.rating}</p>
                </div>
            </div>

            <div className="products-grid">
                {store.products.map((p, i) => (
                    <ProductCard key={i} product={p} />
                ))}
            </div>
        </section>
    );
}
