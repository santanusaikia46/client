import styles from "../info.module.css";

export const metadata = {
  title: "Cookie Policy | TatiAssam",
  description: "Learn how TatiAssam uses cookies and how you can manage your cookie preferences.",
};

const cookieTypes = [
  {
    icon: "⚙️",
    name: "Strictly Necessary",
    purpose: "Essential for the website to function. Includes session management, shopping cart state, and login authentication.",
    examples: "session_id, cart_token, csrf_token",
    canOptOut: "No — these are required for the site to work.",
  },
  {
    icon: "📊",
    name: "Analytics",
    purpose: "Help us understand how visitors interact with our website so we can improve it.",
    examples: "_ga (Google Analytics), _gid, _gat",
    canOptOut: "Yes — opt out via our cookie banner or browser settings.",
  },
  {
    icon: "🎯",
    name: "Functional",
    purpose: "Remember your preferences such as language, region, currency, and recently viewed products.",
    examples: "user_prefs, recently_viewed, currency",
    canOptOut: "Yes — disabling these may reduce personalisation.",
  },
  {
    icon: "📣",
    name: "Marketing",
    purpose: "Used to show you relevant ads on other platforms and measure campaign effectiveness.",
    examples: "fbp (Facebook Pixel), _gcl_au (Google Ads)",
    canOptOut: "Yes — opt out via our cookie banner or ad platform settings.",
  },
];

export default function CookiesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Legal</span>
        <h1>Cookie Policy</h1>
        <p className={styles.heroSub}>
          Last updated: April 18, 2026 · Learn what cookies we use and how to control them.
        </p>
      </div>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>What Are Cookies?</h2>
        <p className={styles.prose}>
          Cookies are small text files placed on your device by a website when you visit it. They
          are widely used to make websites work more efficiently, provide a better user experience,
          and give website owners useful analytics information.
        </p>
        <p className={styles.prose}>
          Cookies can be <strong>session cookies</strong> (deleted when you close your browser) or
          <strong> persistent cookies</strong> (remain on your device for a set period or until you
          delete them). They can be set by us (<em>first-party cookies</em>) or by third-party
          services we use (<em>third-party cookies</em>).
        </p>

        <h2 className={styles.sectionTitle}>How TatiAssam Uses Cookies</h2>
        <p className={styles.prose}>
          We use cookies to keep your shopping cart intact between sessions, remember your login
          state, analyse website traffic, personalise your experience, and — with your consent —
          serve relevant marketing. Below is a full breakdown:
        </p>

        <div className={styles.cardGrid}>
          {cookieTypes.map((c) => (
            <div key={c.name} className={styles.card}>
              <div className={styles.cardIcon}>{c.icon}</div>
              <h3>{c.name}</h3>
              <p>{c.purpose}</p>
              <p style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "#94a3b8" }}>
                <strong>Examples:</strong> {c.examples}
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                <strong>Opt-out:</strong> {c.canOptOut}
              </p>
            </div>
          ))}
        </div>

        <h2 className={styles.sectionTitle}>Cookie Retention Periods</h2>
        <table className={styles.infoTable}>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Type</th>
              <th>Retention</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>session_id</td><td>Strictly Necessary</td><td>Session (deleted on browser close)</td></tr>
            <tr><td>cart_token</td><td>Strictly Necessary</td><td>30 days</td></tr>
            <tr><td>_ga</td><td>Analytics</td><td>2 years</td></tr>
            <tr><td>_gid</td><td>Analytics</td><td>24 hours</td></tr>
            <tr><td>user_prefs</td><td>Functional</td><td>1 year</td></tr>
            <tr><td>fbp</td><td>Marketing</td><td>90 days</td></tr>
            <tr><td>_gcl_au</td><td>Marketing</td><td>90 days</td></tr>
          </tbody>
        </table>

        <h2 className={styles.sectionTitle}>Managing Your Cookie Preferences</h2>
        <p className={styles.prose}>
          You can control and manage cookies in several ways:
        </p>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🍪</div>
            <h3>Cookie Banner</h3>
            <p>When you first visit TatiAssam, you can accept or decline non-essential cookies via our cookie consent banner.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌐</div>
            <h3>Browser Settings</h3>
            <p>Most browsers let you view, delete, and block cookies. Note: blocking essential cookies will impair site functionality.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📊</div>
            <h3>Google Analytics Opt-Out</h3>
            <p>Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>Google Analytics Opt-out Browser Add-on</a> to prevent analytics tracking.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📣</div>
            <h3>Ad Preferences</h3>
            <p>Manage personalised advertising preferences via <a href="https://youradchoices.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>YourAdChoices</a> or the Facebook Ad Settings panel.</p>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Third-Party Cookies</h2>
        <p className={styles.prose}>
          Some cookies on TatiAssam are set by trusted third parties such as Google, Meta (Facebook),
          and Razorpay. These parties have their own privacy and cookie policies, which we encourage
          you to review. We do not control third-party cookies.
        </p>

        <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
        <p className={styles.prose}>
          We may update this Cookie Policy periodically to reflect changes in technology, regulation,
          or our services. The "Last updated" date at the top of this page will always reflect the
          most recent version.
        </p>

        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <p className={styles.prose}>
          Questions about our use of cookies? Email us at{" "}
          <a href="mailto:privacy@tatiassam.com" style={{ color: "var(--accent)", fontWeight: 600 }}>
            privacy@tatiassam.com
          </a>{" "}
          or visit our <a href="/contact" style={{ color: "var(--accent)", fontWeight: 600 }}>Contact page</a>.
        </p>
      </div>
    </main>
  );
}
