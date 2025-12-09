import "./OfferCard.css";

export default function OfferCard({ image, name, discount, price, oldPrice, store }) {
  return (
    <div className="product-card">

      <img src={image} className="product-img" alt={name} />

      <h3 className="product-name">{name}</h3>

      <div className="product-prices">
        <span className="product-price">{price}€</span>
        {oldPrice && <span className="product-old-price">{oldPrice}€</span>}
      </div>

      <span className="product-discount">-{discount}%</span>

      <span className="product-store">📍 {store}</span>

      <button className="product-button">Ver oferta</button>
    </div>
  );
}
