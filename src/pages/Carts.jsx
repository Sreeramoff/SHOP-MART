import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

export default function Carts() {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  const delivery = totalPrice >= 100 ? 0 : 10;

  const finalTotal = totalPrice + delivery;

  return (
    <section className="page-section cart-page">

      {/* HEADER */}

      <div className="page-title glass-panel">

        <div>

          <p className="eyebrow">
            NOVA / CART
          </p>

          <h1>
            Your Shopping Cart
          </h1>

          <p>
            Review your products before checkout.
          </p>

        </div>

        <div className="icon-box">
          <ShoppingCart />
        </div>

      </div>


      {cart.length === 0 ? (

        <div className="empty-cart glass-panel">

          <ShoppingBag size={55} />

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add some products to continue.
          </p>

          <Link
            to="/products"
            className="primary-button"
          >
            Explore Products

            <ArrowRight size={17} />
          </Link>

        </div>

      ) : (

        <div className="cart-layout">

          {/* PRODUCTS */}

          <div className="cart-list glass-panel">

            <div className="cart-list-header">

              <h2>
                Cart Items
              </h2>

              <span>
                {totalItems} items
              </span>

            </div>


            {cart.map((item) => (

              <div
                className="cart-product"
                key={item.id}
              >

                <img
                  src={item.thumbnail}
                  alt={item.title}
                />

                <div className="cart-product-info">

                  <span className="product-category">
                    {item.category}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    ${item.price.toFixed(2)}
                  </p>

                </div>


                {/* QUANTITY */}

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item.id
                      )
                    }
                  >
                    <Minus size={14} />
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.id
                      )
                    }
                  >
                    <Plus size={14} />
                  </button>

                </div>


                {/* TOTAL */}

                <strong className="item-total">
                  $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </strong>


                {/* REMOVE */}

                <button
                  className="remove-product"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  title="Remove product"
                >
                  <Trash2 size={17} />
                </button>

              </div>

            ))}

          </div>


          {/* SUMMARY */}

          <aside className="checkout-summary glass-panel">

            <p className="eyebrow">
              ORDER SUMMARY
            </p>

            <h2>
              Checkout
            </h2>

            <div className="summary-row">

              <span>
                Products
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
              className="primary-button checkout-btn"
              onClick={() =>
                navigate("/checkout")
              }
            >
              Proceed to Checkout

              <ArrowRight size={18} />
            </button>


            <Link
              to="/products"
              className="continue-shopping"
            >
              Continue Shopping
            </Link>

          </aside>

        </div>

      )}

    </section>
  );
}