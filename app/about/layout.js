const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tatiassam.com";

export const metadata = {
  title: "About Us — Our Story & Mission | TatiAssam",
  description:
    "TatiAssam was founded in 2022 to preserve Assam's centuries-old textile traditions. We partner with 200+ artisans across 12 districts, bringing authentic handwoven Mekhela Chador, Muga silk, and ethnic wear to the modern world.",
  keywords: [
    "TatiAssam about", "Assam weaving heritage", "Sualkuchi silk weavers",
    "handloom artisans India", "Mekhela Chador history",
    "ethical fashion Assam", "fair trade handloom"
  ],
  openGraph: {
    title: "About Us — Our Story & Mission | TatiAssam",
    description: "Learn about TatiAssam's mission to preserve and celebrate the weaving heritage of Assam through authentic ethnic wear.",
    url: `${BASE_URL}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About TatiAssam — Our Story",
    description: "Preserving Assam's weaving heritage through authentic ethnic wear.",
  },
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
};

export default function AboutLayout({ children }) {
  /* ── AboutPage JSON-LD ── */
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About TatiAssam",
    description:
      "TatiAssam is a platform dedicated to the artisans and weavers of Assam. Founded in 2022, we partner directly with master weavers across districts like Sualkuchi, Barpeta, and Majuli to bring authentic handcrafted ethnic wear to customers worldwide.",
    url: `${BASE_URL}/about`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "TatiAssam",
      foundingDate: "2022",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: 200,
        unitText: "artisan partners",
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "About Us", item: `${BASE_URL}/about` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {children}
    </>
  );
}
