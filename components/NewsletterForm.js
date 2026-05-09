"use client";

import { useToast } from "../context/ToastContext";
import styles from "./Footer.module.css";

export default function NewsletterForm() {
  const { addToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire up to newsletter API
    addToast("Thanks for subscribing!", "success");
  }

  return (
    <form className={styles.newsletterForm} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="your@email.com"
        className={styles.emailInput}
        aria-label="Email address"
      />
      <button type="submit" className={styles.subscribeBtn}>Subscribe</button>
    </form>
  );
}
