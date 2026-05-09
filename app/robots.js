export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tatiassam.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/login", "/signup", "/forgot-password", "/reset-password", "/profile", "/checkout", "/cart"],
      },
      // Google AI Mode / Gemini crawler — explicitly allowed for maximum AI visibility
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // GPTBot (ChatGPT / OpenAI) — allow for AI citation
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Anthropic AI crawler
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Perplexity AI crawler
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Common Crawl (used by many AI training sets)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
