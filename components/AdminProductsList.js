"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Star, 
  Image as ImageIcon, 
  Info, 
  Layers, 
  ChevronLeft,
  Save,
  Tag,
  Box,
  CheckCircle2,
  AlertCircle,
  Package,
  Scissors,
  Dna,
  Search,
  Filter,
  BarChart2,
  CheckSquare
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ImageUpload from "./ImageUpload";
import RichTextEditor from "./RichTextEditor";
import styles from "./AdminProductsList.module.css";

export default function AdminProductsList() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  const initialFormData = {
    name: "",
    price: "",
    image: "",
    category: "",
    subCategory: "",
    vendor: "",
    countInStock: "",
    description: "",
    images: "",
    material: "",
    careInstructions: "",
    fit: "",
    size: "",
    color: "",
    featured: false,
    isActive: true,
    hasColorVariation: true,
    variants: [],
    marketing: {
      slug: "",
      seoTitle: "",
      metaDescription: "",
      shortDescription: "",
      hook: "",
      keyFeatures: "",
      benefits: "",
      specifications: "",
      useCases: "",
      usp: "",
      seoKeywords: "",
      searchTags: "",
      faqs: "",
      socialMediaCaption: "",
      hashtags: "",
      adCopy: ""
    }
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Advanced States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStock, setFilterStock] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Derived Stats
  const stats = {
    totalValue: products.reduce((acc, p) => acc + (p.price * p.countInStock), 0),
    lowStock: products.filter(p => p.countInStock <= 5 && p.countInStock > 0).length,
    outOfStock: products.filter(p => p.countInStock === 0).length,
    featuredCount: products.filter(p => p.featured).length
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? p.category === filterCategory : true;
    const matchesStock = filterStock === "low" ? p.countInStock <= 5 : 
                        filterStock === "out" ? p.countInStock === 0 : true;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?limit=100&admin=true`);
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrimaryImageSuccess = (url) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleAdditionalImagesSuccess = (urls) => {
    setFormData(prev => {
      const current = prev.images.trim();
      const newUrls = Array.isArray(urls) ? urls.join('\n') : urls;
      return {
        ...prev,
        images: current ? `${current}\n${newUrls}` : newUrls
      };
    });
  };

  const handleVariantPrimaryImageSuccess = (index, url) => {
    handleVariantChange(index, 'image', url);
  };

  const handleVariantAdditionalImagesSuccess = (index, urls) => {
    const newUrls = Array.isArray(urls) ? urls.join('\n') : urls;
    const current = formData.variants[index].images ? formData.variants[index].images.trim() : "";
    handleVariantChange(index, 'images', current ? `${current}\n${newUrls}` : newUrls);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreate = () => {
    setCurrentProduct(null);
    setFormData(initialFormData);
    setFormStatus({ type: "", message: "" });
    setIsEditing(true);
  };

  const handleOpenEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name || "",
      price: product.price || "",
      image: product.image || "",
      category: product.category || "",
      subCategory: product.subCategory || "",
      vendor: product.vendor || "",
      countInStock: product.countInStock || "",
      description: product.description || "",
      images: product.images ? product.images.join('\n') : "",
      material: product.material || "",
      careInstructions: product.careInstructions || "",
      fit: product.fit || "",
      size: product.size || "",
      color: product.color || "",
      featured: product.featured || false,
      isActive: product.isActive !== undefined ? product.isActive : true,
      hasColorVariation: product.hasColorVariation !== undefined ? product.hasColorVariation : true,
      variants: (product.variants || []).map(v => ({
        ...v,
        images: v.images && Array.isArray(v.images) ? v.images.join('\n') : (v.images || "")
      })),
      marketing: product.marketing || {
        slug: "", seoTitle: "", metaDescription: "", shortDescription: "", hook: "", keyFeatures: "", benefits: "", specifications: "", useCases: "", usp: "", seoKeywords: "", searchTags: "", faqs: "", socialMediaCaption: "", hashtags: "", adCopy: ""
      }
    });
    setFormStatus({ type: "", message: "" });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleMarketingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      marketing: { ...prev.marketing, [name]: value }
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { size: "", color: "", price: "", countInStock: "", name: "", image: "", images: "", description: "" }]
    });
  };

  const removeVariant = (index) => {
    const newVariants = [...formData.variants];
    newVariants.splice(index, 1);
    setFormData({ ...formData, variants: newVariants });
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const url = currentProduct 
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${currentProduct._id}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`;
      
      const method = currentProduct ? "PUT" : "POST";

      const formattedVariants = formData.variants.map(v => ({
        size: v.size,
        color: v.color,
        price: Number(v.price),
        countInStock: Number(v.countInStock),
        name: v.name || "",
        image: v.image || "",
        images: v.images ? v.images.split('\n').map(url => url.trim()).filter(url => url) : [],
        description: v.description || ""
      }));

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          countInStock: Number(formData.countInStock),
          images: formData.images.split('\n').map(url => url.trim()).filter(url => url),
          variants: formattedVariants
        })
      });

      const data = await res.json();

      if (data.success) {
        setFormStatus({ type: "success", message: `Product successfully ${currentProduct ? 'updated' : 'created'}!` });
        await fetchProducts();
        setTimeout(() => {
          setIsEditing(false);
        }, 1500);
      } else {
        setFormStatus({ type: "error", message: data.message || "Failed to save product." });
      }
    } catch (error) {
      setFormStatus({ type: "error", message: "An error occurred while saving." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (data.success) {
        setProducts(products.filter(p => p._id !== id));
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  const handleToggleFeatured = async (product) => {
    const newFeatured = !product.featured;
    setProducts(prev => prev.map(p => p._id === product._id ? { ...p, featured: newFeatured } : p));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ featured: newFeatured })
      });
      const data = await res.json();
      if (!data.success) {
        setProducts(prev => prev.map(p => p._id === product._id ? { ...p, featured: !newFeatured } : p));
        alert("Failed to update featured status.");
      }
    } catch (err) {
      setProducts(prev => prev.map(p => p._id === product._id ? { ...p, featured: !newFeatured } : p));
      alert("An error occurred.");
    }
  };

  const handleToggleActive = async (product) => {
    const newActive = !product.isActive;
    setProducts(prev => prev.map(p => p._id === product._id ? { ...p, isActive: newActive } : p));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: newActive })
      });
      const data = await res.json();
      if (!data.success) {
        setProducts(prev => prev.map(p => p._id === product._id ? { ...p, isActive: !newActive } : p));
        alert("Failed to update active status.");
      }
    } catch (err) {
      setProducts(prev => prev.map(p => p._id === product._id ? { ...p, isActive: !newActive } : p));
      alert("An error occurred.");
    }
  };


  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(filteredProducts.map(p => p._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedProducts.length} products? This action cannot be undone.`)) return;
    
    for (const id of selectedProducts) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    
    setProducts(prev => prev.filter(p => !selectedProducts.includes(p._id)));
    setSelectedProducts([]);
  };

  const handleBulkToggleFeatured = async (status) => {
    for (const id of selectedProducts) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ featured: status })
      });
    }
    
    setProducts(prev => prev.map(p => selectedProducts.includes(p._id) ? { ...p, featured: status } : p));
    setSelectedProducts([]);
  };

  const handleBulkToggleActive = async (status) => {
    for (const id of selectedProducts) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: status })
      });
    }
    
    setProducts(prev => prev.map(p => selectedProducts.includes(p._id) ? { ...p, isActive: status } : p));
    setSelectedProducts([]);
  };

  if (loading && !products.length) return <div className={styles.loading}>Loading product inventory...</div>;

  if (isEditing) {
    return (
      <div className={styles.formContainer}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={handleCancelEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <ChevronLeft size={24} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRadius: '12px' }}>
              <Edit2 size={20} color="#0f172a" />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
              {currentProduct ? 'Edit Product Details' : 'Create New Inventory Item'}
            </h2>
          </div>
        </div>

        {formStatus.message && (
          <div className={`${styles.statusMessage} ${styles[formStatus.type]}`} style={{ borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem' }}>
            {formStatus.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {formStatus.message}
          </div>
        )}


        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Tag size={14} /> Product Name {(formData.variants.length > 0 && formData.hasColorVariation) && <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 'bold' }}>(Disabled: Base name locked when color variants exist)</span>}
                </div>
              </label>
              <input type="text" id="name" name="name" placeholder="e.g. Traditional Silk Saree" value={formData.name} onChange={handleInputChange} required disabled={formData.variants.length > 0 && formData.hasColorVariation} style={{ opacity: (formData.variants.length > 0 && formData.hasColorVariation) ? 0.6 : 1, cursor: (formData.variants.length > 0 && formData.hasColorVariation) ? 'not-allowed' : 'text' }} />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                <option value="">Select a Category</option>
                <option value="Women">Women</option>
                <option value="Home">Home</option>
                <option value="Fabric">Fabric</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subCategory">Sub Category (Customize)</label>
              <input type="text" id="subCategory" name="subCategory" placeholder="e.g. Silk, Cotton, etc." value={formData.subCategory} onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="vendor">Vendor Name</label>
              <input type="text" id="vendor" name="vendor" placeholder="e.g. TatiAssam Heritage" value={formData.vendor} onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price">Base Price (₹)</label>
              <input type="number" id="price" name="price" min="0" step="0.01" value={formData.price} onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="countInStock"><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Box size={14} /> Base Stock Count</div></label>
              <input type="number" id="countInStock" name="countInStock" min="0" value={formData.countInStock} onChange={handleInputChange} />
            </div>

            {(formData.variants.length === 0 || !formData.hasColorVariation) && (
              <>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="image"><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ImageIcon size={14} /> Primary Product Image</div></label>
                  <div style={{ display: 'flex', gap: '0', height: '48px' }}>
                    <input 
                      type="text" 
                      id="image" 
                      name="image" 
                      placeholder="Image URL or upload" 
                      value={formData.image} 
                      onChange={handleInputChange} 
                      style={{ 
                        flex: 1, 
                        height: '100%',
                        borderTopRightRadius: 0, 
                        borderBottomRightRadius: 0,
                        borderRight: 'none',
                        margin: 0,
                        fontSize: '0.9rem'
                      }}
                    />
                    <div style={{ height: '100%' }}>
                      <ImageUpload 
                        onUploadSuccess={handlePrimaryImageSuccess} 
                        compact={true} 
                      />
                    </div>
                  </div>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="images">Additional Image URLs (One per line)</label>
                  <textarea 
                    id="images" 
                    name="images" 
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" 
                    value={formData.images} 
                    onChange={handleInputChange} 
                    style={{ borderRadius: '12px', minHeight: '80px', fontSize: '0.9rem' }}
                  />
                  <div style={{ marginTop: '0.75rem' }}>
                    <ImageUpload 
                      label="Batch Upload Additional Images" 
                      onUploadSuccess={handleAdditionalImagesSuccess} 
                      multiple={true} 
                    />
                  </div>
                </div>
              </>
            )}

            <div className={`${styles.fullWidth}`} style={{ marginTop: '1rem', marginBottom: '0.5rem', background: '#f8fafc', padding: '0.85rem 1.25rem', borderRadius: '12px', borderLeft: '4px solid #3b82f6', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Info size={18} color="#3b82f6" />
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#0f172a', fontWeight: 700 }}>Specifications & Branding</h3>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="material"><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Dna size={14} /> Material</div></label>
              <input type="text" id="material" name="material" placeholder="e.g. Pure Muga Silk" value={formData.material} onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fit"><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Scissors size={14} /> Fit / Size Style</div></label>
              <input type="text" id="fit" name="fit" placeholder="e.g. Traditional Flow" value={formData.fit} onChange={handleInputChange} />
            </div>

            {(formData.variants.length === 0 || !formData.hasColorVariation) && (
              <>
                {formData.variants.length === 0 && (
                  <div className={styles.formGroup}>
                    <label htmlFor="size">Available Size(s)</label>
                    <input type="text" id="size" name="size" placeholder="e.g. S, M, L or Free Size" value={formData.size} onChange={handleInputChange} />
                  </div>
                )}
                <div className={styles.formGroup}>
                  <label htmlFor="color">Available Color(s)</label>
                  <input type="text" id="color" name="color" placeholder="e.g. Red, Blue, etc." value={formData.color} onChange={handleInputChange} />
                </div>
              </>
            )}

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="careInstructions">Care Instructions</label>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <RichTextEditor 
                  content={formData.careInstructions} 
                  onChange={(html) => setFormData(prev => ({ ...prev, careInstructions: html }))} 
                  placeholder="e.g. Dry clean only, Wash with cold water..."
                  token={token}
                  simple={true}
                />
              </div>
            </div>

            <div className={`${styles.fullWidth}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: '#f0fdf4', borderRadius: '16px', border: '1px solid #dcfce7', cursor: 'pointer' }}>
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                style={{ width: '20px', height: '20px', accentColor: '#166534', cursor: 'pointer' }}
              />
              <label htmlFor="featured" style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: '#166534', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Star size={18} fill={formData.featured ? "#166534" : "none"} />
                Promote to Homepage (Made to order Collection)
              </label>
            </div>

            <div className={`${styles.fullWidth}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: '#eff6ff', borderRadius: '16px', border: '1px solid #dbeafe', cursor: 'pointer' }}>
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                style={{ width: '20px', height: '20px', accentColor: '#2563eb', cursor: 'pointer' }}
              />
              <label htmlFor="isActive" style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: '#1e40af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color={formData.isActive ? "#2563eb" : "#94a3b8"} />
                Active & Visible to Customers
              </label>
            </div>

            {(formData.variants.length === 0 || !formData.hasColorVariation) && (
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="description">Editorial Description</label>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                  <RichTextEditor 
                    content={formData.description} 
                    onChange={(html) => setFormData(prev => ({ ...prev, description: html }))} 
                    placeholder="Write a premium description for this product..."
                    token={token}
                  />
                </div>
              </div>
            )}

            <div className={`${styles.fullWidth}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: '#fdf4ff', borderRadius: '16px', border: '1px solid #fbcfe8', cursor: 'pointer' }}>
              <input
                type="checkbox"
                id="hasColorVariation"
                name="hasColorVariation"
                checked={!!formData.hasColorVariation}
                onChange={handleInputChange}
                style={{ width: '20px', height: '20px', accentColor: '#db2777', cursor: 'pointer' }}
              />
              <label htmlFor="hasColorVariation" style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: '#be185d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={18} color={formData.hasColorVariation ? "#db2777" : "#f472b6"} />
                Is there any variation in colour of the product?
              </label>
            </div>

            <div className={`${styles.fullWidth}`} style={{ marginTop: '1rem', marginBottom: '0.5rem', background: '#f8fafc', padding: '0.85rem 1.25rem', borderRadius: '12px', borderLeft: '4px solid #8b5cf6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Layers size={18} color="#8b5cf6" />
                <h3 style={{ margin: 0, fontSize: '1rem', color: '#0f172a', fontWeight: 700 }}>SKU Variants</h3>
              </div>
              <button type="button" onClick={addVariant} className={styles.secondaryButton} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', margin: 0, border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={14} />
                Add Size/Color Variant
              </button>
            </div>

            {formData.variants.length > 0 && (
              <div className={`${styles.fullWidth}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {formData.variants.map((variant, index) => (
                  <div key={index} style={{ background: '#fff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#334155' }}>Variant {index + 1}</h4>
                      <button type="button" onClick={() => removeVariant(index)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                      <input type="text" placeholder="Size (e.g. M)" value={variant.size} onChange={(e) => handleVariantChange(index, 'size', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                      {formData.hasColorVariation && (
                        <input type="text" placeholder="Color (e.g. Red)" value={variant.color} onChange={(e) => handleVariantChange(index, 'color', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                      )}
                      <input type="number" placeholder="Price" min="0" step="0.01" required value={variant.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                      <input type="number" placeholder="Stock" min="0" required value={variant.countInStock} onChange={(e) => handleVariantChange(index, 'countInStock', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                    </div>

                    {formData.hasColorVariation && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem', display: 'block' }}>Variant Title</label>
                          <input type="text" placeholder="e.g. Classic Red Polo" value={variant.name || ''} onChange={(e) => handleVariantChange(index, 'name', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                        </div>
                        
                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem', display: 'block' }}>Primary Image URL</label>
                          <div style={{ display: 'flex', gap: '0', height: '40px' }}>
                            <input type="text" placeholder="https://..." value={variant.image || ''} onChange={(e) => handleVariantChange(index, 'image', e.target.value)} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', borderTopRightRadius: 0, borderBottomRightRadius: 0, border: '1px solid #cbd5e1', borderRight: 'none', margin: 0 }} />
                            <div style={{ height: '100%' }}>
                              <ImageUpload 
                                onUploadSuccess={(url) => handleVariantPrimaryImageSuccess(index, url)} 
                                compact={true} 
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem', display: 'block' }}>Additional Image URLs (Newline separated)</label>
                          <textarea placeholder="https://...&#10;https://..." value={variant.images || ''} onChange={(e) => handleVariantChange(index, 'images', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', minHeight: '60px' }} />
                          <div style={{ marginTop: '0.5rem' }}>
                            <ImageUpload 
                              label="Upload Addl. Images" 
                              onUploadSuccess={(urls) => handleVariantAdditionalImagesSuccess(index, urls)} 
                              multiple={true}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem', display: 'block' }}>Variant Details / Description</label>
                          <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
                            <RichTextEditor 
                              content={variant.description || ''} 
                              onChange={(html) => handleVariantChange(index, 'description', html)} 
                              placeholder="Specific details for this color/size..."
                              token={token}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {formData.variants.length === 0 && (
              <div className={`${styles.fullWidth}`} style={{ textAlign: 'center', padding: '2rem', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #e2e8f0', color: '#94a3b8', fontSize: '0.9rem' }}>
                No variants defined for this product.
              </div>
            )}

            <div className={`${styles.fullWidth}`} style={{ marginTop: '2rem', marginBottom: '0.5rem', background: '#f8fafc', padding: '0.85rem 1.25rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Tag size={18} color="#f59e0b" />
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#0f172a', fontWeight: 700 }}>Marketing & SEO Strategy (Internal)</h3>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="slug">URL Slug</label>
              <input type="text" id="slug" name="slug" value={formData.marketing?.slug || ''} onChange={handleMarketingChange} placeholder="e.g. elegant-silk-saree-red" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="seoTitle">SEO / Meta Title</label>
              <input type="text" id="seoTitle" name="seoTitle" value={formData.marketing?.seoTitle || ''} onChange={handleMarketingChange} placeholder="Premium [Product Name] | Your Brand" />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="metaDescription">Meta Description</label>
              <textarea id="metaDescription" name="metaDescription" value={formData.marketing?.metaDescription || ''} onChange={handleMarketingChange} placeholder="Write a compelling 150-160 character description for search engines..." style={{ minHeight: '60px', borderRadius: '8px' }} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="hook">One-Line Hook</label>
              <input type="text" id="hook" name="hook" value={formData.marketing?.hook || ''} onChange={handleMarketingChange} placeholder="A captivating one-liner to grab the customer's attention..." />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="shortDescription">Short Description</label>
              <textarea id="shortDescription" name="shortDescription" value={formData.marketing?.shortDescription || ''} onChange={handleMarketingChange} placeholder="A brief 2-3 sentence summary of the product..." style={{ minHeight: '80px', borderRadius: '8px' }} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="keyFeatures">Key Features (One per line)</label>
              <textarea id="keyFeatures" name="keyFeatures" value={formData.marketing?.keyFeatures || ''} onChange={handleMarketingChange} placeholder="- Feature 1&#10;- Feature 2&#10;- Feature 3" style={{ minHeight: '100px', borderRadius: '8px' }} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="benefits">Benefits (One per line)</label>
              <textarea id="benefits" name="benefits" value={formData.marketing?.benefits || ''} onChange={handleMarketingChange} placeholder="- Benefit 1&#10;- Benefit 2&#10;- Benefit 3" style={{ minHeight: '100px', borderRadius: '8px' }} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="specifications">Specifications Table Data</label>
              <textarea id="specifications" name="specifications" value={formData.marketing?.specifications || ''} onChange={handleMarketingChange} placeholder="Material: Pure Silk&#10;Weave: Handwoven..." style={{ minHeight: '80px', borderRadius: '8px' }} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="useCases">Use Cases / Scenarios</label>
              <textarea id="useCases" name="useCases" value={formData.marketing?.useCases || ''} onChange={handleMarketingChange} placeholder="Office wear, Weddings, Casual outings..." style={{ minHeight: '80px', borderRadius: '8px' }} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="usp">USP Highlight</label>
              <textarea id="usp" name="usp" value={formData.marketing?.usp || ''} onChange={handleMarketingChange} placeholder="What makes this product truly unique..." style={{ minHeight: '80px', borderRadius: '8px' }} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="seoKeywords">SEO Keywords Output</label>
              <textarea id="seoKeywords" name="seoKeywords" value={formData.marketing?.seoKeywords || ''} onChange={handleMarketingChange} placeholder="primary keyword, secondary keyword, long-tail phrase..." style={{ minHeight: '80px', borderRadius: '8px' }} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="searchTags">Backend Search Tags</label>
              <textarea id="searchTags" name="searchTags" value={formData.marketing?.searchTags || ''} onChange={handleMarketingChange} placeholder="tag1, tag2, tag3..." style={{ minHeight: '80px', borderRadius: '8px' }} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="faqs">FAQ Section</label>
              <textarea id="faqs" name="faqs" value={formData.marketing?.faqs || ''} onChange={handleMarketingChange} placeholder="Q: How do I wash this?&#10;A: Hand wash only..." style={{ minHeight: '100px', borderRadius: '8px' }} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="socialMediaCaption">Social Media Caption</label>
              <textarea id="socialMediaCaption" name="socialMediaCaption" value={formData.marketing?.socialMediaCaption || ''} onChange={handleMarketingChange} placeholder="Write an engaging caption for Instagram/Facebook..." style={{ minHeight: '80px', borderRadius: '8px' }} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="hashtags">Hashtags</label>
              <textarea id="hashtags" name="hashtags" value={formData.marketing?.hashtags || ''} onChange={handleMarketingChange} placeholder="#YourBrand #Handmade #AssameseFashion..." style={{ minHeight: '60px', borderRadius: '8px' }} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="adCopy">Ad Copy (Short & Long)</label>
              <textarea id="adCopy" name="adCopy" value={formData.marketing?.adCopy || ''} onChange={handleMarketingChange} placeholder="Short and long ad variations for campaigns..." style={{ minHeight: '100px', borderRadius: '8px' }} />
            </div>

          </div>

          <div className={styles.formActions} style={{ marginTop: '3rem', padding: '2rem', background: '#f8fafc', borderRadius: '24px', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" className={styles.secondaryButton} onClick={handleCancelEdit} disabled={isSubmitting} style={{ padding: '0.75rem 2rem', borderRadius: '12px' }}>
              Discard Changes
            </button>
            <button type="submit" className={styles.primaryButton} disabled={isSubmitting} style={{ padding: '0.75rem 2.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {isSubmitting ? 'Processing...' : <><Save size={18} /> Update Inventory</>}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Package size={24} color="#0f172a" />
          <h2 style={{ margin: 0, fontWeight: 800 }}>Product Intelligence</h2>
        </div>
        <button className={styles.primaryButton} onClick={handleOpenCreate} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px' }}>
          <Plus size={18} />
          New Product
        </button>
      </div>

      {/* Advanced Dashboard */}
      <div className={styles.dashboard}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon}`} style={{ background: '#eff6ff', color: '#3b82f6' }}>
              <BarChart2 size={20} />
            </div>
            <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>+12% vs last month</span>
          </div>
          <div className={styles.statValue}>₹{stats.totalValue.toLocaleString()}</div>
          <div className={styles.statLabel}>Inventory Value</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon}`} style={{ background: '#fef2f2', color: '#ef4444' }}>
              <AlertCircle size={20} />
            </div>
          </div>
          <div className={styles.statValue}>{stats.lowStock}</div>
          <div className={styles.statLabel}>Low Stock Alerts</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon}`} style={{ background: '#f8fafc', color: '#64748b' }}>
              <Box size={20} />
            </div>
          </div>
          <div className={styles.statValue}>{products.length}</div>
          <div className={styles.statLabel}>Total SKUs</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon}`} style={{ background: '#fff7ed', color: '#f59e0b' }}>
              <Star size={20} />
            </div>
          </div>
          <div className={styles.statValue}>{stats.featuredCount}</div>
          <div className={styles.statLabel}>Made to order Items</div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by name, category or vendor..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filterGroup}>
          <select 
            className={styles.filterSelect}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Women">Women</option>
            <option value="Home">Home</option>
            <option value="Fabric">Fabric</option>
          </select>

          <select 
            className={styles.filterSelect}
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
          >
            <option value="">Stock Status</option>
            <option value="low">Low Stock (≤5)</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Bulk Operations Bar */}
      {selectedProducts.length > 0 && (
        <div className={styles.bulkActions}>
          <div className={styles.bulkCount}>
            <CheckSquare size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            {selectedProducts.length} items selected
          </div>
          <div className={styles.bulkBtnGroup}>
            <button className={styles.bulkBtn} onClick={() => handleBulkToggleFeatured(true)}>
              <Star size={14} fill="currentColor" /> Made to order
            </button>
            <button className={styles.bulkBtn} onClick={() => handleBulkToggleFeatured(false)}>
              <Star size={14} /> Remove Made to order
            </button>
            <button className={styles.bulkBtn} onClick={() => handleBulkToggleActive(true)}>
              <CheckCircle2 size={14} /> Activate
            </button>
            <button className={styles.bulkBtn} onClick={() => handleBulkToggleActive(false)}>
              <AlertCircle size={14} /> Deactivate
            </button>
            <button className={`${styles.bulkBtn} ${styles.danger}`} onClick={handleBulkDelete}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
          <button 
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}
            onClick={() => setSelectedProducts([])}
          >
            Cancel
          </button>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Product</th>
              <th>Base Details</th>
              <th>Category</th>
              <th>Inventory</th>
              <th>Visibility</th>
              <th style={{ textAlign: 'center' }}>SKUs</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr 
                key={product._id} 
                className={selectedProducts.includes(product._id) ? styles.selectedRow : ''}
              >
                <td>
                  <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleSelectOne(product._id)}
                  />
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={product.image || '/images/sample.jpg'} alt={product.name} className={styles.productImage} />
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{product.name}</div>
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 700, color: '#10b981' }}>₹{product.price.toLocaleString()}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: {product._id.slice(-6)}</div>
                </td>
                <td>
                  <span style={{ padding: '0.35rem 0.75rem', background: '#f1f5f9', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                    {product.category}
                  </span>
                  {product.subCategory && (
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                      {product.subCategory}
                    </div>
                  )}
                </td>
                <td>
                  <div style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: product.countInStock > 5 ? '#166534' : '#991b1b',
                    backgroundColor: product.countInStock > 5 ? '#dcfce7' : '#fee2e2',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 800
                  }}>
                    {product.countInStock > 0 ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                    {product.countInStock} In Stock
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleToggleFeatured(product)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      background: product.featured ? '#fff7ed' : '#f8fafc',
                      color: product.featured ? '#ea580c' : '#94a3b8',
                      border: product.featured ? '1px solid #ffedd5' : '1px solid #e2e8f0',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Star size={12} fill={product.featured ? "#ea580c" : "none"} />
                    {product.featured ? 'Made to order' : 'Regular'}
                  </button>
                  <button
                    onClick={() => handleToggleActive(product)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      background: product.isActive ? '#f0fdf4' : '#fef2f2',
                      color: product.isActive ? '#166534' : '#991b1b',
                      border: product.isActive ? '1px solid #dcfce7' : '1px solid #fecaca',
                      transition: 'all 0.2s',
                      marginTop: '0.5rem'
                    }}
                  >
                    <CheckCircle2 size={12} color={product.isActive ? "#166534" : "#991b1b"} />
                    {product.isActive ? 'Active' : 'Hidden'}
                  </button>
                </td>
                <td style={{ textAlign: 'center', fontSize: '0.8rem' }}>
                  {product.variants?.length > 0 ? (
                    <span style={{ fontWeight: 700, color: '#64748b' }}>{product.variants.length} SKUs</span>
                  ) : (
                    <div style={{ color: '#94a3b8', lineHeight: 1.2 }}>
                      {product.size && <div>S: {product.size}</div>}
                      {product.color && <div>C: {product.color}</div>}
                      {!product.size && !product.color && '—'}
                    </div>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div className={styles.actionButtons}>
                    <button className={styles.editButton} onClick={() => handleOpenEdit(product)}>
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.deleteButton} onClick={() => handleDelete(product._id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
            <Search size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
            <p>No products found matching your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
