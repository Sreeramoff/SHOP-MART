import { ArrowUpRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="product-card glass-card">
      <div className="product-image-wrap">
        <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
        <span className="category-badge">{product.category}</span>
      </div>

      <div className="product-info">
        <p className="eyebrow">{product.brand || "Nova Collection"}</p>
        <h3>{product.title}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-meta">
          <strong>${Number(product.price).toFixed(2)}</strong>
          <span><Star size={15} fill="currentColor" /> {product.rating ?? "—"}</span>
        </div>

        <Link className="outline-button full-button" to={`/products/${product.id}`}>
          View product <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}