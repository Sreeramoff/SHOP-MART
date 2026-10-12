import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <article className="product-card glass-card">

      <Link
        to={`/products/${product.id}`}
        className="product-image-wrap"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />
      </Link>

      <div className="product-content">

        <span className="product-category">
          {product.category}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="product-name"
        >
          {product.title}
        </Link>

        <div className="product-bottom">

          <strong className="product-price">
            ${product.price.toFixed(2)}
          </strong>

          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />

            Add
          </button>

        </div>

      </div>

    </article>
  );
}