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
                { name: "Pan integral", price: 1.20, img: "/images/bread.jpg" },
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
                { name: "Manzanas Premium", price: 2.99, img: "/images/apple.jpg" },
                { name: "Aguacate Extra", price: 1.49, img: "/images/avocado.jpg" },
                { name: "Pan integral", price: 1.20, img: "/images/bread.jpg" },
                { name: "Manzanas Premium", price: 2.99, img: "/images/apple.jpg" },
                { name: "Aguacate Extra", price: 1.49, img: "/images/avocado.jpg" },
                { name: "Pan integral", price: 1.20, img: "/images/bread.jpg" }
            ]
        },

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
            { name: "Tomates cherry", price: 2.50, img: "/images/tomato.jpg" },
            { name: "Lechuga orgánica", price: 1.30, img: "/images/lettuce.jpg" }
        ]
        },

        {
        name: "Delicias Gourmet",
        logo: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
        rating: 4.9,
        products: [
            { name: "Queso Brie francés", price: 6.99, img: "/images/brie.jpg" },
            { name: "Jamón serrano gran reserva", price: 9.49, img: "/images/ham.jpg" },
            { name: "Aceite de oliva premium", price: 12.99, img: "/images/oliveoil.jpg" }
        ]
    },

    {
        name: "Super Express 24H",
        logo: "https://cdn-icons-png.flaticon.com/512/2438/2438078.png",
        rating: 4.4,
        products: [
            { name: "Refresco cola 1L", price: 1.10, img: "/images/cola.jpg" },
            { name: "Patatas fritas clásicas", price: 1.50, img: "/images/chips.jpg" },
            { name: "Chocolate con leche", price: 1.20, img: "/images/chocolate.jpg" }
        ]
    },

    {
        name: "Mercado Veggie",
        logo: "https://cdn-icons-png.flaticon.com/512/2927/2927347.png",
        rating: 4.7,
        products: [
            { name: "Hamburguesa vegetal", price: 3.99, img: "/images/vegan-burger.jpg" },
            { name: "Leche de almendra", price: 2.49, img: "/images/almond-milk.jpg" },
            { name: "Tofu fresco", price: 2.20, img: "/images/tofu.jpg" }
        ]
    },

    {
        name: "Marisquería Azul",
        logo: "https://cdn-icons-png.flaticon.com/512/2909/2909765.png",
        rating: 4.8,
        products: [
            { name: "Gambas frescas", price: 14.99, img: "/images/shrimp.jpg" },
            { name: "Pulpo cocido", price: 19.99, img: "/images/octopus.jpg" },
            { name: "Mejillones al vapor", price: 4.50, img: "/images/mussels.jpg" }
        ]
    },

    {
        name: "Carnicería Don Corte",
        logo: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
        rating: 4.5,
        products: [
            { name: "Pechuga de pollo", price: 5.99, img: "/images/chicken.jpg" },
            { name: "Solomillo de ternera", price: 18.99, img: "/images/beef.jpg" },
            { name: "Costillas BBQ", price: 8.99, img: "/images/ribs.jpg" }
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


                {/* SECCIONES POR TIENDA */}
                {stores.map((store, index) => (
                    <StoreProductSection key={index} store={store} />
                ))}
                
                {/* BANNER INFERIOR */}
                <ProductsBanner />

            </main>
        </div>
    );
}