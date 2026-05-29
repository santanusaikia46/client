import ProductClient from "./ProductClient";

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').trim();
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tatiassam.com";

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  try {
    // Note: ensure NEXT_PUBLIC_API_BASE_URL is reachable from server
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/products/${unwrappedParams.id}`);
    if (!res.ok) {
      console.error(`Failed to fetch metadata: ${res.status} ${res.statusText}`);
      return { title: "Product | TatiAssam" };
    }
    const data = await res.json();
    if (data.success && data.data) {
      const product = data.data;
      const mkt = product.marketing || {};
      const plainDesc = stripHtml(product.description);

      return {
        title: mkt.seoTitle || `${product.name} - Sustainable Assamese Handloom | TatiAssam`,
        description: mkt.metaDescription || plainDesc.substring(0, 160),
        keywords: mkt.seoKeywords ? mkt.seoKeywords.split(',').map(k => k.trim()) : [
          product.name, product.category, "TatiAssam", "Assam ethnic wear", "handwoven"
        ],
        openGraph: {
          title: mkt.seoTitle || `${product.name} - Sustainable Assamese Handloom | TatiAssam`,
          description: mkt.metaDescription || plainDesc.substring(0, 160),
          url: `${BASE_URL}/products/${unwrappedParams.id}`,
          type: "website",
          images: product.images?.length
            ? product.images.map(img => ({ url: img, width: 800, height: 800, alt: product.name }))
            : [{ url: product.image, width: 800, height: 800, alt: product.name }],
        },
        twitter: {
          card: "summary_large_image",
          title: product.name,
          description: plainDesc.substring(0, 160),
          images: [product.image],
        },
        alternates: {
          canonical: `${BASE_URL}/products/${unwrappedParams.id}`,
        },
      };
    }
  } catch (err) {
    console.error("Metadata fetch error:", err);
  }
  return {
    title: "Product Not Found | TatiAssam",
    description: "Product details could not be loaded."
  };
}

export default async function ProductPageServer({ params }) {
  const unwrappedParams = await params;
  let product = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/products/${unwrappedParams.id}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        product = data.data;
      }
    } else {
      console.warn(`Server returned ${res.status}: ${res.statusText} for product ${unwrappedParams.id}`);
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  if (!product) {
    return <div style={{ padding: "4rem", textAlign: "center" }}>Product not found.</div>;
  }

  const plainDesc = stripHtml(product.description);
  const specs = product.specifications || {};

  // ── Enriched Schema.org JSON-LD for AI Mode ──
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images ? [product.image, ...product.images] : [product.image],
    description: plainDesc,
    brand: {
      "@type": "Brand",
      name: "TatiAssam",
    },
    ...(product.sku && { sku: product.sku }),
    ...(product.category && { category: product.category }),
    ...(specs.material && { material: specs.material }),
    ...(specs.fabric && { material: specs.fabric }),
    ...(product.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.numReviews || 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/products/${product._id || unwrappedParams.id}`,
      priceCurrency: "INR",
      price: product.price,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: "https://schema.org/NewCondition",
      availability: product.countInStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "TatiAssam",
        url: BASE_URL,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 5,
            maxValue: 7,
            unitCode: "d",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  // ── BreadcrumbList JSON-LD ──
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${BASE_URL}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${BASE_URL}/products/${product._id || unwrappedParams.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductClient product={product} id={unwrappedParams.id} />
    </>
  );
}
