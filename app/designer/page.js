import styles from "../info.module.css";



export default function DesignerPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>The Creative Vision</span>
        <h1>Our Designer: Silpita Gogoi</h1>
        <p className={styles.heroSub}>
          Bridging the gap between ancient craftsmanship and modern elegance, 
          Silpita is the soul behind every TatiAssam collection.
        </p>
      </div>

      <div className={styles.containerWide}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <img 
              src="/designer_silpita.png" 
              alt="Silpita Gogoi" 
              style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>The Journey of a Visionary</h2>
            <p className={styles.prose}>
              Born and raised in the heart of Assam, Silpita Gogoi has always been surrounded by the rhythmic clatter of looms and the shimmer of golden silk. Her journey began in the small weaving clusters of Sualkuchi, where she learned that every thread carries a story of heritage.
            </p>
            <p className={styles.prose}>
              After refining her craft at leading design institutes, Silpita returned to her roots with a singular mission: to ensure that the exquisite artistry of Assamese handloom doesn't just survive, but thrives in the contemporary fashion world.
            </p>
          </div>
        </div>

        <div className={styles.statRow}>
          <div className={styles.statBox}>
            <span className={styles.statNum}>15+</span>
            <span className={styles.statLabel}>Years in Design</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>200+</span>
            <span className={styles.statLabel}>Original Motifs</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>12</span>
            <span className={styles.statLabel}>Weaving Clusters</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>500+</span>
            <span className={styles.statLabel}>Custom Designs</span>
          </div>
        </div>

        <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginTop: '4rem' }}>Design Philosophy</h2>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌿</div>
            <h3>Authenticity</h3>
            <p>Honouring the traditional techniques that have defined Assamese weaving for centuries.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>✨</div>
            <h3>Innovation</h3>
            <p>Introducing modern silhouettes and palettes while maintaining the integrity of the silk.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🤝</div>
            <h3>Empowerment</h3>
            <p>Providing a global platform for our master weavers and ensuring sustainable livelihoods.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌍</div>
            <h3>Global Reach</h3>
            <p>Making Assamese heritage relevant and accessible to fashion lovers across the world.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '5rem', padding: '3rem', background: '#f7faf8', borderRadius: '16px' }}>
          <p className={styles.prose} style={{ fontSize: '1.4rem', fontStyle: 'italic', color: '#394B3F' }}>
            "At TatiAssam, we don't just sell garments; we share a piece of our soul. Every Mekhela Chador and Saree is a testament to the resilience and talent of our weavers."
          </p>
          <p style={{ fontWeight: '700', color: '#394B3F', marginTop: '1rem' }}>— SILPITA GOGOI</p>
        </div>
      </div>
    </main>
  );
}
