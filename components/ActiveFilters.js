import styles from "./ActiveFilters.module.css";

export default function ActiveFilters({ filters, setFilters, maxPriceLimit }) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.maxPrice < maxPriceLimit ||
    filters.inStock;

  if (!hasActiveFilters) return null;

  const removeFilter = (type, value = null) => {
    if (type === "maxPrice") {
      setFilters((prev) => ({ ...prev, maxPrice: maxPriceLimit }));
    } else if (type === "inStock") {
      setFilters((prev) => ({ ...prev, inStock: false }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [type]: prev[type].filter((v) => v !== value),
      }));
    }
  };

  const clearAll = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      maxPrice: maxPriceLimit,
      inStock: false,
    });
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>Active Filters:</span>
      <div className={styles.tags}>
        {filters.inStock && (
          <button className={styles.tag} onClick={() => removeFilter("inStock")}>
            In Stock <span>&times;</span>
          </button>
        )}
        {filters.categories.map((cat) => (
          <button key={`cat-${cat}`} className={styles.tag} onClick={() => removeFilter("categories", cat)}>
            {cat} <span>&times;</span>
          </button>
        ))}
        {filters.sizes.map((size) => (
          <button key={`size-${size}`} className={styles.tag} onClick={() => removeFilter("sizes", size)}>
            Size: {size} <span>&times;</span>
          </button>
        ))}
        {filters.colors.map((color) => (
          <button key={`color-${color}`} className={styles.tag} onClick={() => removeFilter("colors", color)}>
            Color: {color} <span>&times;</span>
          </button>
        ))}
        {filters.maxPrice < maxPriceLimit && (
          <button className={styles.tag} onClick={() => removeFilter("maxPrice")}>
            Up to ₹{filters.maxPrice} <span>&times;</span>
          </button>
        )}
      </div>
      <button className={styles.clearAll} onClick={clearAll}>
        Clear All
      </button>
    </div>
  );
}
