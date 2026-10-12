import { useEffect, useState } from "react";
import { ArrowLeft, Layers } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getProductsByCategory } from "../api/api";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

export default function CategoryProducts() {

  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadProducts = async () => {

      try {
        setLoading(true);
        setError("");

        const data = await getProductsByCategory(slug);

        setProducts(data.products || []);

      } catch (error) {

        console.error(error);

        setProducts([]);

        setError(
          "Unable to load products for this category."
        );

      } finally {

        setLoading(false);

      }
    };

    if (slug) {
      loadProducts();
    }

  }, [slug]);

  // Convert slug to readable title
  const categoryName = slug
    ? slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        )
    : "Products";

  if (loading) {
    return (
      <section className="page-section">
        <Loader
          text={`Loading ${categoryName} products...`}
        />
      </section>
    );
  }

  return (
    <section className="page-section">

      {/* HEADER */}
      <div className="page-title glass-panel">

        <div>

          <Link
            to="/categories"
            className="back-button"
          >
            <ArrowLeft size={18} />
            Back to Categories
          </Link>

          <p className="eyebrow">
            NOVA / CATEGORY
          </p>

          <h1>
            {categoryName}
          </h1>

          <p>
            Browse all products in the{" "}
            <strong>{categoryName}</strong> category.
          </p>

        </div>

        <Layers size={40} />

      </div>

      {/* ERROR */}
      {error && (
        <div className="glass-panel empty-state">
          {error}
        </div>
      )}

      {/* PRODUCT COUNT */}
      {!error && (
        <div className="section-header">

          <div>
            <h2>
              {categoryName} Products
            </h2>

            <p>
              {products.length} products found
            </p>
          </div>

        </div>
      )}

      {/* PRODUCTS */}
      {!error && products.length > 0 ? (

        <div className="product-grid">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      ) : !error ? (

        <div className="glass-panel empty-state">
          No products found in this category.
        </div>

      ) : null}

    </section>
  );
}