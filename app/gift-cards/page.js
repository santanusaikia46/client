import styles from "../info.module.css";

export const metadata = {
  title: "Gift Cards | TatiAssam",
  description: "Give the gift of authentic Assamese ethnic wear with a TatiAssam gift card.",
};

const denominations = [
  { amount: "₹500", gradient: "linear-gradient(135deg, #394B3F 0%, #6aad7e 100%)" },
  { amount: "₹1,000", gradient: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)" },
  { amount: "₹2,000", gradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)" },
  { amount: "₹5,000", gradient: "linear-gradient(135deg, #be123c 0%, #fb7185 100%)" },
];

export default function GiftCardsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>The Perfect Present</span>
        <h1>Gift Cards</h1>
        <p className={styles.heroSub}>
          Can&rsquo;t decide? Let someone you love choose their own piece of Assam&rsquo;s
          heritage with a TatiAssam gift card.
        </p>
      </div>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Choose a Denomination</h2>
        <p className={styles.prose}>
          Gift cards are delivered instantly via email and are valid for 12 months. They can be
          used on any product on TatiAssam, including sale items.
        </p>

        <div className={styles.giftGrid}>
          {denominations.map((d) => (
            <div
              key={d.amount}
              className={styles.giftCard}
              style={{ background: d.gradient }}
            >
              <div className={styles.giftCardAmount}>{d.amount}</div>
              <div className={styles.giftCardLabel}>TatiAssam Gift Card</div>
            </div>
          ))}
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>⚡</div>
            <h3>Instant Delivery</h3>
            <p>Gift cards are sent to the recipient&rsquo;s email within minutes of purchase.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🗓️</div>
            <h3>Valid 12 Months</h3>
            <p>Plenty of time to browse our collections and find the perfect piece.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🛍️</div>
            <h3>Any Product</h3>
            <p>Redeemable against any item in our store — no restrictions or exclusions.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>💳</div>
            <h3>Custom Amount</h3>
            <p>Need a different value? Contact us and we&rsquo;ll create a custom gift card for you.</p>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>How to Redeem</h2>
        <p className={styles.prose}>
          At checkout, enter your gift card code in the <strong>Promo / Gift Card</strong> field.
          The balance will be deducted from your order total automatically. Any remaining balance
          stays on the card for your next purchase.
        </p>
      </div>
    </main>
  );
}
