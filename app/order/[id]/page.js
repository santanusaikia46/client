"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import styles from "./page.module.css";

export default function OrderPage({ params }) {
  const unwrappedParams = use(params);
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${unwrappedParams.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setOrder(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    if (token && unwrappedParams.id) {
      fetchOrder();
    }
  }, [unwrappedParams.id, token]);

  const handlePayment = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${unwrappedParams.id}/pay`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setOrder(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className={styles.container}>Loading order...</div>;
  if (error) return <div className={styles.container}><div className={styles.danger}>{error}</div></div>;
  if (!order) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order {order._id}</h1>

      <div className={styles.orderLayout}>
        <div className={styles.details}>
          <div className={styles.section}>
            <h2>Shipping</h2>
            <p><strong>Name: </strong> {order.user?.name}</p>
            <p><strong>Email: </strong> <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a></p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className={`${styles.statusMessage} ${styles.success}`}>
                Delivered on {new Date(order.deliveredAt).toLocaleString()}
              </div>
            ) : (
              <div className={`${styles.statusMessage} ${styles.danger}`}>Not Delivered</div>
            )}
          </div>

          <div className={styles.section}>
            <h2>Payment Method</h2>
            <p><strong>Method: </strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className={`${styles.statusMessage} ${styles.success}`}>
                Paid on {new Date(order.paidAt).toLocaleString()}
              </div>
            ) : (
              <div className={`${styles.statusMessage} ${styles.danger}`}>Not Paid</div>
            )}
          </div>

          <div className={styles.section}>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <p>Order is empty</p>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <img src={item.image} alt={item.name} className={styles.image} />
                    <Link href={`/products/${item.product}`} className={styles.itemLink}>
                      {item.name}
                    </Link>
                    <div>
                      {item.qty} x ₹{item.price.toFixed(2)} = ₹{(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Items</span>
            <span>₹{order.totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>₹0.00</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax</span>
            <span>₹0.00</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>₹{order.totalPrice.toFixed(2)}</span>
          </div>
          
          {!order.isPaid && (
            <button className={styles.payButton} onClick={handlePayment}>
              Simulate Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
