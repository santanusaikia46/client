import styles from "../info.module.css";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* ── Hero Section ───────────────────────────────────── */}
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Heritage & Sustainability</span>
        <h1>Redefining Tradition for the Modern World</h1>
        <p className={styles.heroSub}>
          TatiAssam is a homegrown ethical fashion brand from Assam that blends timeless handloom traditions with contemporary design.
        </p>
      </div>

      <div className={styles.containerWide}>
        {/* ── Introduction ────────────────────────────────────── */}
        <section style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p className={styles.prose} style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            Welcome to <strong>TatiAssam</strong>. Rooted in heritage and driven by sustainability, we create premium handmade textiles and garments for the conscious modern individual.
          </p>
        </section>

        {/* ── Story & Mission ─────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
          <div>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p className={styles.prose}>
              Founded by <strong>Silpita Gogoi</strong>, TatiAssam was born from a deep desire to preserve Assam’s rich textile heritage while creating meaningful economic opportunities for rural artisans and women weavers.
            </p>
            <p className={styles.prose}>
              What began as a personal journey of self-discovery evolved into a mission to revive traditional handloom practices that were slowly fading away across Assamese households. Inspired by ethical fashion and cultural identity, we transform indigenous craftsmanship into globally relevant sustainable luxury.
            </p>
          </div>
          <div style={{ background: '#f7faf8', padding: '2.5rem', borderRadius: '24px' }}>
            <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Our Mission</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                "Promoting sustainable and ethical fashion",
                "Supporting rural women artisans and traditional weavers",
                "Preserving Assamese handloom heritage",
                "Creating eco-friendly luxury fashion with natural resources",
                "Bridging traditional craftsmanship with modern design aesthetics"
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: '#6b7670', fontSize: '1rem' }}>
                  <span style={{ color: '#394B3F', fontWeight: 'bold' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Core Values ─────────────────────────────────────── */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Core Values</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🤝</div>
              <h3>Ethical & Socially Responsible</h3>
              <p>We collaborate with artisans from remote villages, providing sustainable livelihoods and economic empowerment while preserving endangered textile traditions.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🌿</div>
              <h3>Sustainability & Slow Living</h3>
              <p>In a fast-fashion world, we embrace mindful craftsmanship. Every textile is handwoven with minimal environmental impact and maximal authenticity.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>✨</div>
              <h3>Artisan Empowerment</h3>
              <p>By providing direct market access, we ensure that the rhythmic clatter of the loom continues to provide for families across Assam.</p>
            </div>
          </div>
        </section>

        {/* ── Sustainable Craftsmanship ────────────────────────── */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle}>Sustainable Craftsmanship</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ borderLeft: '3px solid #394B3F', paddingLeft: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#394B3F', marginBottom: '0.75rem' }}>Indigenous Yarns</h3>
              <p className={styles.prose} style={{ fontSize: '0.95rem' }}>
                We work with locally sourced fibers such as <strong>Eri Silk</strong>, <strong>Muga Silk</strong>, and <strong>Nooni Fiber</strong>, hand-extracted by local communities.
              </p>
            </div>
            <div style={{ borderLeft: '3px solid #394B3F', paddingLeft: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#394B3F', marginBottom: '0.75rem' }}>Natural Dyes</h3>
              <p className={styles.prose} style={{ fontSize: '0.95rem' }}>
                Our fabrics are naturally dyed using tree bark, leaves, roots, and fruits, celebrating Assam’s biodiversity while staying eco-friendly.
              </p>
            </div>
            <div style={{ borderLeft: '3px solid #394B3F', paddingLeft: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#394B3F', marginBottom: '0.75rem' }}>Handloom Weaving</h3>
              <p className={styles.prose} style={{ fontSize: '0.95rem' }}>
                Woven on traditional manual throw shuttle looms that require no electricity, preserving the unique textures of handcrafted beauty.
              </p>
            </div>
          </div>
        </section>

        {/* ── Design & Why Us ─────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <section>
            <h2 className={styles.sectionTitle}>Contemporary Assamese Design</h2>
            <p className={styles.prose}>
              Our designs reinterpret traditional motifs inspired by regional flora and fauna through a contemporary minimalist lens. By combining heritage-inspired patterns with modern silhouettes, we create timeless ready-to-wear fashion rooted in cultural identity.
            </p>
          </section>
          <section style={{ background: '#394B3F', color: '#fff', padding: '3rem', borderRadius: '24px' }}>
            <h2 className={styles.sectionTitle} style={{ color: '#fff', marginTop: 0 }}>Why Choose TatiAssam?</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem' }}>
              {[
                "Sustainable and ethical fashion brand",
                "Handmade luxury textiles and garments",
                "Artisan-made and eco-conscious",
                "Naturally dyed handwoven fabrics",
                "Traditional Assamese craftsmanship",
                "Slow fashion and conscious living",
                "Contemporary ethnic and modern wear",
                "Women artisan empowerment"
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.5rem', opacity: 0.9 }}>
                  • {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
