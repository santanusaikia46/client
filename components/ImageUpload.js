"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./AdminProductsList.module.css"; // Reuse existing styles or create new ones

const ImageUpload = ({ label, onUploadSuccess, multiple = false, currentUrls = "", compact = false }) => {

  const { token } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setError("");

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        console.log("DEBUG: Uploading to:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload`);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          uploadedUrls.push(data.url);
        } else {
          setError(data.message || "Upload failed.");
          break;
        }
      }

      if (uploadedUrls.length > 0) {
        onUploadSuccess(multiple ? uploadedUrls : uploadedUrls[0]);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={compact ? "" : styles.formGroup}
      style={{
        marginBottom: compact ? "0" : "1rem",
        height: compact ? "100%" : "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: compact ? "stretch" : "center",
        textAlign: "center",
        width: "100%"
      }}
    >
      {label && <label style={{ marginBottom: "0.75rem", width: "100%" }}>{label}</label>}
      <div
        className={styles.uploadBtnWrapper}
        style={{
          height: compact ? "100%" : "auto",
          justifyContent: "center"
        }}
      >
        <button
          type="button"
          className={styles.secondaryButton}
          style={{
            margin: 0,
            padding: compact ? "0 1.5rem" : "0.75rem 2rem",
            fontSize: "0.95rem",
            height: "100%",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            boxSizing: "border-box",
            boxShadow: compact ? "none" : "0 4px 6px -1px rgba(0,0,0,0.05)"
          }}
        >
          {isUploading ? "..." : multiple ? "Upload Image" : "Upload"}
        </button>

        <input
          type="file"
          onChange={handleUpload}
          disabled={isUploading}
          accept="image/*"
          multiple={multiple}
          style={{ cursor: "pointer" }}
        />
      </div>
      {error && <p style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.4rem" }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
