"use client";

import { useEffect, useState } from 'react';
import { 
  BookOpen, 
  User, 
  Tag, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  RefreshCcw, 
  Clock,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import styles from './AdminProductsList.module.css';

const AdminBlogsList = () => {
  const { token } = useAuth();
  const { addToast } = useToast();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/admin/all`, {
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

  useEffect(() => {
    if (token) fetchBlogs();
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        addToast(`Story ${status} successfully`, 'success');
        fetchBlogs();
      } else {
        addToast(data.message, 'error');
      }
    } catch (err) {
      addToast('Failed to update story status', 'error');
    }
  };

  if (loading) return <div className={styles.loading}>Curating heritage stories...</div>;

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.headerRow} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BookOpen size={24} color="#0f172a" />
          <h2 style={{ margin: 0 }}>Heritage Stories Moderation</h2>
        </div>
        <div style={{ padding: '0.4rem 1rem', background: '#f1f5f9', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>
          {blogs.length} Stories Total
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <table className={styles.table}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th>Story Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Moderation</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td>
                  <div style={{ fontWeight: '700', color: '#0f172a' }}>{blog.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                    <Calendar size={12} />
                    {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ padding: '0.4rem', background: '#f1f5f9', borderRadius: '50%' }}><User size={14} /></div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{blog.author?.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{blog.author?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
                    <Tag size={12} />
                    {blog.tag}
                  </div>
                </td>
                <td>
                  <div style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '999px', 
                    fontSize: '0.75rem', 
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    background: blog.status === 'approved' ? '#f0fdf4' : blog.status === 'pending' ? '#fff7ed' : '#fef2f2',
                    color: blog.status === 'approved' ? '#166534' : blog.status === 'pending' ? '#9a3412' : '#991b1b',
                    border: '1px solid currentColor',
                    borderOpacity: 0.1
                  }}>
                    {blog.status === 'approved' ? <CheckCircle size={12} /> : blog.status === 'pending' ? <Clock size={12} /> : <XCircle size={12} />}
                    {blog.status}
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    {blog.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(blog._id, 'approved')}
                          style={{ padding: '0.5rem 1rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                        >
                          <CheckCircle size={14} />
                          Approve
                        </button>
                        <button 
                          onClick={() => handleStatusChange(blog._id, 'rejected')}
                          style={{ padding: '0.5rem 1rem', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                        >
                          <XCircle size={14} />
                          Reject
                        </button>
                      </>
                    )}
                    {blog.status !== 'pending' && (
                      <button 
                        onClick={() => handleStatusChange(blog._id, 'pending')}
                        style={{ padding: '0.5rem 1rem', background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <RefreshCcw size={14} />
                        Re-evaluate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  No heritage stories submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogsList;
