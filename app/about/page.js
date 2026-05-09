import styles from "../info.module.css";



export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Our Story</span>
        <h1>Rooted in Assam, Woven with Pride</h1>
        <p className={styles.heroSub}>
          TatiAssam was born from a deep love for Assam's centuries-old textile traditions
          and a vision to bring them to the modern world.
        </p>
      </div>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Who We Are</h2>
        <p className={styles.prose}>
          Founded in 2022, TatiAssam is a platform dedicated to the artisans and weavers of Assam
          — a state in Northeast India renowned for its breathtaking silk weaves, intricate Mekhela
          Chadors, and bold geometric patterns. We partner directly with master weavers across
          districts like Sualkuchi, Barpeta, and Majuli to bring you truly handcrafted pieces.
        </p>
        <p className={styles.prose}>
          Every product on TatiAssam tells a story — of skill passed down through generations, of
          natural dyes drawn from forests, of looms that hum from dawn to dusk in small village
          homes. Our goal is simple: give these stories a global stage.
        </p>

        <div className={styles.statRow}>
          <div className={styles.statBox}>
            <span className={styles.statNum}>200+</span>
            <span className={styles.statLabel}>Artisan Partners</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>12</span>
            <span className={styles.statLabel}>Districts Represented</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>10k+</span>
            <span className={styles.statLabel}>Happy Customers</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Years of Excellence</span>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p className={styles.prose}>
          We believe that traditional craftsmanship should not just survive — it should thrive.
          TatiAssam's mission is to create fair, sustainable livelihoods for artisans while
          making authentic ethnic wear accessible to customers across India and the world.
        </p>

        <h2 className={styles.sectionTitle}>Our Values</h2>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🤝</div>
            <h3>Artisan-First</h3>
            <p>Fair wages, direct partnerships, and a platform that puts makers at the centre.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌿</div>
            <h3>Sustainability</h3>
            <p>Natural dyes, eco-friendly packaging, and a commitment to low-impact production.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>✨</div>
            <h3>Authenticity</h3>
            <p>Every product is verified handcrafted — no shortcuts, no mass-produced imitations.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌍</div>
            <h3>Cultural Pride</h3>
            <p>We celebrate Assam's diversity and strive to keep its textile traditions alive for future generations.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
