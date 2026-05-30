import styles from "../info.module.css";

export const metadata = {
  title: "Shipping & Returns | Tati Assam",
  description: "Full details on Tati Assam's shipping options, delivery times, and hassle-free return policy.",
};

export default function ShippingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Delivery & Returns</span>
        <h1>Shipping &amp; Returns</h1>
        <p className={styles.heroSub}>
          Transparent delivery timelines and a clear return policy, because your satisfaction is our priority.
        </p>
      </div>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>SPECIFICATIONS</h2>
        <p className={styles.prose}>The product will be ready for dispatch within 3–4 working days.</p>
        <p className={styles.prose}>This product will be ready for dispatch in 10-12 working days.</p>
        <p className={styles.prose}>
          In case any resizing is required, kindly share your measurements (shoulder, bust, waist, and hip). Once the measurements are received, the garment will be resized accordingly and dispatched within 10 working days. An additional charge of ₹250 will be applicable for resizing.
        </p>

        <h2 className={styles.sectionTitle} style={{ marginTop: '3rem' }}>Made To Order</h2>
        <p className={styles.prose}>
          The products featured in this section are currently out of stock. However, if you wish to order a piece specifically from this section, we are open to creating them in small batches for customers to place a special order. As a slow fashion brand, each piece is thoughtfully crafted and therefore requires time to produce. Kindly note the estimated timeline from order placement to dispatch will be approximately 1 to 1.5 months. We truly value your interest in our work, and we are always happy to create something special for you.
        </p>

        <h2 className={styles.sectionTitle} style={{ marginTop: '3rem' }}>Shipping & Delivery Methods:</h2>
        <p className={styles.prose}>
          At Tati Assam, we're passionate about getting your order to you quickly and safely. Here's how our shipping and delivery process works:
        </p>
        
        <h3 style={{ fontSize: '1.25rem', color: '#394B3F', marginTop: '2rem', marginBottom: '1rem' }}>Order Processing:</h3>
        <ul className={styles.prose} style={{ paddingLeft: "1.5rem" }}>
          <li>Once you make an enquiry via WhatsApp or email, we will get back to you at the earliest possible. Based on your convenience, we will discuss the product details further through a phone call or messages to help finalize your order.</li>
          <li>Once your order has been finalized, we will share our account details with you to proceed with the payment.</li>
          <li>For orders that do not require any alterations, full payment must be made in advance. Once your payment has been received and verified, your order will be processed and dispatched within 3–4 working days.</li>
          <li>For orders that require alterations, a 50% advance payment must be made before the alteration process begins. An additional charge of INR 250 will be applicable for alterations. Once the alterations are completed, we will notify you, following which the remaining balance amount must be cleared prior to dispatch. Upon receipt of the full payment, your order will be dispatched accordingly.</li>
          <li>After your order has been dispatched, you will receive a message with a tracking ID.</li>
          <li>As we are a small business operating with a limited team, we kindly request your patience and understanding. We will always do our best to address and resolve your concerns as quickly as possible.</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', color: '#394B3F', marginTop: '2rem', marginBottom: '1rem' }}>Shipping Methods:</h3>
        <p className={styles.prose}>
          We rely on trusted shipping partners to deliver your goodies to your doorstep. Shipping times and costs vary depending on your location and available couriers. Our goal is to choose the most efficient and cost-effective option for you.
        </p>

        <h3 style={{ fontSize: '1.25rem', color: '#394B3F', marginTop: '2rem', marginBottom: '1rem' }}>Estimated Delivery Time:</h3>
        <p className={styles.prose}>Once your order is shipped, delivery time depends on your location.</p>
        <p className={styles.prose}>Expect your treasures within 4-6 business days within the country.</p>
        <p className={styles.prose}>However, unforeseen circumstances like weather or customs delays can sometimes slow things down and extend for 10 days.</p>

        <h3 style={{ fontSize: '1.25rem', color: '#394B3F', marginTop: '2rem', marginBottom: '1rem' }}>Shipping Charges:</h3>
        <ul className={styles.prose} style={{ paddingLeft: "1.5rem" }}>
          <li>We offer free shipping within India.</li>
          <li>For other countries, shipping charges will be specified over discussion.</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', color: '#394B3F', marginTop: '2rem', marginBottom: '1rem' }}>Incorrect or Incomplete Addresses:</h3>
        <ul className={styles.prose} style={{ paddingLeft: "1.5rem" }}>
          <li>Double-check your shipping information!</li>
          <li>We can't be held responsible for delays or lost packages due to incorrect or incomplete addresses provided by you.</li>
          <li>We also cannot accept responsibility for lost or stolen packages which have been confirmed as delivered to the shipping address.</li>
        </ul>

        <h2 className={styles.sectionTitle} style={{ marginTop: '3rem' }}>Refund and Return Policy</h2>
        <p className={styles.prose}>
          At Tati Assam, we want you to be completely satisfied with your purchase. However, we understand that sometimes things don't go as planned. This policy outlines our return and refund process for damaged or incorrect items.
        </p>

        <h3 style={{ fontSize: '1.25rem', color: '#394B3F', marginTop: '2rem', marginBottom: '1rem' }}>We can't accept returns/exchanges for:</h3>
        <ul className={styles.prose} style={{ paddingLeft: "1.5rem" }}>
          <li>We do not accept returns or exchanges in cases where there is simply a change of mind after receiving the product. However, exchanges or refunds may be processed in the event of genuine fitting issues or if the product received has any authentic damage.</li>
          <li>We do not undertake custom orders based on customer-provided designs. Made-to-order requests are only applicable for designs from our existing collection.</li>
          <li>Items that have been opened, used, altered, tampered with, or show signs of wear will not be eligible for return, exchange, or refund.</li>
        </ul>
      </div>
    </main>
  );
}
