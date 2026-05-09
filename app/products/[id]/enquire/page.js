import EnquireClient from "./EnquireClient";

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/products/${unwrappedParams.id}`);
    const data = await res.json();
    if (data.success && data.data) {
      return {
        title: `Enquire about ${data.data.name} | TatiAssam`,
      };
    }
  } catch (err) {
    console.error("Metadata fetch error:", err);
  }
  return {
    title: "Product Enquiry | TatiAssam",
  };
}

export default async function EnquirePageServer({ params, searchParams }) {
  const unwrappedParams = await params;
  const unwrappedSearchParams = await searchParams;
  let product = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/products/${unwrappedParams.id}`, { cache: "no-store" });
    const data = await res.json();
    if (data.success) {
      product = data.data;
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  if (!product) {
    return <div style={{ padding: "4rem", textAlign: "center" }}>Product not found.</div>;
  }

  return (
    <EnquireClient product={product} id={unwrappedParams.id} searchParams={unwrappedSearchParams} />
  );
}
