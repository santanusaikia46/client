const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tatiassam.com";

export const metadata = {
  title: "Contact Us — Get in Touch | TatiAssam",
  description:
    "Contact TatiAssam for order queries, custom orders, artisan partnerships, or general inquiries. Located in Sualkuchi, Kamrup, Assam. Available Monday–Saturday, 9 AM – 6 PM IST.",
  keywords: [
    "contact TatiAssam", "TatiAssam customer support", "order inquiry ethnic wear",
    "custom Mekhela Chador order", "artisan partnership Assam"
  ],
  openGraph: {
    title: "Contact Us | TatiAssam",
    description: "Have a question or custom order request? Get in touch with TatiAssam.",
    url: `${BASE_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact TatiAssam",
    description: "Get in touch with our team for orders, support, and partnerships.",
  },
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
};

export default function ContactLayout({ children }) {
  /* ── ContactPage + LocalBusiness JSON-LD ── */
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact TatiAssam",
    description: "Contact TatiAssam for order queries, custom orders, artisan partnerships, or general inquiries.",
    url: `${BASE_URL}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#organization`,
      name: "TatiAssam",
      url: BASE_URL,
      telephone: "+91-98765-43210",
      email: "hello@tatiassam.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sualkuchi Weaving District",
        addressLocality: "Kamrup",
        addressRegion: "Assam",
        postalCode: "781103",
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.2532,
        longitude: 91.5695,
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Contact Us", item: `${BASE_URL}/contact` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
