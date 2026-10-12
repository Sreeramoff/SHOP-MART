import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {

  const {
    user,
    token,
    logout,
  } = useAuth();

  const {
    totalItems,
  } = useCart();


  return (
    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        SHOP MART
      </Link>


      <div className="nav-links">

        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/products">
          Products
        </NavLink>

        <NavLink to="/categories">
          Categories
        </NavLink>


        {/* CART */}

        {token && (
          <NavLink to="/carts">
            Cart

            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems}
              </span>
            )}

          </NavLink>
        )}


        {/* PROFILE */}

        {token && (
          <NavLink to="/profile">
            Profile
          </NavLink>
        )}


        {/* LOGIN */}

        {!token && (
          <NavLink to="/signin">
            Sign In
          </NavLink>
        )}


        {/* LOGOUT */}

        {token && (
          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}