import Link from "next/link";
import styles from "./Footer.module.css";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top grid */}
        <div className={styles.grid}>

          {/* Brand column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoText}>TatiAssam</Link>
            <p className={styles.tagline}>
              Celebrating the rich weaving heritage of Assam — hand-crafted fabrics
              that blend age-old tradition with contemporary elegance.
            </p>
            <div className={styles.socials}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Shop</h4>
            <ul className={styles.linkList}>
              <li><Link href="/products?category=women">Women&rsquo;s Collection</Link></li>
              <li><Link href="/products?category=men">Men&rsquo;s Collection</Link></li>
              <li><Link href="/products?category=kids">Kids&rsquo; Collection</Link></li>
              <li><Link href="/products?category=new">New Arrivals</Link></li>
              <li><Link href="/products?sale=true">Sale</Link></li>
            </ul>
          </div>

          {/* Explore links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Explore</h4>
            <ul className={styles.linkList}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/designer">Our Designer</Link></li>
              <li><Link href="/sustainability">Sustainability</Link></li>
              <li><Link href="/blog">Heritage Blog</Link></li>
              <li><Link href="/gift-cards">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Help links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Help</h4>
            <ul className={styles.linkList}>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping &amp; Returns</Link></li>
              <li><Link href="/size-guide">Size Guide</Link></li>
              <li><Link href="/track-order">Track Order</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletterCol}>
            <h4 className={styles.colHeading}>Stay in the Loop</h4>
            <p className={styles.newsletterText}>
              Get exclusive deals, heritage stories, and new arrival alerts straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            &copy; {currentYear} TatiAssam. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
          <div className={styles.badges}>
            <span className={styles.badge}>🔒 Secure Checkout</span>
            <span className={styles.badge}>🇮🇳 Made in Assam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
