import styles from "../info.module.css";

export const metadata = {
  title: "Size Guide | TatiAssam",
  description: "Find your perfect fit with TatiAssam's comprehensive size guide for women's, men's and kids' ethnic wear.",
};

export default function SizeGuidePage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Find Your Fit</span>
        <h1>Size Guide</h1>
        <p className={styles.heroSub}>
          Handcrafted garments can vary slightly. Use our measurements below to find your
          perfect size before ordering.
        </p>
      </div>

      <div className={styles.container}>
        <p className={styles.prose}>
          All measurements are in <strong>centimetres (cm)</strong>. For the best fit, measure
          yourself and compare with the chart below. If you are between sizes, we recommend
          sizing up. For queries, <a href="/contact" style={{ color: "var(--accent)", fontWeight: 600 }}>contact our team</a>.
        </p>

        <h2 className={styles.sectionTitle}>Women&rsquo;s Mekhela Chador &amp; Kurtas</h2>
        <table className={styles.sizeTable}>
          <thead>
            <tr>
              <th>Size</th>
              <th>Bust (cm)</th>
              <th>Waist (cm)</th>
              <th>Hip (cm)</th>
              <th>Garment Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["XS", "76–80", "60–64", "84–88", "54"],
              ["S", "80–84", "64–68", "88–92", "56"],
              ["M", "84–88", "68–72", "92–96", "58"],
              ["L", "88–92", "72–76", "96–100", "60"],
              ["XL", "92–96", "76–80", "100–104", "62"],
              ["XXL", "96–102", "80–86", "104–110", "64"],
            ].map(([size, bust, waist, hip, length]) => (
              <tr key={size}>
                <td><strong>{size}</strong></td>
                <td>{bust}</td>
                <td>{waist}</td>
                <td>{hip}</td>
                <td>{length}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className={styles.sectionTitle}>Men&rsquo;s Kurtas &amp; Dhoti Sets</h2>
        <table className={styles.sizeTable}>
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (cm)</th>
              <th>Shoulder (cm)</th>
              <th>Length (cm)</th>
              <th>Sleeve (cm)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["S", "86–90", "41", "70", "59"],
              ["M", "90–94", "43", "72", "61"],
              ["L", "94–98", "45", "74", "63"],
              ["XL", "98–102", "47", "76", "64"],
              ["XXL", "102–106", "49", "78", "65"],
            ].map(([size, chest, shoulder, length, sleeve]) => (
              <tr key={size}>
                <td><strong>{size}</strong></td>
                <td>{chest}</td>
                <td>{shoulder}</td>
                <td>{length}</td>
                <td>{sleeve}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className={styles.sectionTitle}>Kids&rsquo; Traditional Wear</h2>
        <table className={styles.sizeTable}>
          <thead>
            <tr>
              <th>Age</th>
              <th>Height (cm)</th>
              <th>Chest (cm)</th>
              <th>Waist (cm)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2–3 yrs", "92–98", "52–54", "50–52"],
              ["4–5 yrs", "104–110", "56–58", "52–54"],
              ["6–7 yrs", "116–122", "60–62", "54–56"],
              ["8–9 yrs", "128–134", "64–66", "56–58"],
              ["10–11 yrs", "140–146", "68–72", "58–62"],
              ["12–13 yrs", "152–158", "74–78", "62–66"],
            ].map(([age, height, chest, waist]) => (
              <tr key={age}>
                <td><strong>{age}</strong></td>
                <td>{height}</td>
                <td>{chest}</td>
                <td>{waist}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className={styles.sectionTitle}>How to Measure</h2>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📏</div>
            <h3>Bust / Chest</h3>
            <p>Measure around the fullest part of your chest, keeping the tape horizontal and snug but not tight.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📐</div>
            <h3>Waist</h3>
            <p>Measure around your natural waistline — typically the narrowest part of your torso, above the navel.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🔵</div>
            <h3>Hip</h3>
            <p>Stand with your feet together and measure around the fullest part of your hips, about 20–23 cm below the waist.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>↕️</div>
            <h3>Garment Length</h3>
            <p>Measured from the highest point of the shoulder down to the hem. Refer to our chart for preferred styling lengths.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
