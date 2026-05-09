import styles from "../info.module.css";

export const metadata = {
  title: "Shipping & Returns | TatiAssam",
  description: "Full details on TatiAssam's shipping options, delivery times, and hassle-free return policy.",
};

export default function ShippingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Delivery & Returns</span>
        <h1>Shipping &amp; Returns</h1>
        <p className={styles.heroSub}>
          Transparent delivery timelines and a no-fuss return policy, because your satisfaction
          is our priority.
        </p>
      </div>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Shipping Options</h2>
        <table className={styles.infoTable}>
          <thead>
            <tr>
              <th>Option</th>
              <th>Delivery Time</th>
              <th>Charge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Standard Shipping</td>
              <td>5–7 Business Days</td>
              <td>Free on orders over ₹999; ₹79 otherwise</td>
            </tr>
            <tr>
              <td>Express Shipping</td>
              <td>2–3 Business Days</td>
              <td>₹199</td>
            </tr>
            <tr>
              <td>Same-Day (Select Cities)</td>
              <td>By 8 PM if ordered before 11 AM</td>
              <td>₹299</td>
            </tr>
            <tr>
              <td>International</td>
              <td>10–15 Business Days</td>
              <td>Calculated at checkout</td>
            </tr>
          </tbody>
        </table>

        <h2 className={styles.sectionTitle}>Order Processing</h2>
        <p className={styles.prose}>
          Orders are processed within 1–2 business days of payment confirmation. Custom or
          made-to-order items may take an additional 3–5 days. You will receive a shipping
          confirmation with tracking details once your order is dispatched.
        </p>

        <h2 className={styles.sectionTitle}>Return Policy</h2>
        <p className={styles.prose}>
          We offer a <strong>7-day return window</strong> from the date of delivery. To be eligible
          for a return, items must be:
        </p>
        <ul className={styles.prose} style={{ paddingLeft: "1.5rem" }}>
          <li>Unworn and unwashed</li>
          <li>In original packaging with all tags attached</li>
          <li>Free from perfume, stains, or any signs of use</li>
        </ul>
        <p className={styles.prose}>
          Sale items are eligible for exchange only, not refunds, unless the item arrived damaged.
        </p>

        <h2 className={styles.sectionTitle}>How to Initiate a Return</h2>
        <table className={styles.infoTable}>
          <thead>
            <tr>
              <th>Step</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Email <strong>returns@tatiassam.com</strong> with your order number and reason for return.</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Our team will respond within 24 hours with a prepaid return label.</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Pack the item securely and hand it to the courier.</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Once received and inspected, your refund will be processed within 5–7 business days.</td>
            </tr>
          </tbody>
        </table>

        <h2 className={styles.sectionTitle}>Refund Methods</h2>
        <p className={styles.prose}>
          Refunds are issued to the original payment method. UPI and net banking refunds typically
          appear within 3–5 business days; card refunds may take up to 7–10 business days depending
          on your bank.
        </p>
      </div>
    </main>
  );
}
