export const metadata = {
  title: "Shop Authentic Assam Ethnic Wear | TatiAssam Collections",
  description:
    "Browse our curated collection of authentic Assam ethnic wear — Mekhela Chador, silk sarees, Kurtas, handwoven fabrics, and more. Filter by category, size, colour, and price.",
  keywords: [
    "Assam ethnic wear collection", "buy Mekhela Chador online",
    "Assamese silk saree", "handloom saree India", "TatiAssam products",
    "Muga silk clothing", "Pat silk saree", "Eri silk garments",
    "traditional Indian clothing", "handwoven ethnic wear"
  ],
  openGraph: {
    title: "Shop Authentic Assam Ethnic Wear | TatiAssam",
    description: "Browse our curated collection of authentic Assam ethnic wear.",
    url: "https://tatiassam.com/products",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Authentic Assam Ethnic Wear | TatiAssam",
    description: "Browse our curated collection of authentic Assam ethnic wear.",
  },
  alternates: {
    canonical: "https://tatiassam.com/products",
  },
};

export default function ProductsLayout({ children }) {
  /* ── CollectionPage JSON-LD for AI discoverability ── */
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TatiAssam — Ethnic Wear Collection",
    description:
      "Browse all authentic Assam ethnic wear at TatiAssam, including Mekhela Chador, silk sarees, Kurtas, kids' traditional clothing, handwoven fabrics, and accessories.",
    url: "https://tatiassam.com/products",
    isPartOf: {
      "@type": "WebSite",
      name: "TatiAssam",
      url: "https://tatiassam.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://tatiassam.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: "https://tatiassam.com/products",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {children}
    </>
  );
}
