"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import styles from "./page.module.css";

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={barRef} className={styles.scrollProgress} />;
}

/* ── Intersection-observer reveal hook ── */
function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-scale");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ── Hero parallax hook ── */
function useParallax(ref, speed = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * speed}px) scale(1.04)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, speed]);
}

/* ── Product Carousel ── */
function ProductCarousel({ products, loading }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    const t = setTimeout(updateState, 150);
    return () => { el.removeEventListener("scroll", updateState); clearTimeout(t); };
  }, [products, updateState]);

  if (loading) {
    return (
      <div className={styles.carouselTrack}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.cardSkeleton} />
        ))}
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <div className={styles.carouselRoot}>
      <div ref={trackRef} className={styles.carouselTrack}>
        {products.map((p, i) => (
          <Link
            key={p._id}
            href={`/products/${p._id}`}
            className={styles.productCard}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className={styles.cardImageWrap}>
              <img src={p.image} alt={p.name} className={styles.cardImage} loading="lazy" />
              <div className={styles.cardBadge}>{p.category}</div>
              <div className={styles.cardHoverOverlay}>
                <span className={styles.cardQuickShop}>View Product</span>
              </div>
            </div>
            <div className={styles.cardInfo}>
              <p className={styles.cardName}>{p.name}</p>
              <p className={styles.cardPrice}>₹{p.price.toLocaleString("en-IN")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Reusable Product Shelf Section ── */
function ProductShelf({ title, eyebrow, products, loading, viewAllLink = "/products" }) {
  if (!loading && !products?.length) return null;

  return (
    <section className={styles.shelfSection}>
      <div className={styles.shelfHeader}>
        <div>
          {eyebrow && <p className={styles.sectionEyebrow}>{eyebrow}</p>}
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <Link href={viewAllLink} className={styles.viewAll}>
          View all
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>
      </div>
      <ProductCarousel products={products} loading={loading} />
    </section>
  );
}

/* ── Main page ── */
export default function HomePage() {
  const [sections, setSections] = useState({
    featured: { data: [], loading: true },
  });

  const heroBgRef = useRef(null);
  
  // Collect all product lists for reveal hook dependencies
  const allLoadedData = Object.values(sections).map(s => s.data);
  const anyLoading = Object.values(sections).some(s => s.loading);
  useReveal([anyLoading, ...allLoadedData]);
  
  useParallax(heroBgRef, 0.3);

  const fetchSection = async (key, url) => {
    try {
      const res = await fetch(url);
      const d = await res.json();
      if (d.success) {
        setSections(prev => ({
          ...prev,
          [key]: { data: d.data, loading: false }
        }));
      }
    } catch (err) {
      setSections(prev => ({
        ...prev,
        [key]: { ...prev[key], loading: false }
      }));
    }
  };

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    // 1. Featured
    fetchSection('featured', `${api}/api/products/featured`);
  }, []);

  return (
    <main className={styles.page}>
      <ScrollProgress />

      {/* ── 1. CINEMATIC HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <img
          ref={heroBgRef}
          src="https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=1800&q=85"
          alt="Assam ethnic collection"
          className={styles.heroBg}
        />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Spring / Summer Collection</p>
          <h1 className={styles.heroHeadline}>
            Woven by hand.<br />Worn with pride.
          </h1>
          <p className={styles.heroSub}>
            Authentic ethnic wear from the looms of Assam — crafted for the modern world.
          </p>
          <div className={styles.heroActions}>
            <Link href="/products" className={styles.heroCta}>
              Explore Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link href="/about" className={styles.heroSecondary}>Our Story</Link>
          </div>
        </div>
        <div className={styles.scrollHint}><span /></div>
      </section>

      {/* ── 2. CATEGORY SHOWCASE ── */}
      <section className={styles.categoryShowcase}>
        <div className={styles.categoryGrid}>
          {[
            { label: "women", img: "https://res.cloudinary.com/dsnsthnae/image/upload/v1778911221/tatiassam/g268lbtymbzi6he54gmb.avif", link: "/products?category=Women", sub: "Ethereal Silk" },
            { label: "fabric", img: "https://res.cloudinary.com/dsnsthnae/image/upload/v1778911281/tatiassam/baxgsv9ejzpkvblljsyd.avif", link: "/products?category=Fabric", sub: "Indigenous Weaves" },
            { label: "Home", img: "https://res.cloudinary.com/dsnsthnae/image/upload/v1778911382/tatiassam/gchdnp5frxe0cnkqcown.avif", link: "/products?category=Accessories", sub: "Artisanal Decor" }
          ].map((cat, i) => (
            <Link key={cat.label} href={cat.link} className={`${styles.catCard} reveal-scale`} style={{ animationDelay: `${i * 0.1}s` }}>
              <img src={cat.img} alt={cat.label} className={styles.catImg} />
              <div className={styles.catOverlay}>
                <div>
                  <p className={styles.catSub}>{cat.sub}</p>
                  <h3 className={styles.catTitle}>{cat.label}</h3>
                </div>
                <span className={styles.catBtn}>Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. OUR STORY (SEO Optimized) ── */}
      <section className={`${styles.heritageSection} reveal`}>
        <div className={styles.heritageGrid}>
          <div className={styles.heritageImgWrap}>
            <img 
              src="https://res.cloudinary.com/dsnsthnae/image/upload/v1776760587/tatiassam/x3o3yxgzkdo8nfu60jjz.avif" 
              alt="Authentic Assamese Loom and Weaving" 
              className={styles.heritageImg}
            />
          </div>
          <div className={styles.heritageContent}>
            <p className={styles.sectionEyebrow}>Our Story</p>
            <h2 className={styles.heritageTitle}>The Golden Thread of Assam: Authentic Handloom</h2>

            <p className={styles.heritageText}>
              For generations, the master weavers of Assam have transformed raw Muga and Eri silk into liquid gold. 
              Each piece in the TatiAssam collection is a labor of love, meticulously hand-woven on 
              traditional throw-shuttle looms that have stood the test of time.
            </p>
            <p className={styles.heritageText}>
              By choosing our ethical fashion brand, you are not just wearing a premium garment; you are 
              preserving a rich Assamese weaving heritage and empowering local artisanal communities 
              through sustainable craftsmanship.
            </p>
            <Link href="/about" className={styles.heritageLink}>
              Discover Our Process
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Product Shelves (Preserved) ── */}
      <ProductShelf 
        title="Featured Products" 
        eyebrow="Crafted for you" 
        products={sections.featured.data} 
        loading={sections.featured.loading} 
      />




    </main>
  );
}
