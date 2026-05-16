import styles from "../info.module.css";

export const metadata = {
  title: "Sustainability | TatiAssam",
  description: "Our commitment to a circular, ethical, and eco-conscious future through Assamese handloom.",
};

const goals = [
  { label: "Natural & Plant-Based Dyes", value: 85, color: "#394B3F" },
  { label: "Plastic-Free Packaging", value: 98, color: "#4A5D4F" },
  { label: "Fair Trade Certified Wages", value: 100, color: "#5C6F61" },
  { label: "Carbon-Neutral Logistics", value: 65, color: "#6E8173" },
];

export default function SustainabilityPage() {
  return (
    <main className={styles.page}>
      {/* ── Hero Section ───────────────────────────────────── */}
      <div className={styles.hero} style={{ background: 'linear-gradient(rgba(57, 75, 63, 0.85), rgba(57, 75, 63, 0.95)), url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <span className={styles.heroBadge}>Our Ethical Promise</span>
        <h1>Fashion That Cares for the Earth</h1>
        <p className={styles.heroSub}>
          Sustainability isn't just a goal; it's our soul. At TatiAssam, every thread is a commitment to a cleaner, more conscious future.
        </p>
      </div>

      <div className={styles.containerWide}>
        {/* ── Core Philosophy ────────────────────────────────── */}
        <section style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle}>The Slow Living Approach</h2>
          <p className={styles.prose} style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.15rem' }}>
            In a fast-paced world driven by rapid consumption, we choose a different path. 
            We embrace the **Slow Fashion** movement, where every garment is created with patience, 
            respect for the artisan, and deep gratitude for the resources provided by the earth.
          </p>
        </section>

        {/* ── Pillars Section ─────────────────────────────────── */}
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌿</div>
            <h3>Conscious Raw Materials</h3>
            <p>We prioritize indigenous fibers like Eri Silk (Ahimsa Silk), Muga, and Nooni—natural materials that are biodegradable and require minimal chemical intervention.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🎨</div>
            <h3>Botanical Palette</h3>
            <p>Our dyes are derived from tree barks, seeds, and fruits. We use turmeric for gold, lac for crimson, and onion skins for earthy browns, ensuring no toxic runoff into our rivers.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>⚙️</div>
            <h3>Low-Impact Craft</h3>
            <p>Our manual throw shuttle looms operate entirely without electricity. This ancient weaving technique ensures that our carbon footprint remains remarkably low.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🤝</div>
            <h3>Human-Centric Ethics</h3>
            <p>Sustainability includes the welfare of our people. We ensure fair-trade wages, safe working environments, and direct-to-weaver partnerships that eliminate exploitation.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📦</div>
            <h3>Circular Packaging</h3>
            <p>From recycled kraft paper to hand-woven cloth bags, our packaging is designed to be reused or returned to the earth without leaving a trace.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>♻️</div>
            <h3>Zero-Waste Design</h3>
            <p>We repurpose every fabric offcut into accessories or small home goods, ensuring that no piece of our precious hand-woven silk ever reaches a landfill.</p>
          </div>
        </div>

        {/* ── Progress Section ────────────────────────────────── */}
        <section style={{ marginTop: '6rem', padding: '4rem', background: '#f7faf8', borderRadius: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Our Transparency Roadmap</h2>
              <p className={styles.prose}>
                We believe in progress over perfection. While we are proud of our achievements, we are constantly striving to reach 100% circularity by 2027. 
              </p>
              <p className={styles.prose}>
                Every year, we audit our supply chain to identify areas where we can further reduce our impact on the environment while increasing the positive impact on our artisan communities.
              </p>
            </div>
            <div>
              {goals.map((g) => (
                <div key={g.label} className={styles.progressItem} style={{ marginBottom: '2rem' }}>
                  <div className={styles.progressLabel} style={{ fontWeight: '700', marginBottom: '0.6rem' }}>
                    <span>{g.label}</span>
                    <span style={{ color: g.color }}>{g.value}%</span>
                  </div>
                  <div className={styles.progressBar} style={{ height: '12px', background: 'rgba(57, 75, 63, 0.08)' }}>
                    <div 
                      className={styles.progressFill} 
                      style={{ 
                        width: `${g.value}%`, 
                        background: g.color,
                        boxShadow: '0 2px 8px rgba(57, 75, 63, 0.15)'
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing Call to Action ─────────────────────────── */}
        <section style={{ textAlign: 'center', marginTop: '6rem', padding: '4rem 2rem', background: '#394B3F', color: '#fff', borderRadius: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#fff' }}>Join the Slow Fashion Movement</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>
            When you choose TatiAssam, you aren't just buying a garment. You are casting a vote for a more ethical, sustainable, and beautiful world.
          </p>
          <a href="/products" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: '#fff', color: '#394B3F', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', transition: 'transform 0.2s' }}>
            Shop Consciously
          </a>
        </section>
      </div>
    </main>
  );
}
