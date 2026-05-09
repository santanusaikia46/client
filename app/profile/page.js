"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { User as UserIcon, Package, FileText, ChevronRight, Loader2, Mail, Edit3 } from "lucide-react";

export default function ProfilePage() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMyOrders();
    }
  }, [token]);

  if (!user) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className={styles.wrapper}>
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className={styles.pageTitle} variants={itemVariants}>My Profile</motion.h1>

        {/* Profile Info Card */}
        <motion.div className={styles.card} variants={itemVariants}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <UserIcon className={styles.cardIcon} size={24} />
              <h2 className={styles.sectionTitle}>Account Overview</h2>
            </div>
            {user.role === "admin" && (
              <span className={`${styles.badge} ${styles.warning}`}>Admin</span>
            )}
          </div>
          
          <div className={styles.profileGrid}>
            <div className={styles.infoGroup}>
              <span className={styles.infoLabel}>Full Name</span>
              <span className={styles.infoValue}>{user.name}</span>
            </div>
            <div className={styles.infoGroup}>
              <span className={styles.infoLabel}>Email Address</span>
              <span className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} className={styles.cardIcon} style={{opacity: 0.5}} />
                {user.email}
              </span>
            </div>

          </div>
        </motion.div>

        {/* Orders Card */}
        <motion.div className={styles.card} variants={itemVariants}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <Package className={styles.cardIcon} size={24} />
              <h2 className={styles.sectionTitle}>Order History</h2>
            </div>
          </div>
          
          {loading ? (
            <div className={styles.loadingState}>
              <Loader2 className={styles.spinner} size={24} />
              <span>Loading orders...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className={styles.emptyState}>
              <Package className={styles.emptyIcon} size={48} strokeWidth={1.5} />
              <p>You haven't placed any orders yet.</p>
              <Link href="/products" className={styles.primaryBtn}>
                Browse Collection
              </Link>
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.dataGrid}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td style={{ fontFamily: 'monospace', color: 'var(--muted)' }}>
                        {order._id.substring(0, 8)}...
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>₹{order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          <span className={`${styles.badge} ${styles.success}`}>Paid</span>
                        ) : (
                          <span className={`${styles.badge} ${styles.danger}`}>Pending</span>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <span className={`${styles.badge} ${styles.success}`}>Delivered</span>
                        ) : (
                          <span className={`${styles.badge} ${styles.warning}`}>Processing</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link href={`/order/${order._id}`} className={styles.outlineBtn}>
                          View <ChevronRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Blogs Card */}
        <motion.div className={styles.card} variants={itemVariants}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <FileText className={styles.cardIcon} size={24} />
              <h2 className={styles.sectionTitle}>My Heritage Stories</h2>
            </div>
            <Link href="/blog/create" className={styles.primaryBtn}>
              <Edit3 size={16} /> Write Story
            </Link>
          </div>
          <MyBlogs token={token} />
        </motion.div>
        
      </motion.div>
    </div>
  );
}

function MyBlogs({ token }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/my/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setBlogs(data.data);
      } catch (err) {
        console.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchMyBlogs();
  }, [token]);

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <Loader2 className={styles.spinner} size={24} />
        <span>Loading stories...</span>
      </div>
    );
  }
  
  if (blogs.length === 0) {
    return (
      <div className={styles.emptyState}>
        <FileText className={styles.emptyIcon} size={48} strokeWidth={1.5} />
        <p>You haven't written any stories yet. Share your heritage with the world!</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.dataGrid}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date Published</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => {
            const statusClass = blog.status === 'approved' 
              ? styles.success 
              : blog.status === 'pending' 
                ? styles.warning 
                : styles.danger;
                
            return (
              <tr key={blog._id}>
                <td style={{ fontWeight: 600 }}>{blog.title}</td>
                <td>
                  <span className={styles.badge} style={{ background: 'var(--bg-alt)', color: 'var(--text-2)' }}>
                    {blog.tag}
                  </span>
                </td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`${styles.badge} ${statusClass}`}>
                    {blog.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
