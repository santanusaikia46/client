"use client";

import { useState } from "react";
import styles from "../info.module.css";

export default function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <div className={styles.faqList}>
      {faqs.map((item, i) => (
        <div key={i} className={styles.faqItem}>
          <button
            className={styles.faqQuestion}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {item.q}
            <span className={`${styles.faqChevron} ${open === i ? styles.faqChevronOpen : ""}`}>▼</span>
          </button>
          {open === i && (
            <div className={styles.faqAnswer}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
