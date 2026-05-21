import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../context/ToastContext";
import ToastContainer from "../components/ToastContainer";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tatiassam.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "TatiAssam | Sustainable Handloom Fabrics, Women's Clothing & Home Decor",
  description: "Shop organic, sustainable handloom fabrics, women's ethnic clothing, and artisanal home decor at TatiAssam. Sourced directly from weavers in Dibrugarh and across Assam.",
  keywords: [
    "Assam ethnic wear", "Mekhela Chador", "Assamese silk saree",
    "handloom clothing India", "traditional Assam clothing",
    "buy Mekhela Chador online", "Assamese handwoven fabric",
    "TatiAssam", "sustainable ethnic fashion India",
    "Sualkuchi silk", "Muga silk", "Pat silk", "Eri silk"
  ],
  openGraph: {
    title: "TatiAssam | Sustainable Handloom Fabrics, Women's Clothing & Home Decor",
    description: "Shop organic, sustainable handloom fabrics, women's ethnic clothing, and artisanal home decor at TatiAssam.",
    url: BASE_URL,
    siteName: "TatiAssam",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "TatiAssam Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TatiAssam | Sustainable Handloom Fabrics, Women's Clothing & Home Decor",
    description: "Shop organic, sustainable handloom fabrics, women's ethnic clothing, and artisanal home decor at TatiAssam.",
    images: ["/logo.svg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "googlef36313df262e45e2",
  },
};

/* ── Sitewide JSON-LD: Organization + WebSite with SearchAction ── */
function SitewideJsonLd() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "TatiAssam",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.svg`,
      width: 512,
      height: 512,
    },
    description:
      "TatiAssam is a platform dedicated to sustainable, organic handloom products. We bring authentic handwoven fabrics, women's clothing, and home decor directly from artisans in Dibrugarh and across Assam to customers worldwide.",
    foundingDate: "2022",
    founder: {
      "@type": "Person",
      name: "TatiAssam Team",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-93875-55306",
        contactType: "customer service",
        email: "tatiassam22@gmail.com",
        availableLanguage: ["English", "Hindi", "Assamese"],
        areaServed: "IN",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sonari Patty, New Market Road",
      addressLocality: "Dibrugarh",
      addressRegion: "Assam",
      postalCode: "786001",
      addressCountry: "IN",
    },
    sameAs: [
      "https://facebook.com/tatiassam",
      "https://instagram.com/tatiassam",
      "https://pinterest.com/tatiassam",
      "https://twitter.com/tatiassam",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "TatiAssam",
    url: BASE_URL,
    description: "Shop organic, sustainable handloom fabrics, women's ethnic clothing, and artisanal home decor at TatiAssam.",
    publisher: { "@id": `${BASE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SitewideJsonLd />
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Footer />
              <ToastContainer />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
