import styles from "../info.module.css";

export const metadata = {
  title: "Sustainability | TatiAssam",
  description: "How TatiAssam is committed to sustainable, eco-friendly, and ethical fashion rooted in Assam's traditions.",
};

const goals = [
  { label: "Natural / Plant-Based Dyes", value: 80 },
  { label: "Recyclable Packaging", value: 95 },
  { label: "Artisans Paid Fair Trade Wages", value: 100 },
  { label: "Carbon-Offset Deliveries", value: 60 },
];

export default function SustainabilityPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Our Commitment</span>
        <h1>Fashion That Cares for the Earth</h1>
        <p className={styles.heroSub}>
          Sustainability is not a marketing tagline at TatiAssam — it is woven into every decision
          we make, from raw material to your doorstep.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.statRow}>
          <div className={styles.statBox}>
            <span className={styles.statNum}>80%</span>
            <span className={styles.statLabel}>Natural Dyes Used</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>0</span>
            <span className={styles.statLabel}>Child Labour Partners</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Fair Trade Wages</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>95%</span>
            <span className={styles.statLabel}>Recyclable Packaging</span>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Our Progress Toward a Greener Future</h2>
        <p className={styles.prose}>
          We track our sustainability goals transparently and publish updates annually. Here&rsquo;s
          where we stand today:
        </p>

        {goals.map((g) => (
          <div key={g.label} className={styles.progressItem}>
            <div className={styles.progressLabel}>
              <span>{g.label}</span>
              <span>{g.value}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${g.value}%` }} />
            </div>
          </div>
        ))}

        <h2 className={styles.sectionTitle}>How We Do It</h2>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌱</div>
            <h3>Natural Dyes</h3>
            <p>We source colours from turmeric, indigo, pomegranate rind, and other plants grown in Assam and neighbouring states.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📦</div>
            <h3>Eco Packaging</h3>
            <p>All shipments use recycled kraft paper, jute bags, and soy-based inks — plastic-free by design.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🚜</div>
            <h3>Local Sourcing</h3>
            <p>Raw silk and yarn are sourced within Assam wherever possible, reducing transportation emissions significantly.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🤝</div>
            <h3>Fair Trade</h3>
            <p>Every artisan earns above the minimum wage. We audit our supply chain every 6 months for compliance.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>♻️</div>
            <h3>Zero Waste Looms</h3>
            <p>Offcuts and fabric scraps are repurposed into accessories — nothing goes to landfill.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌿</div>
            <h3>Carbon Offset</h3>
            <p>60% of our deliveries are carbon-neutral through verified offset programmes. We aim for 100% by 2026.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
