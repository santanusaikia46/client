import styles from "../info.module.css";
import FaqAccordion from "./FaqAccordion";

export const metadata = {
  title: "FAQ — Frequently Asked Questions | TatiAssam",
  description:
    "Find answers to the most common questions about shopping at TatiAssam — ordering, payments, shipping, returns, silk care, international delivery, and custom orders.",
  keywords: [
    "TatiAssam FAQ", "how to order ethnic wear", "Mekhela Chador shipping",
    "silk garment care", "Assam handloom returns", "international shipping India"
  ],
  openGraph: {
    title: "FAQ — Frequently Asked Questions | TatiAssam",
    description: "Find answers to common questions about shopping at TatiAssam.",
    url: "https://tatiassam.com/faq",
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse our collections, select your size and colour, then add the item to your cart. Proceed to checkout, fill in your delivery details, and complete payment. You will receive a confirmation email within minutes.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, RuPay), UPI (GPay, PhonePe, Paytm), net banking, and TatiAssam gift cards.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 5–7 business days across India. Express delivery (2–3 business days) is available for most pin codes at an additional charge.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "Yes! We offer hassle-free returns within 7 days of delivery for unworn, unwashed items with tags intact. Exchanges can be arranged for size or colour differences.",
  },
  {
    q: "Are your products genuinely handwoven?",
    a: "Absolutely. Every product on TatiAssam is handcrafted by verified artisan partners in Assam. We conduct regular audits to ensure authenticity.",
  },
  {
    q: "How do I care for my Assamese silk garment?",
    a: "We recommend dry cleaning or gentle hand washing in cold water with mild soap. Avoid direct sunlight when drying, and store in a breathable cotton bag to preserve the fabric.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to select countries. International delivery takes 10–15 business days. Please note that customs duties and taxes in the destination country are the buyer's responsibility.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is shipped, you will receive an email with a tracking link. You can also visit our Track Order page and enter your order ID.",
  },
  {
    q: "Can I customise an order?",
    a: "Yes, for bulk or custom orders (embroidery, specific dimensions, colour variations) please reach out via our Contact page with your requirements.",
  },
  {
    q: "What if my item arrives damaged?",
    a: "We're so sorry if that happens! Please email us at support@tatiassam.com within 48 hours with photos of the damage and we will arrange a replacement or full refund immediately.",
  },
];

export default function FAQPage() {
  /* ── FAQPage JSON-LD ── */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className={styles.hero}>
        <span className={styles.heroBadge}>Help Centre</span>
        <h1>Frequently Asked Questions</h1>
        <p className={styles.heroSub}>
          Find quick answers to the most common questions about shopping at TatiAssam.
        </p>
      </div>

      <div className={styles.container}>
        <FaqAccordion faqs={faqs} />

        <h2 className={styles.sectionTitle}>Still have a question?</h2>
        <p className={styles.prose}>
          Our support team is available Monday–Saturday, 9 AM – 6 PM IST.{" "}
          <a href="/contact" style={{ color: "var(--accent)", fontWeight: 600 }}>Contact us here</a>.
        </p>
      </div>
    </main>
  );
}
