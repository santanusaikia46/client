"use client";

import { useState } from "react";
import styles from "../info.module.css";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Get in Touch</span>
        <h1>Contact Us</h1>
        <p className={styles.heroSub}>
          Have a question, a custom order request, or just want to say hello?
          We&rsquo;d love to hear from you.
        </p>
      </div>

      <div className={styles.containerWide}>
        <div className={styles.contactGrid}>
          {/* Info column */}
          <div className={styles.contactInfo}>
            <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Our Details</h2>

            <div className={styles.contactItem}>
              <span className={styles.contactItemIcon}>📍</span>
              <div>
                <h4>Address</h4>
                <p>TatiAssam HQ<br />Sualkuchi Weaving District<br />Kamrup, Assam 781103, India</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactItemIcon}>📧</span>
              <div>
                <h4>Email</h4>
                <p>hello@tatiassam.com<br />support@tatiassam.com</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactItemIcon}>📞</span>
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210<br />Mon–Sat, 9 AM – 6 PM IST</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactItemIcon}>💬</span>
              <div>
                <h4>Live Chat</h4>
                <p>Available on our website<br />Mon–Sat, 10 AM – 5 PM IST</p>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div>
            <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Send a Message</h2>

            {sent ? (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "2rem", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎉</div>
                <h3 style={{ margin: "0 0 0.5rem", color: "var(--accent)" }}>Message Received!</h3>
                <p style={{ color: "var(--muted)", margin: 0 }}>
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="contactName">Full Name</label>
                    <input id="contactName" type="text" placeholder="Your name" required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contactEmail">Email</label>
                    <input id="contactEmail" type="email" placeholder="your@email.com" required />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contactSubject">Subject</label>
                  <select id="contactSubject" required defaultValue="">
                    <option value="" disabled>Select a topic…</option>
                    <option>Order Query</option>
                    <option>Return / Exchange</option>
                    <option>Custom Order</option>
                    <option>Artisan Partnership</option>
                    <option>General Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contactMessage">Message</label>
                  <textarea id="contactMessage" placeholder="Tell us how we can help…" required />
                </div>

                <button type="submit" className={styles.submitBtn}>Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
