"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./page.module.css";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, shippingAddress, saveShippingAddress, paymentMethod, savePaymentMethod, clearCart } = useCart();
  const { isAuthenticated, token } = useAuth();

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [payment, setPayment] = useState(paymentMethod || "PayPal");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=checkout");
    }
  }, [isAuthenticated, router]);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalPrice = itemsPrice; // Simplification without tax/shipping

  const submitShipping = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    setStep(2);
  };

  const submitPayment = (e) => {
    e.preventDefault();
    savePaymentMethod(payment);
    setStep(3);
  };

  const placeOrder = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress: { address, city, postalCode, country },
          paymentMethod: payment,
          totalPrice,
        }),
      });

      const data = await res.json();
      if (data.success) {
        clearCart();
        router.push(`/order/${data.data._id}`);
      } else {
        setError(data.message || "Failed to place order.");
      }
    } catch (error) {
      setError("An error occurred during checkout.");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout - Step {step} of 3</h1>

      {error && <div className={styles.error}>{error}</div>}

      {step === 1 && (
        <form onSubmit={submitShipping}>
          <div className={styles.formGroup}>
            <label>Address</label>
            <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Postal Code</label>
            <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Country</label>
            <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
          <button type="submit" className={styles.button}>Continue to Payment</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={submitPayment}>
          <div className={styles.formGroup}>
            <label>Select Method</label>
            <select value={payment} onChange={(e) => setPayment(e.target.value)}>
              <option value="PayPal">PayPal</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash On Delivery">Cash On Delivery</option>
            </select>
          </div>
          <button type="submit" className={styles.button}>Continue to Review</button>
          <button type="button" className={styles.button} style={{background: '#666', marginTop: '1rem'}} onClick={() => setStep(1)}>Back</button>
        </form>
      )}

      {step === 3 && (
        <div>
          <div className={styles.summary}>
            <h2>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Items:</span>
              <span>₹{itemsPrice.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping:</span>
              <span>₹0.00</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax:</span>
              <span>₹0.00</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button type="button" className={styles.button} onClick={placeOrder}>Place Order</button>
          <button type="button" className={styles.button} style={{background: '#666', marginTop: '1rem'}} onClick={() => setStep(2)}>Back</button>
        </div>
      )}
    </div>
  );
}
