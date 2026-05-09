"use client";

import { useState } from "react";
import styles from "../info.module.css";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  function handleTrack(e) {
    e.preventDefault();
    // Placeholder — connect to your orders API
    setResult({
      id: orderId,
      status: "In Transit",
      eta: "April 20, 2026",
      steps: [
        { label: "Order Placed", done: true, date: "April 15" },
        { label: "Payment Confirmed", done: true, date: "April 15" },
        { label: "Dispatched", done: true, date: "April 16" },
        { label: "In Transit", done: true, date: "April 17" },
        { label: "Out for Delivery", done: false, date: "April 20" },
        { label: "Delivered", done: false, date: "" },
      ],
    });
  }

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Order Status</span>
        <h1>Track Your Order</h1>
        <p className={styles.heroSub}>
          Enter your order ID and email address to get real-time delivery updates.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.trackBox}>
          <h2>Find My Order</h2>
          <p>Your order ID can be found in your confirmation email.</p>
          <form className={styles.form} onSubmit={handleTrack}>
            <div className={styles.field}>
              <label htmlFor="orderId">Order ID</label>
              <input
                id="orderId"
                type="text"
                placeholder="e.g. TA-20260415-001"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="trackEmail">Email Address</label>
              <input
                id="trackEmail"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.submitBtn}>Track Order</button>
          </form>
        </div>

        {result && (
          <div style={{ maxWidth: 520, margin: "2.5rem auto 0", background: "#fff", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Order <strong>{result.id}</strong> · ETA: <strong>{result.eta}</strong></p>
            <h3 style={{ margin: "0.5rem 0 1.5rem", color: "var(--accent)" }}>Status: {result.status}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {result.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: step.done ? "var(--accent)" : "#e5e7eb", color: step.done ? "#fff" : "#9ca3af", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0
                  }}>
                    {step.done ? "✓" : i + 1}
                  </span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem", color: step.done ? "var(--text)" : "var(--muted)" }}>{step.label}</p>
                    {step.date && <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--muted)" }}>{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
