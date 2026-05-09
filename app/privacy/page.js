import styles from "../info.module.css";

export const metadata = {
  title: "Privacy Policy | TatiAssam",
  description: "Learn how TatiAssam collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Legal</span>
        <h1>Privacy Policy</h1>
        <p className={styles.heroSub}>
          Last updated: April 18, 2026 &nbsp;·&nbsp; Effective: April 18, 2026
        </p>
      </div>

      <div className={styles.container}>
        <p className={styles.prose}>
          At <strong>TatiAssam</strong> ("we", "us", or "our"), we are committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, store, share, and safeguard
          your personal information when you visit our website at{" "}
          <a href="https://tatiassam.com" style={{ color: "var(--accent)", fontWeight: 600 }}>tatiassam.com</a> or
          make a purchase from us. Please read this policy carefully.
        </p>
        <p className={styles.prose}>
          By using TatiAssam you agree to the collection and use of information in accordance with
          this policy. If you do not agree, please refrain from using our services.
        </p>

        {/* 1 */}
        <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
        <p className={styles.prose}>We collect the following categories of information:</p>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>👤</div>
            <h3>Account Information</h3>
            <p>Name, email address, and password when you create an account or check out as a guest.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📦</div>
            <h3>Order &amp; Payment Data</h3>
            <p>Shipping address, billing details, and transaction records. Payment card data is processed by secure third-party gateways — we never store raw card numbers.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌐</div>
            <h3>Usage &amp; Device Data</h3>
            <p>IP address, browser type, pages visited, time spent, referral URLs, and device identifiers collected via cookies and analytics tools.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>💬</div>
            <h3>Communications</h3>
            <p>Messages sent to our support team, product reviews you leave, and newsletter subscription data.</p>
          </div>
        </div>

        {/* 2 */}
        <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
        <p className={styles.prose}>We use your data to:</p>
        <ul className={styles.prose} style={{ paddingLeft: "1.5rem", lineHeight: 2 }}>
          <li>Process and fulfil your orders and handle returns or exchanges.</li>
          <li>Send transactional emails (order confirmations, shipping updates, invoices).</li>
          <li>Respond to customer support enquiries.</li>
          <li>Send promotional emails and newsletters (only with your consent — unsubscribe any time).</li>
          <li>Improve our website, product catalogue, and personalisation algorithms.</li>
          <li>Detect and prevent fraud, unauthorised transactions, and security threats.</li>
          <li>Comply with applicable Indian laws and regulations.</li>
        </ul>

        {/* 3 */}
        <h2 className={styles.sectionTitle}>3. Sharing of Your Information</h2>
        <p className={styles.prose}>
          We <strong>do not sell</strong> your personal data. We share information only in the
          following limited circumstances:
        </p>
        <table className={styles.infoTable}>
          <thead>
            <tr><th>Recipient</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td>Logistics Partners (e.g. Delhivery, Shiprocket)</td><td>To deliver your orders</td></tr>
            <tr><td>Payment Gateways (e.g. Razorpay)</td><td>To process secure payments</td></tr>
            <tr><td>Email Service Providers</td><td>To send transactional and marketing emails</td></tr>
            <tr><td>Analytics Providers (e.g. Google Analytics)</td><td>To understand website usage (anonymised)</td></tr>
            <tr><td>Legal Authorities</td><td>When required by law, court order, or to protect rights</td></tr>
          </tbody>
        </table>

        {/* 4 */}
        <h2 className={styles.sectionTitle}>4. Cookies</h2>
        <p className={styles.prose}>
          We use cookies and similar tracking technologies to enhance your experience. For full
          details, please read our{" "}
          <a href="/cookies" style={{ color: "var(--accent)", fontWeight: 600 }}>Cookie Policy</a>.
          You can manage your cookie preferences at any time via your browser settings.
        </p>

        {/* 5 */}
        <h2 className={styles.sectionTitle}>5. Data Retention</h2>
        <p className={styles.prose}>
          We retain your personal data for as long as your account is active or as needed to fulfil
          our legal obligations. Order records are kept for a minimum of 5 years as required under
          the Indian Goods and Services Tax (GST) Act. You may request deletion of your account
          data at any time (subject to legal retention obligations).
        </p>

        {/* 6 */}
        <h2 className={styles.sectionTitle}>6. Your Rights</h2>
        <p className={styles.prose}>Under applicable law, you have the right to:</p>
        <ul className={styles.prose} style={{ paddingLeft: "1.5rem", lineHeight: 2 }}>
          <li><strong>Access</strong> — Request a copy of the personal data we hold about you.</li>
          <li><strong>Correction</strong> — Ask us to correct inaccurate or incomplete data.</li>
          <li><strong>Deletion</strong> — Request deletion of your data ("right to be forgotten"), subject to legal obligations.</li>
          <li><strong>Opt-Out</strong> — Unsubscribe from marketing communications at any time via the link in our emails.</li>
          <li><strong>Data Portability</strong> — Request your data in a structured, machine-readable format.</li>
        </ul>
        <p className={styles.prose}>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:privacy@tatiassam.com" style={{ color: "var(--accent)", fontWeight: 600 }}>
            privacy@tatiassam.com
          </a>.
        </p>

        {/* 7 */}
        <h2 className={styles.sectionTitle}>7. Security</h2>
        <p className={styles.prose}>
          We implement industry-standard security measures including SSL/TLS encryption, secure
          server infrastructure, and access controls to protect your data. However, no method of
          transmission over the Internet is 100% secure and we cannot guarantee absolute security.
        </p>

        {/* 8 */}
        <h2 className={styles.sectionTitle}>8. Third-Party Links</h2>
        <p className={styles.prose}>
          Our website may contain links to third-party sites. We are not responsible for the
          privacy practices or content of those sites. We encourage you to review their privacy
          policies before providing any personal information.
        </p>

        {/* 9 */}
        <h2 className={styles.sectionTitle}>9. Children&rsquo;s Privacy</h2>
        <p className={styles.prose}>
          TatiAssam is not directed at children under 13 years of age. We do not knowingly collect
          personal information from children. If you believe a child has provided us with data,
          please contact us immediately and we will delete it.
        </p>

        {/* 10 */}
        <h2 className={styles.sectionTitle}>10. Changes to This Policy</h2>
        <p className={styles.prose}>
          We may update this Privacy Policy from time to time. We will notify you of significant
          changes by posting the new policy on this page and updating the "Last updated" date
          above. Continued use of TatiAssam after changes constitutes acceptance of the updated
          policy.
        </p>

        {/* 11 */}
        <h2 className={styles.sectionTitle}>11. Contact Us</h2>
        <p className={styles.prose}>
          For any privacy-related questions, concerns, or requests, please reach us at:
        </p>
        <p className={styles.prose}>
          <strong>TatiAssam — Data Privacy Team</strong><br />
          Email: <a href="mailto:privacy@tatiassam.com" style={{ color: "var(--accent)" }}>privacy@tatiassam.com</a><br />
          Address: Sualkuchi Weaving District, Kamrup, Assam 781103, India<br />
          Phone: +91 98765 43210
        </p>
      </div>
    </main>
  );
}
