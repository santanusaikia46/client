"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, MessageCircle, User, List, Send, CheckCircle2 } from "lucide-react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className={styles.page}>
      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />

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
          <div className={styles.contactInfoCard}>
            <h2 className={styles.sectionTitle}>Our Details</h2>

            <div className={styles.contactItem}>
              <div className={styles.contactItemIconWrap}>
                <MapPin size={24} />
              </div>
              <div>
                <h4>Address</h4>
                <p>Sonari Patty, New Market Road<br />Dibrugarh, Assam - 786001<br />India</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactItemIconWrap}>
                <Mail size={24} />
              </div>
              <div>
                <h4>Email</h4>
                <p>tatiassam22@gmail.com<br />info.tatiassam@gmail.com</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactItemIconWrap}>
                <Phone size={24} />
              </div>
              <div>
                <h4>Mobile / WhatsApp</h4>
                <p>+91 93875 55306<br />Mon–Sat, 9 AM – 6 PM IST</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactItemIconWrap}>
                <MessageCircle size={24} />
              </div>
              <div>
                <h4>Live Chat</h4>
                <p>Available on our website<br />Mon–Sat, 10 AM – 5 PM IST</p>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}>Send a Message</h2>

            {sent ? (
              <div className={styles.successMsg}>
                <div className={styles.successIconWrap}>
                  <CheckCircle2 size={40} />
                </div>
                <h3>Message Received!</h3>
                <p>
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="contactName">Full Name</label>
                    <div className={styles.inputWrapper}>
                      <User className={styles.inputIcon} size={20} />
                      <input id="contactName" type="text" placeholder="Your name" required />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contactEmail">Email</label>
                    <div className={styles.inputWrapper}>
                      <Mail className={styles.inputIcon} size={20} />
                      <input id="contactEmail" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contactSubject">Subject</label>
                  <div className={styles.inputWrapper}>
                    <List className={styles.inputIcon} size={20} />
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
                </div>

                <div className={styles.field}>
                  <label htmlFor="contactMessage">Message</label>
                  <textarea id="contactMessage" placeholder="Tell us how we can help…" required />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
