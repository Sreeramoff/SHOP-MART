export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-wrap">
      <span className="spinner" />
      <p>{text}</p>
    </div>
  );
}