import styles from "../info.module.css";

export default function DesignerPage() {
  const images = [
    "https://images.openai.com/static-rsc-4/FBeXb69FjYaGpPT4HxH5Qk69sghi-50lbjsNZzTJSrmRPk5RRs0HtJ884VNL2lzuhdtH8OxN5WPMf0bVX6hN0IYygPhR9SC1KGZS5uBSsQZDLQv9eXmO9sU283myq7lYJHYCp_cFS3iXXJezHoczs0eRIUjv4HKigDslQ7rZRIqlrzlaSyB0luLRwScumq9u?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/W0z-4-80sWc3VraNPWJU8yWgejGuh7-P4AUdQGXbfnJEq_BbHOn_NArFi0ULQDMzhRXY9hnmV5ms8rnCMbgJsTR5k5ht1rcx_IvIBvgLV9QTZl5BJocLipny3weJhN5PBxfp26j9NwYdGURvWioEGG_c9UmYOFo9dnJiCuP4TlTQhYasepSWaP6rF7aGY9Aq?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/JD2TH4xBJZ7wqvZCslH4qlrBQGMnMrh6znmpJjrE8wjtpwHCUgD7SNJJcu3-LaTTET5MBzLiaj5xXIQXfyGpUET8SlLLzkiJeYDt4zCq19np_O264vJtnXL_vq-XsN51tRplDW29aSbNQC9W9f5OPcOknhMsYP4ElWFYvJatXRvpfZ9UXQqK6fIFJ0DWkaJu?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/Es9IJgXcH2faY2iBeA46nf4Oz-UM91TRgfduARr0zC7Ptb6DZyTrd0nZerZQV4mtJmsUrKyqkrplBP4QuxfJ0j7LD0Ejycwcs5H5WT3AeWFSGgmo0esiERjb4q6JdJpeINsACRWyueq_CKpTZ45GiEl7pEwEQVla0VQen9nqeS9v8xyJp5zNIRjQj8L6zu-W?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/mKCSK0Pvf6-y0VeQiQ7D9yXbH6YHoKoAdIzIYNYoKD1ZVa8f-ekTDm2qqo1BXdWbwDjfZM53Rr4cT0d-sm2VijzTe8eX7ZzfnL6IGuEzqOWbDg2IC50uoERF8ctuWfmlGGz3rHOXONqoNDW86jKsTDzOML-z02E7c2DRx88I3MTrLJqpG3r9HYdwIVKcJTZP?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/imcpKrZnHcldAEsv82UQc0is02pH7v2UM4OhRj-9anS8QS0SnPEvA4OxavRRlPsvPlmVjckr1V8NuAQ_tpXUDwgVzfo09LMO3b8t3PJFjrC3kSAASPZ6B7oSjoejFiECp9PHY9DBNt1lxakLLz6d2hHkJ_txMcJNSMGYP2jxOyTiyVEmkx_vEa7joT2haqJ6?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/_9wNc2YoZHgz35peGz1bVVsgztuQfknz4zgBnRwuTSG3zZvYBK-RcM9_cVMBoXuUi8wBfQv_AcSRXzP6RZYeHFo-D5ZbtqFCqcOtIj_k9UfxI5WuGMDDWG0H_9Pe96O_Uwq2639OY7st4D0EiXFpfEyA0RQhZfA36WPr1oB7eCUvj4IWCEGLJgs2xGV2wiSj?purpose=fullsize"
  ];

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>The Creative Visionary</span>
        <h1>Silpita Gogoi</h1>
        <p className={styles.heroSub}>
          Redefining traditional handloom craftsmanship through sustainable contemporary fashion.
        </p>
      </div>

      <div className={styles.containerWide}>
        {/* ── Intro Section ───────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={images[0]} 
              alt="Silpita Gogoi" 
              style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative', zIndex: 2 }}
            />
            <div style={{ position: 'absolute', top: '20px', left: '-20px', width: '100%', height: '100%', background: '#394B3F', borderRadius: '24px', zIndex: 1 }} />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>The Soul of TatiAssam</h2>
            <p className={styles.prose}>
              Silpita Gogoi is an Assamese fashion designer and entrepreneur widely recognized for reviving indigenous Assamese textiles and bringing regional craftsmanship to modern fashion audiences.
            </p>
            <p className={styles.prose}>
              Based in Assam, India, she has dedicated her career to ensuring that the exquisite artistry of Assamese handloom doesn't just survive, but thrives in the contemporary fashion world.
            </p>
          </div>
        </div>

        {/* ── Education & Background ──────────────────────────── */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle}>Education & Background</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p className={styles.prose}>
                Silpita graduated from the <strong>National Institute of Fashion Technology (NIFT), Mumbai</strong>, where she studied fashion design and developed a strong interest in ethical fashion, sustainable textiles, and indigenous crafts.
              </p>
              <p className={styles.prose}>
                Her exposure to India’s diverse textile traditions inspired her to reconnect with her Assamese roots and preserve the weaving heritage of Northeast India.
              </p>
            </div>
            <img 
              src={images[1]} 
              alt="Design Process" 
              style={{ width: '100%', borderRadius: '24px', aspectRatio: '4/5', objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* ── Founder Section ─────────────────────────────────── */}
        <section style={{ marginBottom: '6rem', padding: '4rem', background: '#f7faf8', borderRadius: '40px' }}>
          <h2 className={styles.sectionTitle} style={{ marginTop: 0, textAlign: 'center', marginBottom: '2rem' }}>Founder of TatiAssam</h2>
          <p className={styles.prose} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            Founded in 2022, TatiAssam was created with the vision of transforming traditional Assamese handloom into a globally relevant sustainable luxury brand. Through the label, Silpita works closely with rural women artisans and weavers.
          </p>
          <div className={styles.cardGrid}>
            {[
              "Ethical & Sustainable Fashion",
              "Handmade Assamese Textiles",
              "Eri & Muga Silk Craftsmanship",
              "Natural Dyeing Techniques",
              "Women Artisan Empowerment",
              "Contemporary Minimalist Design"
            ].map((focus, i) => (
              <div key={i} style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid rgba(57,75,63,0.1)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <span style={{ fontWeight: '600', color: '#394B3F', fontSize: '0.95rem' }}>{focus}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Design Philosophy ───────────────────────────────── */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <img 
              src={images[2]} 
              alt="Textile Detail" 
              style={{ width: '100%', borderRadius: '24px' }}
            />
            <div>
              <h2 className={styles.sectionTitle}>Design Philosophy</h2>
              <p className={styles.prose}>
                Silpita’s design philosophy blends traditional Assamese motifs, textures, and weaving methods with modern silhouettes and minimalist aesthetics. 
              </p>
              <p className={styles.prose}>
                Her work celebrates slow fashion, handmade luxury, and cultural storytelling while preserving centuries-old artisan knowledge. Every piece is a testament to the resilience and talent of the weavers she partners with.
              </p>
            </div>
          </div>
        </section>

        {/* ── Recognition & Impact ────────────────────────────── */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 className={styles.sectionTitle}>Recognition & Impact</h2>
          <p className={styles.prose} style={{ marginBottom: '3rem' }}>
            Under her leadership, TatiAssam has gained recognition for its contribution to sustainable fashion and artisan-led entrepreneurship. Today, Silpita represents a new generation of Indian designers using fashion as a medium to preserve culture and promote eco-conscious luxury.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 250px)', gap: '1rem' }}>
            <img src={images[3]} alt="Gallery 1" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', gridColumn: 'span 2' }} />
            <img src={images[4]} alt="Gallery 2" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            <img src={images[5]} alt="Gallery 3" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            <img src={images[6]} alt="Gallery 4" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', gridColumn: 'span 2' }} />
            <div style={{ gridColumn: 'span 2', background: '#394B3F', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', color: '#fff', textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: '500', fontStyle: 'italic', margin: 0 }}>
                "Every Mekhela Chador and Saree is a testament to the resilience and talent of our weavers."
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
