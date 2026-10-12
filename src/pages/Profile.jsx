import { ArrowRight, LogOut, UserCircle } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <section className="page-section">
      <div className="glass-panel profile-card">
        <div className="profile-header">
          <div className="profile-icon-wrap">
            <UserCircle size={72} />
          </div>

          <div>
            <p className="eyebrow">NOVA / PROFILE</p>
            <h1>My Account</h1>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-row">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>
        </div>

        <button
          className="primary-button"
          onClick={handleLogout}
          type="button"
        >
          Logout
          <LogOut size={18} />
        </button>

        <button
          className="secondary-button"
          onClick={() => navigate("/products")}
          type="button"
        >
          Continue Shopping
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
