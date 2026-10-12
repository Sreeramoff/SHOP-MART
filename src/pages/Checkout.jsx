import { useState } from "react";

import {
  CheckCircle,
  CreditCard,
  MapPin,
  Truck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "card",
  });

  const delivery = totalPrice >= 100 ? 0 : 10;

  const finalTotal = totalPrice + delivery;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo checkout
    clearCart();

    setOrderPlaced(true);
  };


  if (orderPlaced) {
    return (
      <section className="checkout-page page-section">

        <div className="success-card glass-panel">

          <CheckCircle
            size={75}
            className="success-icon"
          />

          <p className="eyebrow">
            NOVA / ORDER
          </p>

          <h1>
            Order Confirmed
          </h1>

          <p>
            Thank you for shopping with
            Nova Glass.
          </p>

          <div className="order-number">
            Order #
            {Math.floor(
              Math.random() * 900000
            ) + 100000}
          </div>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>

        </div>

      </section>
    );
  }


  if (cart.length === 0) {
    return (
      <section className="page-section">

        <div className="empty-cart glass-panel">

          <h2>
            Your cart is empty
          </h2>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/products")
            }
          >
            Go to Products
          </button>

        </div>

      </section>
    );
  }


  return (
    <section className="checkout-page page-section">

      <div className="page-title glass-panel">

        <div>

          <p className="eyebrow">
            NOVA / CHECKOUT
          </p>

          <h1>
            Complete your order
          </h1>

          <p>
            Enter your delivery and payment
            information.
          </p>

        </div>

        <Truck size={42} />

      </div>


      <form
        className="checkout-layout"
        onSubmit={handleSubmit}
      >

        {/* CUSTOMER INFORMATION */}

        <div className="checkout-form glass-panel">

          <h2>
            Delivery Information
          </h2>


          <div className="form-grid">

            <label>
              Full Name

              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </label>


            <label>
              Email

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </label>


            <label>
              Phone

              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
              />
            </label>


            <label>
              Pincode

              <input
                type="text"
                name="pincode"
                required
                value={form.pincode}
                onChange={handleChange}
                placeholder="695001"
              />
            </label>

          </div>


          <label className="full-input">
            Address

            <textarea
              name="address"
              required
              value={form.address}
              onChange={handleChange}
              placeholder="House / Street / Area"
              rows="4"
            />
          </label>


          <label className="full-input">
            City

            <input
              type="text"
              name="city"
              required
              value={form.city}
              onChange={handleChange}
              placeholder="Thiruvananthapuram"
            />
          </label>


          <h2 className="payment-title">
            Payment Method
          </h2>


          <div className="payment-options">

            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="card"
                checked={
                  form.payment === "card"
                }
                onChange={handleChange}
              />

              <CreditCard size={20} />

              <span>
                Credit / Debit Card
              </span>

            </label>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="upi"
                checked={
                  form.payment === "upi"
                }
                onChange={handleChange}
              />

              <span className="upi-icon">
                UPI
              </span>

              <span>
                UPI Payment
              </span>

            </label>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="cod"
                checked={
                  form.payment === "cod"
                }
                onChange={handleChange}
              />

              <Truck size={20} />

              <span>
                Cash on Delivery
              </span>

            </label>

          </div>

        </div>


        {/* ORDER SUMMARY */}

        <aside className="checkout-summary glass-panel">

          <p className="eyebrow">
            YOUR ORDER
          </p>

          <h2>
            Order Summary
          </h2>


          <div className="checkout-items">

            {cart.map((item) => (

              <div
                className="checkout-item"
                key={item.id}
              >

                <img
                  src={item.thumbnail}
                  alt={item.title}
                />

                <div>

                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    Qty: {item.quantity}
                  </span>

                </div>

                <b>
                  $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </b>

              </div>

            ))}

          </div>


          <div className="summary-row">

            <span>
              Items
            </span>

            <strong>
              {totalItems}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ${totalPrice.toFixed(2)}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Delivery
            </span>

            <strong>
              {delivery === 0
                ? "FREE"
                : `$${delivery.toFixed(2)}`}
            </strong>

          </div>


          <div className="summary-divider" />


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ${finalTotal.toFixed(2)}
            </strong>

          </div>


          <button
            type="submit"
            className="primary-button checkout-btn"
          >
            Place Order

            <CheckCircle size={18} />
          </button>

        </aside>

      </form>

    </section>
  );
}