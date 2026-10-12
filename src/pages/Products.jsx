import { useEffect, useState } from "react";

import { getProducts } from "../api/api";

import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(
          data.products || []
        );

      } catch (error) {
        console.error(error);

        setError(
          "Failed to load products."
        );

      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);


  if (loading) {
    return (
      <section className="page-section">
        <Loader text="Loading products..." />
      </section>
    );
  }


  if (error) {
    return (
      <section className="page-section">
        <div className="glass-panel error-box">
          {error}
        </div>
      </section>
    );
  }


  return (
    <section className="page-section">

      <div className="page-title glass-panel">

        <div>
          <p className="eyebrow">
            NOVA / PRODUCTS
          </p>

          <h1>
            All Products
          </h1>

          <p>
            Explore our complete product
            collection.
          </p>
        </div>

      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}