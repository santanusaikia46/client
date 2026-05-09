"use client";

import { useEffect, useState } from "react";
import { 
  ShoppingCart, 
  User, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Truck,
  Eye,
  IndianRupee,
  MoreHorizontal
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import styles from "./AdminDashboardPanel.module.css";

export default function AdminOrdersList() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setOrders(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchOrders();
  }, [token]);

  const markDelivered = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${id}/deliver`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(o => o._id === id ? data.data : o));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className={styles.loading}>Loading order history...</div>;

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.headerRow} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShoppingCart size={24} color="#0f172a" />
          <h2 style={{ margin: 0 }}>Fulfillment & Orders</h2>
        </div>
        <div style={{ padding: '0.4rem 1rem', background: '#f1f5f9', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>
          {orders.length} Total Orders
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <table className={styles.table}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Management</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>#{order._id.slice(-8).toUpperCase()}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ padding: '0.4rem', background: '#f1f5f9', borderRadius: '50%' }}><User size={14} /></div>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{order.user?.name || "Guest User"}</span>
                  </div>
                </td>
                <td style={{ fontSize: '0.9rem', color: '#64748b' }}>{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, color: '#10b981' }}>
                    <IndianRupee size={14} />
                    {order.totalPrice.toLocaleString()}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div title="Payment Status" style={{ padding: '0.35rem 0.6rem', background: order.isPaid ? '#dcfce7' : '#fee2e2', color: order.isPaid ? '#166534' : '#991b1b', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {order.isPaid ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {order.isPaid ? 'PAID' : 'PENDING'}
                    </div>
                    <div title="Delivery Status" style={{ padding: '0.35rem 0.6rem', background: order.isDelivered ? '#e0f2fe' : '#f1f5f9', color: order.isDelivered ? '#075985' : '#64748b', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Truck size={12} />
                      {order.isDelivered ? 'DELIVERED' : 'PROCESSING'}
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {!order.isDelivered && (
                    <button 
                      onClick={() => markDelivered(order._id)} 
                      style={{ 
                        padding: '0.5rem 1rem', 
                        borderRadius: '8px', 
                        background: '#0f172a', 
                        color: '#fff', 
                        border: 'none', 
                        fontSize: '0.8rem', 
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      Ship Order
                    </button>
                  )}
                  {order.isDelivered && (
                    <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                      <MoreHorizontal size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  No orders found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
