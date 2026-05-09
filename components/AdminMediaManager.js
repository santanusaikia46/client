"use client";

import React, { useState } from "react";
import { 
  Image as ImageIcon, 
  UploadCloud, 
  Copy, 
  Check, 
  Files,
  Info,
  Sparkles,
  Link as LinkIcon
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import styles from "./AdminMediaManager.module.css";

const AdminMediaManager = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleUploadSuccess = (urls) => {
    const newUrls = Array.isArray(urls) ? urls : [urls];
    setUploadedImages((prev) => [...newUrls, ...prev]);
  };

  const copyToClipboard = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBox}>
            <ImageIcon size={28} color="#0f172a" strokeWidth={2.5} />
          </div>
          <div>
            <h2>Media Library</h2>
            <p className={styles.subtitle}>Manage and organize your digital assets for TatiAssam</p>
          </div>
        </div>
      </div>

      <div className={styles.uploadCard}>
        <div className={styles.uploadIconCircle}>
          <UploadCloud size={36} strokeWidth={2.5} />
        </div>
        <h3>Upload New Assets</h3>
        <p className={styles.uploadDescription}>
          Instantly generate CDN links for banners, promotional high-res images, or product storytelling shots. Supported formats: JPG, PNG, WEBP.
        </p>
        
        <div style={{ width: '100%', maxWidth: '500px', display: 'flex', justifyContent: 'center' }}>
          <ImageUpload 
            multiple={true} 
            onUploadSuccess={handleUploadSuccess} 
            label="Drag & drop high-res assets or click to browse"
          />
        </div>
      </div>

      <div className={styles.gridSection}>
        <div className={styles.sectionHeader}>
          <Sparkles size={20} color="#8b5cf6" fill="#8b5cf6" />
          <h3>Recently Uploaded</h3>
        </div>

        {uploadedImages.length === 0 ? (
          <div className={styles.emptyState}>
            <div style={{ opacity: 0.5 }}>
              <Files size={48} strokeWidth={1} />
            </div>
            <p>Your session-based uploads will appear here for immediate use.</p>
            <small style={{ color: '#cbd5e1' }}>Links are ready to be pasted into the Product Manager or Heritage Stories.</small>
          </div>
        ) : (
          <div className={styles.assetGrid}>
            {uploadedImages.map((url, index) => (
              <div key={index} className={styles.assetCard}>
                <div className={styles.imageWrapper}>
                  <img src={url} alt={`Upload ${index}`} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <LinkIcon size={10} /> CDN LIVE
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <button 
                    onClick={() => copyToClipboard(url, index)}
                    className={`${styles.copyButton} ${copiedIndex === index ? styles.success : ''}`}
                  >
                    {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                    {copiedIndex === index ? 'URL Copied!' : 'Copy Asset Link'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMediaManager;
