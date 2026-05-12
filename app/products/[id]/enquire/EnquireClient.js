"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import styles from "./EnquireClient.module.css";

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
    <div className={styles.container}>
      <Breadcrumbs items={breadcrumbs} />

      <div className={styles.layout}>
        
        {/* Product Summary Side */}
        <aside className={styles.productSummary}>
          <h2 className={styles.summaryTitle}>Product Details</h2>
          <div className={styles.productHeader}>
            <img 
              src={product.image} 
              alt={product.name} 
              className={styles.productImg}
            />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p className={styles.productPrice}>₹{currentPrice.toFixed(2)}</p>
            </div>
          </div>

          <div className={styles.optionsSection}>
            <h4 className={styles.optionsTitle}>Selected Options</h4>
            <div className={styles.optionsList}>
              <div className={styles.optionItem}>
                <span className={styles.optionLabel}>Color</span>
                <span className={styles.optionValue}>{initialColor || "Default"}</span>
              </div>
              <div className={styles.optionItem}>
                <span className={styles.optionLabel}>Size</span>
                <span className={styles.optionValue}>{initialSize || "Default"}</span>
              </div>
            </div>
          </div>

          <Link href={`/products/${id}`} className={styles.backLink}>
            <span>&larr;</span> Back to Product
          </Link>
        </aside>

        {/* Enquiry Form Side */}
        <main className={styles.formSide}>
          {submitStatus.success ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>✓</div>
              <h3>Enquiry Sent!</h3>
              <p>Thank you for reaching out. Our team will review your enquiry for <strong>{product.name}</strong> and get back to you shortly via your preferred contact method.</p>
              <button 
                onClick={() => router.push("/")}
                className={styles.continueBtn}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <h2 className={styles.formTitle}>Send an Enquiry</h2>
              <form onSubmit={handleEnquirySubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={enquiryForm.name}
                    onChange={handleEnquiryChange}
                    required
                    className={styles.input}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={enquiryForm.email}
                    onChange={handleEnquiryChange}
                    required
                    className={styles.input}
                    placeholder="name@example.com"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={enquiryForm.phone}
                    onChange={handleEnquiryChange}
                    className={styles.input}
                    placeholder="+91 00000 00000"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Preferred Contact Method</label>
                  <select 
                    name="preferredContact"
                    value={enquiryForm.preferredContact}
                    onChange={handleEnquiryChange}
                    className={styles.select}
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Message *</label>
                  <textarea 
                    name="message"
                    value={enquiryForm.message}
                    onChange={handleEnquiryChange}
                    required
                    rows="5"
                    className={styles.textarea}
                    placeholder="Tell us what you'd like to know about this product..."
                  />
                </div>
                
                {submitStatus.error && (
                  <div className={styles.error}>
                    {submitStatus.error}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={submitStatus.loading}
                  className={styles.submitBtn}
                >
                  {submitStatus.loading ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            </>
          )}
        </main>

      </div>
    </div>
  );
}
