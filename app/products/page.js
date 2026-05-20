"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import FilterSidebar from "../../components/FilterSidebar";
import ActiveFilters from "../../components/ActiveFilters";

const MAX_PRICE = 15000;

function ProductsList() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({
    categories: urlCategory ? [urlCategory] : [],
    sizes: [],
    colors: [],
    maxPrice: MAX_PRICE,
    inStock: false,
  });

  // Sync URL category if it changes and isn't already selected
  useEffect(() => {
    if (urlCategory) {
      setFilters(prev => {
        if (!prev.categories.includes(urlCategory)) {
          return { ...prev, categories: [...prev.categories, urlCategory] };
        }
        return prev;
      });
    }
  }, [urlCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?limit=100`;
        if (searchQuery) {
          url += `&keyword=${encodeURIComponent(searchQuery)}`;
        }
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.success) {
          setRawProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  // Filtering Logic
  const matchCategory = (p, cats) => {
    if (cats.length === 0) return true;
    return cats.some(c => {
      if (c === "Made to Order") return p.featured;
      return p.category === c;
    });
  };
  const matchPrice = (p, maxP) => p.price <= maxP;
  const matchStock = (p, inStock) => !inStock || p.countInStock > 0;
  const matchVariants = (p, sizes, colors) => {
    if (sizes.length === 0 && colors.length === 0) return true;
    if (!p.variants || p.variants.length === 0) return false;
    
    // A variant must match BOTH selected sizes and colors if both are filtered.
    // However, across the product, we just need ANY variant to match the required combinations.
    return p.variants.some(v => {
      const sizeMatch = sizes.length === 0 || sizes.includes(v.size);
      const colorMatch = colors.length === 0 || colors.includes(v.color);
      return sizeMatch && colorMatch;
    });
  };

  const filteredProducts = useMemo(() => {
    return rawProducts.filter(p => 
      matchCategory(p, filters.categories) &&
      matchPrice(p, filters.maxPrice) &&
      matchStock(p, filters.inStock) &&
      matchVariants(p, filters.sizes, filters.colors)
    );
  }, [rawProducts, filters]);

  // Facet Counts - dynamically calculated so counts show how many products WOULD match
  const facets = useMemo(() => {
    const categories = {};
    const sizes = {};
    const colors = {};
    let inStockCount = 0;

    // 1. Initialize all possible facet keys from raw data
    rawProducts.forEach(p => {
      if (p.category) categories[p.category] = 0;
      if (p.featured) categories["Made to Order"] = 0;
      if (p.variants) {
        p.variants.forEach(v => {
          if (v.size) sizes[v.size] = 0;
          if (v.color) colors[v.color] = 0;
        });
      }
    });

    // 2. Compute counts dynamically by evaluating filters minus the current facet's filter
    rawProducts.forEach(p => {
      const mCategory = matchCategory(p, filters.categories);
      const mPrice = matchPrice(p, filters.maxPrice);
      const mStock = matchStock(p, filters.inStock);
      const mVariantsSize = matchVariants(p, filters.sizes, []);
      const mVariantsColor = matchVariants(p, [], filters.colors);
      const mVariantsBoth = matchVariants(p, filters.sizes, filters.colors);

      // Category count: ignore category filter
      if (mPrice && mStock && mVariantsBoth) {
        if (p.category) categories[p.category] = (categories[p.category] || 0) + 1;
        if (p.featured) categories["Made to Order"] = (categories["Made to Order"] || 0) + 1;
      }

      // Size count: ignore size filter
      if (mCategory && mPrice && mStock && mVariantsColor) {
        if (p.variants) {
          const uniqueSizes = [...new Set(p.variants.filter(v => filters.colors.length === 0 || filters.colors.includes(v.color)).map(v => v.size).filter(Boolean))];
          uniqueSizes.forEach(s => { sizes[s] = (sizes[s] || 0) + 1; });
        }
      }

      // Color count: ignore color filter
      if (mCategory && mPrice && mStock && mVariantsSize) {
        if (p.variants) {
          const uniqueColors = [...new Set(p.variants.filter(v => filters.sizes.length === 0 || filters.sizes.includes(v.size)).map(v => v.color).filter(Boolean))];
          uniqueColors.forEach(c => { colors[c] = (colors[c] || 0) + 1; });
        }
      }

      // InStock count: ignore stock filter
      if (mCategory && mPrice && mVariantsBoth && p.countInStock > 0) {
        inStockCount++;
      }
    });

    return { categories, sizes, colors, inStockCount };
  }, [rawProducts, filters]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" }
  ];
  if (urlCategory) breadcrumbs.push({ label: urlCategory, href: `/products?category=${urlCategory}` });
  else if (searchQuery) breadcrumbs.push({ label: `Search: ${searchQuery}`, href: `/products?search=${searchQuery}` });

  return (
    <div className={styles.container}>
      <Breadcrumbs items={breadcrumbs} />
      
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {urlCategory ? `${urlCategory}'s Collection` : searchQuery ? `Results for "${searchQuery}"` : "All Products"}
        </h1>
        <span className={styles.resultCount}>{filteredProducts.length} Results</span>
      </div>

      <div className={styles.layout}>
        <FilterSidebar 
          filters={filters} 
          setFilters={setFilters} 
          facets={facets} 
          maxPriceLimit={MAX_PRICE} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <div className={styles.mainContent}>
          <ActiveFilters filters={filters} setFilters={setFilters} maxPriceLimit={MAX_PRICE} />
          
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`} className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={product.image} alt={product.name} className={styles.image} loading="lazy" />
                  <div className={styles.cardOverlay}>
                    <span className={styles.overlayLabel}>View Product</span>
                  </div>
                </div>
                <div className={styles.content}>
                  <h2 className={styles.productName}>{product.name}</h2>
                  <p className={styles.price}>₹{product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}

            {filteredProducts.length === 0 && (
              <div className={styles.noResults}>
                <h3>No products found.</h3>
                <p>Try adjusting your filters.</p>
                <button 
                  className={styles.clearBtn} 
                  onClick={() => setFilters({categories: [], sizes: [], colors: [], maxPrice: MAX_PRICE, inStock: false})}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Filter Button */}
      <button className={styles.mobileFilterBtn} onClick={() => setIsSidebarOpen(true)}>
        Filter & Sort
      </button>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{padding: '4rem', textAlign: 'center'}}>Loading...</div>}>
      <ProductsList />
    </Suspense>
  );
}
