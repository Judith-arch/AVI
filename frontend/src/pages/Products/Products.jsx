import "./Products.css";
import ProductsBanner from "../../components/ProductsBanner/ProductsBanner";
import StoreProductSection from "../../components/StoreProductSection/StoreProductSection";
import ProductsFilters from "../../components/ProductsFilters/ProductsFilters";

export default function Products() {

    const stores = [
        {
            name: "Tienda Central",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            rating: 4.8,
            products: [
                { name: "Manzanas Premium", price: 2.99, img: "/images/apple.jpg" },
                { name: "Aguacate Extra", price: 1.49, img: "/images/avocado.jpg" },
                { name: "Pan integral", price: 1.20, img: "/images/bread.jpg" }
            ]
        },
        {
            name: "EcoFresh Market",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            rating: 4.6,
            products: [
                { name: "Zanahorias eco", price: 1.99, img: "/images/carrot.jpg" },
                { name: "Tomates cherry", price: 2.50, img: "/images/tomato.jpg" }
            ]
        }
    ];

    return (
        <div className="products-layout">

            {/* FILTROS A LA IZQUIERDA */}
            <aside className="products-filters-wrapper">
                <ProductsFilters />
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="products-content">

                {/* BANNER SUPERIOR */}
                <ProductsBanner />

                {/* SECCIONES POR TIENDA */}
                {stores.map((store, index) => (
                    <StoreProductSection key={index} store={store} />
                ))}

            </main>

        </div>
    );
}