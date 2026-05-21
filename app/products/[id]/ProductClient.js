"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DOMPurify from "dompurify";

const sanitizeHTML = (html) => {
  if (typeof window === 'undefined') {
    return html;
  }
  return DOMPurify.sanitize(html);
};

export default function ProductClient({ product, id }) {
  const router = useRouter();
  
  const [activeImage, setActiveImage] = useState(product?.image || null);

  // Magnifier State
  const imgRef = useRef(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierStyle, setMagnifierStyle] = useState({ display: 'none' });
  const [lensStyle, setLensStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    
    // Zoom level
    const zoomLevel = 2.5;

    // Calculate cursor position relative to the image
    let x = e.clientX - left;
    let y = e.clientY - top;

    // Lens dimensions
    const lensWidth = width / zoomLevel;
    const lensHeight = height / zoomLevel;

    // Prevent lens from going outside the image bounds
    if (x < lensWidth / 2) x = lensWidth / 2;
    if (x > width - lensWidth / 2) x = width - lensWidth / 2;
    if (y < lensHeight / 2) y = lensHeight / 2;
    if (y > height - lensHeight / 2) y = height - lensHeight / 2;

    // Update lens position
    setLensStyle({
      left: `${x - lensWidth / 2}px`,
      top: `${y - lensHeight / 2}px`,
      width: `${lensWidth}px`,
      height: `${lensHeight}px`
    });

    // Update zoomed image background position
    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;

    setMagnifierStyle({
      display: 'block',
      backgroundImage: `url(${activeImage || product.image})`,
      backgroundSize: `${zoomLevel * 100}% ${zoomLevel * 100}%`,
      backgroundPosition: `${bgX}% ${bgY}%`
    });
  };

  const handleMouseEnter = () => {
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
    setMagnifierStyle({ display: 'none' });
  };

  // Variant Selection State
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  if (!product) {
    return <div className={styles.loading}>Product not found.</div>;
  }

  const hasVariants = product.variants && product.variants.length > 0;
  
  const availableSizes = hasVariants ? [...new Set(product.variants.map(v => v.size).filter(Boolean))] : [];
  const availableColors = hasVariants ? [...new Set(product.variants.map(v => v.color).filter(Boolean))] : [];

  let currentPrice = product.price;

  if (hasVariants) {
    const matchedVariant = product.variants.find(v => {
      const sizeMatch = availableSizes.length === 0 || v.size === selectedSize;
      const colorMatch = availableColors.length === 0 || v.color === selectedColor;
      return sizeMatch && colorMatch;
    });

    if (matchedVariant) {
      currentPrice = matchedVariant.price;
    }
  }

  const handleEnquireClick = () => {
    const queryParams = new URLSearchParams();
    if (selectedColor) queryParams.append('color', selectedColor);
    if (selectedSize) queryParams.append('size', selectedSize);
    
    router.push(`/products/${id}/enquire?${queryParams.toString()}`);
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.category, href: `/products?category=${product.category}` },
    { label: product.name, href: `/products/${id}` }
  ];

  return (
    <div className={styles.container}>
      <Breadcrumbs items={breadcrumbs} />

      <div className={styles.productLayout}>
        <div className={styles.imageContainer}>
          {product.images && product.images.length > 0 && (
            <div className={`${styles.thumbnailGallery} ${styles.desktopGallery}`}>
              {[product.image, ...product.images].map((imgUrl, index) => (
                <img 
                  key={index} 
                  src={imgUrl} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  className={`${styles.thumbnail} ${activeImage === imgUrl ? styles.activeThumbnail : ''}`}
                  onClick={() => setActiveImage(imgUrl)}
                />
              ))}
            </div>
          )}

          <div 
            className={styles.imageWrapper}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              ref={imgRef}
              src={activeImage || product.image} 
              alt={product.name} 
              className={styles.image} 
            />
            {showMagnifier && <div className={styles.lens} style={lensStyle}></div>}
            {showMagnifier && <div className={styles.zoomPortal} style={magnifierStyle}></div>}
          </div>
        </div>

        <div className={styles.details}>
          {/* Mobile Thumbnail Gallery - Shown only on small screens via CSS */}
          {product.images && product.images.length > 0 && (
            <div className={`${styles.thumbnailGallery} ${styles.mobileGallery}`}>
              {[product.image, ...product.images].map((imgUrl, index) => (
                <img 
                  key={index} 
                  src={imgUrl} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  className={`${styles.thumbnail} ${activeImage === imgUrl ? styles.activeThumbnail : ''}`}
                  onClick={() => setActiveImage(imgUrl)}
                />
              ))}
            </div>
          )}

          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>₹{currentPrice.toFixed(2)}</p>
          <div 
            className={styles.description} 
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(product.description) }} 
            suppressHydrationWarning
          />
          
          {product.marketing?.keyFeatures && (
            <div className={styles.featuresSection}>
              <h3>Key Features</h3>
              <ul className={styles.featureList}>
                {product.marketing.keyFeatures.split('\n').filter(Boolean).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {(product.material || product.careInstructions) && (
            <div className={styles.specifications}>
              <h3>Specifications</h3>
              <ul className={styles.specList}>
                {product.material && <li><strong>Material:</strong> {product.material}</li>}
                {product.careInstructions && (
                  <li>
                    <strong>Care:</strong> 
                    <div 
                      className={styles.careContent}
                      dangerouslySetInnerHTML={{ __html: sanitizeHTML(product.careInstructions) }} 
                      suppressHydrationWarning
                    />
                  </li>
                )}
              </ul>
            </div>
          )}

          {hasVariants && (
            <div className={styles.variantsSection}>
              {availableColors.length > 0 && (
                <div className={styles.variantGroup}>
                  <label>Color: <span style={{fontWeight: 'normal', color: '#666'}}>{selectedColor || "Select a color"}</span></label>
                  <div className={styles.variantOptions}>
                    {availableColors.map(color => {
                      const colorMap = { Red: "#ef4444", Blue: "#3b82f6", Green: "#10b981", Gold: "#eab308", Black: "#1f2937", White: "#ffffff" };
                      const bgColor = colorMap[color] || color.toLowerCase();
                      return (
                         <button 
                          key={color} 
                          className={`${styles.colorSwatch} ${selectedColor === color ? styles.selectedColor : ''}`}
                          style={{ backgroundColor: bgColor }}
                          title={color}
                          onClick={() => setSelectedColor(color)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {availableSizes.length > 0 && (
                <div className={styles.variantGroup}>
                  <label>Size: <span style={{fontWeight: 'normal', color: '#666'}}>{selectedSize || "Select a size"}</span></label>
                  <div className={styles.variantOptions}>
                    {availableSizes.map(size => (
                      <button 
                        key={size} 
                        className={`${styles.sizeSwatch} ${selectedSize === size ? styles.selectedSize : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className={styles.actions}>
            <button 
              className={styles.addToCartBtn} 
              onClick={handleEnquireClick}
            >
              Enquire About This Product
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Sticky Action Bar */}
      <div className={styles.mobileStickyBar}>
        <div className={styles.stickyBarInner}>
          <div className={styles.stickyBarInfo}>
            <span className={styles.stickyName}>{product.name}</span>
            <span className={styles.stickyPrice}>₹{currentPrice.toFixed(2)}</span>
          </div>
          <button 
            className={styles.stickyAddBtn}
            onClick={handleEnquireClick}
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}
