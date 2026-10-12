import { useState } from "react";

import {
  ArrowRight,
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


export default function SignIn() {

  const {
    user,
    signIn,
  } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  // Already logged in
  if (user) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");


    const result = signIn(
      email.trim(),
      password
    );


    // Login failed
    if (!result.success) {

      setError(result.message);

      return;
    }


    // Login successful
    //
    // If user originally tried
    // /checkout or /carts,
    // send them back there.
    //
    // Otherwise Home.

    const destination =
      location.state?.from || "/";


    navigate(
      destination,
      {
        replace: true,
      }
    );

  };


  return (
    <section className="auth-page">

      <div className="auth-card glass-panel">

        <div className="auth-visual">

          <div className="auth-orb" />

          <span className="status-pill">
            <span />
            SECURE SESSION
          </span>

          <h1>
            Welcome to <span>Nova.</span>
          </h1>

          <div className="auth-note">

            <strong>
              Secure authentication
            </strong>

            <span>
              Sign in to continue shopping.
            </span>

          </div>

        </div>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <p className="eyebrow">
            ACCOUNT / SIGN IN
          </p>

          <h2>
            Enter your details.
          </h2>


          {error && (
            <div className="form-error">
              {error}
            </div>
          )}


          {/* EMAIL */}

          <label>

            Email

            <div className="input-wrap">

              <Mail size={18} />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                required
              />

            </div>

          </label>


          {/* PASSWORD */}

          <label>

            Password

            <div className="input-wrap">

              <LockKeyhole size={18} />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                required
              />

            </div>

          </label>


          <button
            className="primary-button full-button"
            type="submit"
          >

            Sign in

            <ArrowRight size={18} />

          </button>


          <p className="auth-switch">

            Don't have an account?{" "}

            <Link to="/register">
              Create Account
            </Link>

          </p>

        </form>

      </div>

    </section>
  );
}