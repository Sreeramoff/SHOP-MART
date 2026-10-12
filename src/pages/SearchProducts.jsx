import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { searchProducts } from "../api/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function SearchProducts() {
  const [query, setQuery] = useState("phone");
  const [submitted, setSubmitted] = useState("phone");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    searchProducts(submitted)
      .then((data) => setProducts(data.products || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(query.trim() || "phone");
  };

  return (
    <section className="section-block page-section">
      <div className="page-title glass-panel">
        <div>
          <p className="eyebrow">SEARCH / QUERY</p>
          <h1>Find your product</h1>
          <p>Try the default search query <strong>phone</strong>.</p>
        </div>
      </div>

      <form className="search-box glass-panel" onSubmit={handleSubmit}>
        <Search size={20} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." />
        <button className="primary-button" type="submit">Search</button>
      </form>

      <div className="result-bar">
        <span>Results for “{submitted}”</span>
        <span>{products.length} found</span>
      </div>

      {loading ? <Loader text="Searching..." /> : (
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  );
}