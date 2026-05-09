"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  Mail, 
  FileText, 
  X,
  User,
  Package,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
  Check
} from "lucide-react";
import styles from "./AdminProductsList.module.css";

export default function AdminEnquiriesList({ token }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  


  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/enquiries`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch enquiries");
    } finally {
      setLoading(false);
    }
  };



  const handleUpdateEnquiry = async (id, updates) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/enquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      
      const data = await res.json();
      if (data.success) {
        setEnquiries(enquiries.map(enq => enq._id === id ? { ...enq, ...updates } : enq));
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, ...updates });
        }
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const openModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setAdminNotes(enquiry.adminNotes || "");
  };

  const closeModal = () => {
    setSelectedEnquiry(null);
    setAdminNotes("");
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    const success = await handleUpdateEnquiry(selectedEnquiry._id, { adminNotes });
    if (success) {
      // Toast logic can be added here
    }
  };

  const filteredEnquiries = enquiries.filter(enq => {
    const matchesSearch = 
      (enq.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
      (enq.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (enq.product?.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || enq.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className={styles.loading}>Curating customer enquiries...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Mail size={24} color="#0f172a" />
          <h2 style={{ margin: 0 }}>Product Enquiries</h2>
        </div>
        <span className={styles.countBadge}>{filteredEnquiries.length} Enquiries</span>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '1.5rem', 
        background: '#fff', 
        padding: '1.25rem', 
        borderRadius: '16px',
        boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
        border: '1px solid #f1f5f9'
      }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search name, email, or product..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 2.75rem', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0',
              outline: 'none',
              fontSize: '0.95rem'
            }}
          />
        </div>
        <div style={{ position: 'relative', minWidth: '180px' }}>
          <Filter size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ 
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.75rem', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0', 
              backgroundColor: '#fff',
              fontSize: '0.95rem',
              appearance: 'none',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {filteredEnquiries.length === 0 ? (
        <div style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center', 
          background: '#fff', 
          borderRadius: '16px',
          border: '1px dashed #e2e8f0',
          color: '#64748b'
        }}>
          <AlertCircle size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
          <p>No enquiries found matching your current filters.</p>
        </div>
      ) : (
        <div className={styles.tableWrapper} style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
          <table className={styles.table}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={14} /> Date</div></th>
                <th><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={14} /> Customer</div></th>
                <th><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Package size={14} /> Product</div></th>
                <th><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={14} /> Status</div></th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((enq) => (
                <tr key={enq._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ fontSize: '0.9rem', color: '#64748b' }}>{new Date(enq.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td>
                    <div style={{fontWeight: '600', color: '#0f172a'}}>{enq.name}</div>
                    <div style={{fontSize: '0.8rem', color: '#94a3b8'}}>{enq.email}</div>
                  </td>
                  <td>
                    <div style={{fontWeight: '600', color: '#334155'}}>{enq.product?.name || "Unknown Product"}</div>
                    <div style={{fontSize: '0.85rem', color: '#10b981', fontWeight: '700'}}>₹{enq.price?.toLocaleString() || "N/A"}</div>
                  </td>
                  <td>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <select 
                        value={enq.status} 
                        onChange={(e) => handleUpdateEnquiry(enq._id, { status: e.target.value })}
                        style={{ 
                          padding: '0.35rem 0.75rem', 
                          borderRadius: '999px', 
                          border: 'none', 
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundColor: enq.status === 'Pending' ? '#fef3c7' : enq.status === 'Resolved' ? '#dcfce7' : '#e0f2fe',
                          color: enq.status === 'Pending' ? '#92400e' : enq.status === 'Resolved' ? '#166534' : '#075985'
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => openModal(enq)}
                      className={styles.secondaryButton}
                      style={{ 
                        padding: '0.5rem 1rem', 
                        fontSize: '0.8rem', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <Eye size={14} />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedEnquiry && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '24px', 
            width: '100%', 
            maxWidth: '900px', 
            maxHeight: '90vh', 
            overflow: 'hidden', 
            display: 'flex', 
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: '#f1f5f9', borderRadius: '10px' }}>
                  <MessageSquare size={20} color="#0f172a" />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>Enquiry Details</h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>ID: {selectedEnquiry._id}</p>
                </div>
              </div>
              <button onClick={closeModal} style={{ background: '#f1f5f9', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', color: '#64748b', display: 'flex' }}><X size={20} /></button>
            </div>

            <div style={{ padding: '2rem', overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
              <div>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <User size={16} color="#3b82f6" />
                    <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', margin: 0, letterSpacing: '0.1em', fontWeight: '700' }}>Customer Contact</h3>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                    <p style={{ margin: '0 0 0.75rem 0', display: 'flex', justifyContent: 'space-between' }}><strong>Name:</strong> <span>{selectedEnquiry.name}</span></p>
                    <p style={{ margin: '0 0 0.75rem 0', display: 'flex', justifyContent: 'space-between' }}><strong>Email:</strong> <a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>{selectedEnquiry.email}</a></p>
                    <p style={{ margin: '0 0 0.75rem 0', display: 'flex', justifyContent: 'space-between' }}><strong>Phone:</strong> <span>{selectedEnquiry.phone || 'N/A'}</span></p>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Package size={16} color="#f59e0b" />
                    <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', margin: 0, letterSpacing: '0.1em', fontWeight: '700' }}>Interested Product</h3>
                  </div>
                  <div style={{ background: '#fffbeb', padding: '1.25rem', borderRadius: '16px', border: '1px solid #fef3c7' }}>
                    <p style={{ margin: '0 0 0.75rem 0', display: 'flex', justifyContent: 'space-between' }}><strong>Model:</strong> <span>{selectedEnquiry.product?.name}</span></p>
                    <p style={{ margin: '0 0 0.75rem 0', display: 'flex', justifyContent: 'space-between' }}><strong>List Price:</strong> <span style={{ color: '#b45309', fontWeight: '700' }}>₹{selectedEnquiry.price?.toLocaleString()}</span></p>
                    {selectedEnquiry.message && (
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #fef3c7' }}>
                        <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#b45309' }}>CUSTOMER MESSAGE:</strong>
                        <div style={{ fontSize: '0.9rem', color: '#451a03', fontStyle: 'italic', lineHeight: '1.5' }}>"{selectedEnquiry.message}"</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>


                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <FileText size={16} color="#10b981" />
                    <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', margin: 0, letterSpacing: '0.1em', fontWeight: '700' }}>Admin Worknotes</h3>
                  </div>
                  <textarea 
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Document private team notes..."
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      borderRadius: '16px', 
                      border: '1px solid #e2e8f0', 
                      minHeight: '80px', 
                      resize: 'none',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  <button 
                    onClick={handleSaveNotes}
                    className={styles.primaryButton}
                    style={{ marginTop: '0.75rem', padding: '0.6rem 1.25rem', fontSize: '0.85rem', width: '100%', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <CheckCircle size={16} />
                    Update Worknotes
                  </button>
                </div>
              </div>
            </div>

            <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', gap: '1rem', background: '#f8fafc', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                <Clock size={14} />
                Received on {new Date(selectedEnquiry.createdAt).toLocaleString()}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a 
                  href={`mailto:${selectedEnquiry.email}?subject=Regarding your enquiry about ${selectedEnquiry.product?.name}`}
                  style={{ 
                    textDecoration: 'none', 
                    padding: '0.75rem 1.5rem', 
                    backgroundColor: '#fff', 
                    color: '#0f172a', 
                    borderRadius: '12px', 
                    fontSize: '0.9rem', 
                    fontWeight: '700',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Mail size={16} />
                  Send Final Email
                </a>
                <button 
                  onClick={closeModal}
                  className={styles.primaryButton}
                  style={{ padding: '0.75rem 2rem', borderRadius: '12px' }}
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
