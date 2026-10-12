import { useState } from "react";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = register(
      form.name,
      form.email,
      form.password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/signin");
  };

  return (
    <section className="auth-page">

      <div className="auth-card glass-panel">

        {/* LEFT SIDE */}

        <div className="auth-visual">

          <div className="auth-orb">
            <div className="orb-glow" />
          </div>

          <span className="status-pill">
            <span />
            NOVA GLASS
          </span>

          <p className="eyebrow">
            CREATE / ACCOUNT
          </p>

          <h1>
            Create your
            <br />
            <span>future.</span>
          </h1>

          <p className="auth-description">
            Join Nova Glass and explore a
            futuristic shopping experience
            built with React and REST APIs.
          </p>

          <div className="auth-features">

            

          </div>

        </div>


        {/* REGISTER FORM */}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <p className="eyebrow">
            NOVA / REGISTER
          </p>

          <h2>
            Create an account
          </h2>

          <p className="form-subtitle">
            Start your Nova Glass journey.
          </p>


          {error && (
            <div className="form-error">
              {error}
            </div>
          )}


          {/* NAME */}

          <label>
            Full Name

            <div className="input-wrap">

              <User size={18} />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
              />

            </div>
          </label>


          {/* EMAIL */}

          <label>
            Email Address

            <div className="input-wrap">

              <Mail size={18} />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
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
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
              />

            </div>
          </label>


          {/* CONFIRM PASSWORD */}

          <label>
            Confirm Password

            <div className="input-wrap">

              <LockKeyhole size={18} />

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />

            </div>
          </label>


          {/* TERMS */}

          <label className="checkbox-row">

            <input
              type="checkbox"
              required
            />

            <span>
              I agree to the terms and
              privacy policy.
            </span>

          </label>


          {/* REGISTER BUTTON */}

          <button
            type="submit"
            className="primary-button full-button"
          >
            Create Account

            <ArrowRight size={18} />
          </button>


          {/* LOGIN LINK */}

          <p className="auth-switch">

            Already have an account?

            {" "}

            <Link to="/signin">
              Sign In
            </Link>

          </p>

        </form>

      </div>

    </section>
  );
}