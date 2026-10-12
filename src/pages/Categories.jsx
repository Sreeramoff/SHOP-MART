import { useEffect, useState } from "react";
import { Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { getCategories } from "../api/api";
import Loader from "../components/Loader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);

        const data = await getCategories();

        setCategories(data || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="page-section">
        <Loader text="Loading categories..." />
      </section>
    );
  }

  return (
    <section className="page-section">

      {/* PAGE HEADER */}
      <div className="page-title glass-panel">
        <div>
          <p className="eyebrow">
            NOVA / CATEGORIES
          </p>

          <h1>Product Categories</h1>

          <p>
            Choose a category to explore its products.
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

      {/* CATEGORIES */}
      <div className="categories-grid">

        {categories.map((category) => {

          // DummyJSON can return either strings or objects
          const slug =
            typeof category === "string"
              ? category
              : category.slug;

          const name =
            typeof category === "string"
              ? category
              : category.name;

          return (
            <Link
              key={slug}
              to={`/category/${slug}`}
              className="category-card glass-card"
            >
              <div className="category-icon">
                <Layers size={25} />
              </div>

              <h2>{name}</h2>

              <ArrowRight size={22} />
            </Link>
          );
        })}

      </div>

    </section>
  );
}