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
  title: "TatiAssam | Authentic Assam Ethnic Wear & Traditional Clothing",
  description: "Shop authentic Assam ethnic wear, including traditional Mekhela Chador, Kurtas, and kids' traditional clothing at TatiAssam. Hand-crafted precision blending tradition with modern aesthetics.",
  keywords: [
    "Assam ethnic wear", "Mekhela Chador", "Assamese silk saree",
    "handloom clothing India", "traditional Assam clothing",
    "buy Mekhela Chador online", "Assamese handwoven fabric",
    "TatiAssam", "sustainable ethnic fashion India",
    "Sualkuchi silk", "Muga silk", "Pat silk", "Eri silk"
  ],
  openGraph: {
    title: "TatiAssam | Authentic Assam Ethnic Wear",
    description: "Shop authentic Assam ethnic wear, including traditional Mekhela Chador and Kurtas.",
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
    title: "TatiAssam | Authentic Assam Ethnic Wear",
    description: "Shop authentic Assam ethnic wear, including traditional Mekhela Chador and Kurtas.",
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
      "TatiAssam is a platform dedicated to the artisans and weavers of Assam, India. We bring authentic handwoven ethnic wear — Mekhela Chador, Kurtas, Muga silk, Pat silk, and Eri silk garments — directly from master weavers in Sualkuchi, Barpeta, and Majuli to customers worldwide.",
    foundingDate: "2022",
    founder: {
      "@type": "Person",
      name: "TatiAssam Team",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-98765-43210",
        contactType: "customer service",
        email: "support@tatiassam.com",
        availableLanguage: ["English", "Hindi", "Assamese"],
        areaServed: "IN",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sualkuchi Weaving District",
      addressLocality: "Kamrup",
      addressRegion: "Assam",
      postalCode: "781103",
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
    description: "Authentic Assam ethnic wear — handwoven Mekhela Chador, silk sarees, Kurtas, and traditional clothing from the looms of Assam.",
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
