export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tatiassam.com';
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  // ── Static routes with proper priorities ──
  const staticRoutes = [
    { path: '',              changeFrequency: 'daily',   priority: 1.0  },
    { path: '/products',     changeFrequency: 'daily',   priority: 0.9  },
    { path: '/about',        changeFrequency: 'monthly', priority: 0.7  },
    { path: '/contact',      changeFrequency: 'monthly', priority: 0.7  },
    { path: '/faq',          changeFrequency: 'monthly', priority: 0.7  },
    { path: '/blog',         changeFrequency: 'weekly',  priority: 0.8  },
    { path: '/sustainability', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/designer',    changeFrequency: 'monthly', priority: 0.6  },
    { path: '/gift-cards',   changeFrequency: 'monthly', priority: 0.5  },
    { path: '/shipping',     changeFrequency: 'monthly', priority: 0.5  },
    { path: '/size-guide',   changeFrequency: 'monthly', priority: 0.5  },
    { path: '/privacy',      changeFrequency: 'yearly',  priority: 0.3  },
    { path: '/terms',        changeFrequency: 'yearly',  priority: 0.3  },
    { path: '/cookies',      changeFrequency: 'yearly',  priority: 0.3  },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // ── Dynamic product routes ──
  let productRoutes = [];
  try {
    const res = await fetch(`${apiBaseUrl}/api/products?limit=500`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.data) {
      productRoutes = data.data.map((product) => ({
        url: `${baseUrl}/products/${product._id}`,
        lastModified: new Date(product.updatedAt || new Date()).toISOString(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Sitemap: failed to fetch products:", error.message);
  }

  // ── Dynamic blog post routes ──
  let blogRoutes = [];
  try {
    const res = await fetch(`${apiBaseUrl}/api/blogs`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.data) {
      blogRoutes = data.data.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.createdAt || new Date()).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      }));
    }
  } catch (error) {
    console.error("Sitemap: failed to fetch blog posts:", error.message);
  }

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
