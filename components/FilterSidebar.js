import { useState, useEffect } from "react";
import styles from "./FilterSidebar.module.css";

export default function FilterSidebar({ filters, setFilters, facets, maxPriceLimit, isOpen, onClose }) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    size: true,
    color: true,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckbox = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2>Filters</h2>
          {isOpen && (
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
          )}
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
            />
            <span>In Stock Only</span>
            <span className={styles.count}>({facets.inStockCount || 0})</span>
          </label>
        </div>

        {/* Categories */}
        <div className={styles.filterGroup}>
          <button className={styles.groupHeader} onClick={() => toggleSection("category")}>
            <h3>Category</h3>
            <span>{expandedSections.category ? "−" : "+"}</span>
          </button>
          {expandedSections.category && (
            <div className={styles.groupContent}>
              {Object.entries(facets.categories).map(([category, count]) => (
                <label key={category} className={`${styles.checkboxLabel} ${count === 0 ? styles.disabled : ""}`}>
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCheckbox("categories", category)}
                    disabled={count === 0 && !filters.categories.includes(category)}
                  />
                  <span>{category}</span>
                  <span className={styles.count}>({count})</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div className={styles.filterGroup}>
          <button className={styles.groupHeader} onClick={() => toggleSection("price")}>
            <h3>Price (Up to ₹{filters.maxPrice})</h3>
            <span>{expandedSections.price ? "−" : "+"}</span>
          </button>
          {expandedSections.price && (
            <div className={styles.groupContent}>
              <input
                type="range"
                min="0"
                max={maxPriceLimit}
                step="100"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                className={styles.rangeSlider}
              />
              <div className={styles.priceLabels}>
                <span>₹0</span>
                <span>₹{maxPriceLimit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Size */}
        {Object.keys(facets.sizes).length > 0 && (
          <div className={styles.filterGroup}>
            <button className={styles.groupHeader} onClick={() => toggleSection("size")}>
              <h3>Size</h3>
              <span>{expandedSections.size ? "−" : "+"}</span>
            </button>
            {expandedSections.size && (
              <div className={styles.groupContent}>
                {Object.entries(facets.sizes).map(([size, count]) => (
                  <label key={size} className={`${styles.checkboxLabel} ${count === 0 ? styles.disabled : ""}`}>
                    <input
                      type="checkbox"
                      checked={filters.sizes.includes(size)}
                      onChange={() => handleCheckbox("sizes", size)}
                      disabled={count === 0 && !filters.sizes.includes(size)}
                    />
                    <span>{size}</span>
                    <span className={styles.count}>({count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Color */}
        {Object.keys(facets.colors).length > 0 && (
          <div className={styles.filterGroup}>
            <button className={styles.groupHeader} onClick={() => toggleSection("color")}>
              <h3>Color</h3>
              <span>{expandedSections.color ? "−" : "+"}</span>
            </button>
            {expandedSections.color && (
              <div className={styles.swatchContainer}>
                {Object.entries(facets.colors).map(([color, count]) => {
                  const colorMap = {
                    Red: "#ef4444",
                    Blue: "#3b82f6",
                    Green: "#10b981",
                    Gold: "#eab308",
                    Black: "#1f2937",
                    White: "#ffffff",
                    Yellow: "#facc15",
                    Pink: "#ec4899",
                  };
                  const bgColor = colorMap[color] || color.toLowerCase();
                  const isSelected = filters.colors.includes(color);

                  return (
                    <button
                      key={color}
                      className={`${styles.colorSwatch} ${isSelected ? styles.selected : ""} ${
                        count === 0 && !isSelected ? styles.disabledSwatch : ""
                      }`}
                      style={{ backgroundColor: bgColor }}
                      title={`${color} (${count})`}
                      onClick={() => {
                        if (count > 0 || isSelected) {
                          handleCheckbox("colors", color);
                        }
                      }}
                    >
                      {isSelected && <span className={styles.checkmark}>✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
