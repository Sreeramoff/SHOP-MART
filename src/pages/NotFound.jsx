import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found glass-panel">
      <p className="eyebrow">404 / NOT FOUND</p>
      <h1>That page is outside the glass.</h1>
      <Link to="/" className="primary-button">Back home</Link>
    </section>
  );
}