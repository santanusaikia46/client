"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import styles from "./page.module.css";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const checkoutHandler = () => {
    router.push("/login?redirect=checkout");
  };

  if (!mounted) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <div className={styles.emptyCart}>Loading cart...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          Your cart is empty. <Link href="/products">Go Back</Link>
        </div>
      ) : (
        <div className={styles.cartLayout}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={`${item.product}-${item.variantId}`} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.image} />
                <div className={styles.itemDetails}>
                  <Link href={`/products/${item.product}`} className={styles.itemName}>
                    {item.name}
                  </Link>
                  {(item.size || item.color) && (
                    <p style={{ fontSize: '0.875rem', color: '#666', margin: '0.25rem 0' }}>
                      {item.size && `Size: ${item.size} `}
                      {item.color && `Color: ${item.color}`}
                    </p>
                  )}
                  <p className={styles.itemPrice}>₹{item.price.toFixed(2)}</p>
                </div>
                <div className={styles.qtySelector}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => addToCart({ ...item, qty: Math.max(1, item.qty - 1) })}
                    disabled={item.qty <= 1}
                  >
                    -
                  </button>
                  <span className={styles.qtyValue}>{item.qty}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => addToCart({ ...item, qty: Math.min(item.countInStock, item.qty + 1) })}
                    disabled={item.qty >= item.countInStock}
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.product, item.variantId)}
                  title="Remove from Cart"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          
          <div className={styles.summary}>
            <h2>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
              <span>
                ₹{cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              className={styles.checkoutBtn}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
