import styles from "../info.module.css";

export const metadata = {
  title: "Terms of Service | TatiAssam",
  description: "Read TatiAssam's Terms of Service governing the use of our website and purchase of our products.",
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Legal</span>
        <h1>Terms of Service</h1>
        <p className={styles.heroSub}>
          Last updated: April 18, 2026 · Please read these terms carefully before using TatiAssam.
        </p>
      </div>

      <div className={styles.container}>
        <p className={styles.prose}>
          These Terms of Service ("Terms") govern your access to and use of the TatiAssam website
          operated by <strong>TatiAssam Handlooms Pvt. Ltd.</strong> By using our website or
          placing an order, you confirm you are at least 18 years old and agree to these Terms.
        </p>

        <h2 className={styles.sectionTitle}>1. Use of the Website</h2>
        <p className={styles.prose}>You agree to use TatiAssam only for lawful purposes. You must not:</p>
        <ul className={styles.prose} style={{ paddingLeft: "1.5rem", lineHeight: 2 }}>
          <li>Violate any applicable local, national, or international law.</li>
          <li>Transmit unsolicited commercial communications (spam).</li>
          <li>Attempt unauthorised access to our servers, databases, or user accounts.</li>
          <li>Engage in automated scraping or data extraction without written consent.</li>
          <li>Post content that is defamatory, offensive, or infringes third-party rights.</li>
        </ul>

        <h2 className={styles.sectionTitle}>2. Account Registration</h2>
        <p className={styles.prose}>
          You are responsible for maintaining the confidentiality of your login credentials and
          all activity under your account. Notify us immediately at{" "}
          <a href="mailto:support@tatiassam.com" style={{ color: "var(--accent)", fontWeight: 600 }}>support@tatiassam.com</a>{" "}
          if you suspect unauthorised use. We reserve the right to terminate accounts that violate
          these Terms.
        </p>

        <h2 className={styles.sectionTitle}>3. Orders &amp; Pricing</h2>
        <p className={styles.prose}>
          All prices are in Indian Rupees (₹) inclusive of applicable GST. We reserve the right
          to modify prices without notice. A contract is formed when we send your order confirmation
          email. We may cancel orders due to stock issues, pricing errors, or suspected fraud —
          in which case a full refund will be issued.
        </p>

        <h2 className={styles.sectionTitle}>4. Payment</h2>
        <p className={styles.prose}>
          Payments are processed via secure third-party gateways (currently Razorpay). By providing
          payment details you confirm you are authorised to use that payment method. TatiAssam does
          not store raw card or UPI credentials.
        </p>

        <h2 className={styles.sectionTitle}>5. Shipping &amp; Delivery</h2>
        <p className={styles.prose}>
          Delivery timelines are estimates and may vary due to circumstances beyond our control.
          For full details, see our{" "}
          <a href="/shipping" style={{ color: "var(--accent)", fontWeight: 600 }}>Shipping &amp; Returns page</a>.
        </p>

        <h2 className={styles.sectionTitle}>6. Returns &amp; Refunds</h2>
        <p className={styles.prose}>
          Our return policy is described on our{" "}
          <a href="/shipping" style={{ color: "var(--accent)", fontWeight: 600 }}>Shipping &amp; Returns page</a>{" "}
          and forms part of these Terms. By placing an order you agree to that policy.
        </p>

        <h2 className={styles.sectionTitle}>7. Intellectual Property</h2>
        <p className={styles.prose}>
          All content on TatiAssam — text, images, logos, product photographs, and software — is
          the exclusive property of TatiAssam Handlooms Pvt. Ltd. and is protected by Indian and
          international copyright and trademark law. Reproduction or commercial use without our
          written permission is prohibited.
        </p>

        <h2 className={styles.sectionTitle}>8. Product Descriptions &amp; Colours</h2>
        <p className={styles.prose}>
          Due to the handcrafted nature of our products and monitor colour variation, actual
          colours and textures may differ slightly from website images. Minor variations are not
          grounds for return unless the product fundamentally differs from its description.
        </p>

        <h2 className={styles.sectionTitle}>9. Limitation of Liability</h2>
        <p className={styles.prose}>
          To the fullest extent permitted by law, TatiAssam shall not be liable for any indirect,
          incidental, or consequential damages. Our total liability for any claim shall not exceed
          the amount you paid for the specific order giving rise to that claim.
        </p>

        <h2 className={styles.sectionTitle}>10. Governing Law</h2>
        <p className={styles.prose}>
          These Terms are governed by the laws of India. Disputes shall be subject to the exclusive
          jurisdiction of courts in Kamrup, Assam. Contact us at{" "}
          <a href="mailto:legal@tatiassam.com" style={{ color: "var(--accent)", fontWeight: 600 }}>legal@tatiassam.com</a>{" "}
          to resolve disputes amicably before initiating legal proceedings.
        </p>

        <h2 className={styles.sectionTitle}>11. Changes to These Terms</h2>
        <p className={styles.prose}>
          We may update these Terms at any time. Material changes will be notified by posting the
          revised Terms on this page. Continued use after changes constitutes acceptance.
        </p>

        <h2 className={styles.sectionTitle}>12. Contact</h2>
        <p className={styles.prose}>
          <strong>TatiAssam Handlooms Pvt. Ltd.</strong><br />
          Email: <a href="mailto:legal@tatiassam.com" style={{ color: "var(--accent)" }}>legal@tatiassam.com</a><br />
          Address: Sualkuchi Weaving District, Kamrup, Assam 781103, India
        </p>
      </div>
    </main>
  );
}
