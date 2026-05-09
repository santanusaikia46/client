"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";

export default function EnquireClient({ product, id, searchParams }) {
  const router = useRouter();

  const initialColor = searchParams.color || "";
  const initialSize = searchParams.size || "";

  // Find the price based on variant if size/color were selected
  let currentPrice = product.price;
  const hasVariants = product.variants && product.variants.length > 0;
  
  if (hasVariants) {
    const matchedVariant = product.variants.find(v => {
      const sizeMatch = !initialSize || v.size === initialSize;
      const colorMatch = !initialColor || v.color === initialColor;
      return sizeMatch && colorMatch;
    });

    if (matchedVariant) {
      currentPrice = matchedVariant.price;
    }
  }

  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "Email"
  });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: null });

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
      
      const res = await fetch(`${baseUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...enquiryForm,
          product: product.id || id,
          price: currentPrice,
          color: initialColor,
          size: initialSize,
        })
      });

      const data = await res.json();

      if (data.success) {
        setSubmitStatus({ loading: false, success: true, error: null });
        setEnquiryForm({ name: "", email: "", phone: "", message: "", preferredContact: "Email" });
      } else {
        setSubmitStatus({ loading: false, success: false, error: data.message });
      }
    } catch (error) {
      setSubmitStatus({ loading: false, success: false, error: "An error occurred. Please try again." });
    }
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.category, href: `/products?category=${product.category}` },
    { label: product.name, href: `/products/${id}` },
    { label: "Enquire", href: "#" }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem", minHeight: "80vh" }}>
      <Breadcrumbs items={breadcrumbs} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginTop: "2rem" }}>
        
        {/* Product Summary Side */}
        <div style={{ backgroundColor: "#f9fafb", padding: "2rem", borderRadius: "8px", height: "fit-content" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Product Details</h2>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }} 
            />
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>{product.name}</h3>
              <p style={{ fontSize: "1.25rem", color: "#111", marginTop: "0.5rem" }}>₹{currentPrice.toFixed(2)}</p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1.5rem" }}>
            <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Selected Options:</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: "#6b7280" }}>Color:</span> <strong>{initialColor || "Default"}</strong>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: "#6b7280" }}>Size:</span> <strong>{initialSize || "Default"}</strong>
              </li>
            </ul>
          </div>

          <div style={{ marginTop: "2rem" }}>
             <Link href={`/products/${id}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
               &larr; Back to Product
             </Link>
          </div>
        </div>

        {/* Enquiry Form Side */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>Send an Enquiry</h2>
          
          {submitStatus.success ? (
            <div style={{ color: "#10b981", padding: "1.5rem", backgroundColor: "#ecfdf5", borderRadius: "8px", border: "1px solid #a7f3d0" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Enquiry Sent!</h3>
              <p>Thank you for reaching out. Our team will review your enquiry for {product.name} and get back to you shortly.</p>
              <button 
                onClick={() => router.push("/")}
                style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", backgroundColor: "#111", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={enquiryForm.name}
                  onChange={handleEnquiryChange}
                  required
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={enquiryForm.email}
                  onChange={handleEnquiryChange}
                  required
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={enquiryForm.phone}
                  onChange={handleEnquiryChange}
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "4px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Preferred Contact Method</label>
                <select 
                  name="preferredContact"
                  value={enquiryForm.preferredContact}
                  onChange={handleEnquiryChange}
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "4px", backgroundColor: "#fff" }}
                >
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Message *</label>
                <textarea 
                  name="message"
                  value={enquiryForm.message}
                  onChange={handleEnquiryChange}
                  required
                  rows="5"
                  placeholder="Tell us what you'd like to know about this product..."
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "4px", resize: "vertical" }}
                />
              </div>
              
              {submitStatus.error && (
                <div style={{ color: "#ef4444", fontSize: "0.875rem", padding: "0.5rem", backgroundColor: "#fef2f2", borderRadius: "4px" }}>
                  {submitStatus.error}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={submitStatus.loading}
                style={{ 
                  marginTop: "1rem", 
                  padding: "0.875rem", 
                  backgroundColor: "#111", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "4px", 
                  cursor: submitStatus.loading ? "not-allowed" : "pointer",
                  fontSize: "1rem",
                  fontWeight: "500"
                }}
              >
                {submitStatus.loading ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
