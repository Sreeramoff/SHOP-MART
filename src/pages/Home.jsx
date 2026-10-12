import { useEffect, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getCategories, getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productData, categoryData]) => {
        setProducts(productData.products?.slice(0, 6) || []);
        setCategories(categoryData?.slice(0, 8) || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero glass-panel">
        <div className="hero-copy">
          <span className="status-pill"><span /> API ONLINE</span>
          <p className="eyebrow">SHOP MART / DIGITAL STORE</p>
          <h1>Shop the future in a <span>glass world.</span></h1>
          <p className="hero-text">
            A responsive React e-commerce experience inspired by the soft,
            futuristic portfolio design in your reference image.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="primary-button">
              Explore products <ArrowRight size={18} />
            </Link>
            <Link to="/search" className="outline-button">
              <Search size={17} /> Search phone
            </Link>
          </div>

          <div className="mini-stats">
            <div><strong>194+</strong><span>Products</span></div>
            <div><strong>24</strong><span>Categories</span></div>
            <div><strong>50</strong><span>Sample carts</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="hero-product">
            <div className="hero-product-glow" />
            <Sparkles size={20} />
            <span>FUTURE<br />COLLECTION</span>
            <small>SHOPPING MALL</small>
          </div>
        </div>
      </section>

      <section className="metrics-grid">
        <Metric icon={<Boxes />} value="30" label="Products per default request" />
        <Metric icon={<Layers3 />} value="24" label="Product categories" />
        <Metric icon={<Truck />} value="50" label="Sample carts available" />
        <Metric icon={<ShieldCheck />} value="100%" label="Responsive UI" />
      </section>

      <section className="feature-strip glass-panel">
        <div>
          <p className="eyebrow">WHY SHOP MART</p>
          <h3>Built for modern shoppers.</h3>
        </div>

        <div className="feature-list">
          <div>
            <strong>Fast browsing</strong>
            <span>Streamlined product discovery with clean filters and category views.</span>
          </div>
          <div>
            <strong>Smart cart</strong>
            <span>Quick add-to-cart flows and quantity tracking for a complete shopping journey.</span>
          </div>
          <div>
            <strong>Secure login</strong>
            <span>Real account-based sign-in with stored user credentials and session management.</span>
          </div>
        </div>
      </section>

     

      <section className="section-block">
        <SectionHeading
          eyebrow="FEATURED PRODUCTS"
          title="A curated glass collection."
          text="Live product cards loaded from the DummyJSON products endpoint."
          action="/products"
          actionText="View all"
        />

        {loading ? (
          <Loader />
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="EXPLORE"
          title="Browse by category."
          text="Categories are loaded directly from the API."
          action="/categories"
          actionText="All categories"
        />

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/categories?category=${encodeURIComponent(category.slug)}`}
              className="category-card glass-card"
              key={category.slug}
            >
              <span>{category.name?.slice(0, 1)}</span>
              <div>
                <strong>{category.name}</strong>
                <small>{category.slug}</small>
              </div>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className="cta glass-panel">
        <div>
          <p className="eyebrow">READY TO EXPLORE?</p>
          <h2>Discover something extraordinary.</h2>
          <p>Search, sort, browse categories and inspect individual products.</p>
        </div>
        <Link to="/products" className="primary-button">Start shopping <ArrowRight size={18} /></Link>
      </section>
    </>
  );
}

function Metric({ icon, value, label }) {
  return (
    <div className="metric glass-card">
      {icon}
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, action, actionText }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link to={action} className="text-link">{actionText} <ArrowRight size={16} /></Link>
    </div>
  );
}