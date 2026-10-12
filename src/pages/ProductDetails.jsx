import { useEffect, useState } from "react";

import {
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getProduct,
} from "../api/api";

import { useCart } from "../context/CartContext";


export default function ProductDetails() {

  const { id } = useParams();

  const { addToCart } =
    useCart();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const loadProduct = async () => {

      try {

        const data =
          await getProduct(id);

        setProduct(data);

      } catch (error) {

        console.error(error);

        setError(
          "Product not found."
        );

      } finally {

        setLoading(false);

      }
    };

    loadProduct();

  }, [id]);


  if (loading) {
    return (
      <section className="page-section">
        Loading product...
      </section>
    );
  }


  if (error) {
    return (
      <section className="page-section">
        {error}
      </section>
    );
  }


  return (
    <section className="page-section">

      <Link
        to="/products"
        className="back-link"
      >
        <ArrowLeft size={17} />

        Back to Products
      </Link>


      <div className="details-card glass-panel">

        <div className="details-image">

          <img
            src={product.thumbnail}
            alt={product.title}
          />

        </div>


        <div className="details-content">

          <span className="product-category">
            {product.category}
          </span>

          <h1>
            {product.title}
          </h1>

          <p>
            {product.description}
          </p>

          <div>
            ⭐ {product.rating}
          </div>

          <h2>
            ${product.price.toFixed(2)}
          </h2>

          <button
            className="primary-button"
            onClick={() =>
              addToCart(product)
            }
          >
            <ShoppingCart size={18} />

            Add to Cart
          </button>

        </div>

      </div>

    </section>
  );
}