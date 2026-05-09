"use client";

import React from "react";
import { useToast } from "../context/ToastContext";
import Toast from "./Toast";
import styles from "./Toast.module.css";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
