"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./AdminDashboardPanel.module.css";

export default function AdminCustomersList() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success) setUsers(result.data);
      } catch (err) {
        console.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  if (loading) return <div>Loading Customers Data...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: "1.5rem" }}>Customer Relationship Management</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ fontWeight: 500 }}>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    backgroundColor: user.role === 'admin' ? '#ef4444' : '#e0e7ff',
                    color: user.role === 'admin' ? 'white' : '#3730a3'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "2rem" }}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
