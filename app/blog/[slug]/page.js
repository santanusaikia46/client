import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tatiassam.com";

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').trim();
};

async function fetchPost(slug) {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
    const res = await fetch(`${apiBase}/api/blogs/${slug}`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success && data.data) return data.data;
  } catch (err) {
    console.error("Failed to fetch blog post:", err.message);
  }
  return null;
}

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const post = await fetchPost(unwrappedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found | TatiAssam Blog",
      description: "This blog post could not be found.",
    };
  }

  const plainContent = stripHtml(post.content);

  return {
    title: `${post.title} | TatiAssam Blog`,
    description: post.excerpt || plainContent.substring(0, 160),
    keywords: [post.tag, "TatiAssam blog", "Assam textiles", "heritage stories"].filter(Boolean),
    openGraph: {
      title: post.title,
      description: post.excerpt || plainContent.substring(0, 160),
      url: `${BASE_URL}/blog/${unwrappedParams.slug}`,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt || post.createdAt,
      authors: [post.author?.name || "TatiAssam"],
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || plainContent.substring(0, 160),
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${unwrappedParams.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const unwrappedParams = await params;
  const post = await fetchPost(unwrappedParams.slug);

  if (!post) return notFound();

  const plainContent = stripHtml(post.content);

  /* ── Article JSON-LD ── */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || plainContent.substring(0, 160),
    image: post.image ? [post.image] : [],
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "TatiAssam",
    },
    publisher: {
      "@type": "Organization",
      name: "TatiAssam",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${unwrappedParams.slug}`,
    },
    ...(post.tag && { articleSection: post.tag }),
  };

  /* ── BreadcrumbList JSON-LD ── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${unwrappedParams.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
