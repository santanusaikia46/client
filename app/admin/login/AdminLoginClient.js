"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import styles from "./page.module.css";

export default function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [step, setStep] = useState("login"); // 'login' or 'otp'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Admin authentication failed.");
      }

      if (data.requiresOTP) {
        setStep("otp");
        setSuccess("A verification code has been sent to your email.");
        setResendTimer(60);
      } else {
        // Fallback if OTP is not required
        await login(data.token, data.user);
        const redirectPath = searchParams.get("redirect") || "/admin/dashboard";
        router.push(redirectPath);
      }
    } catch (err) {
      setError(err.message || "An error occurred during admin login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/admin-verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed.");
      }

      await login(data.token, data.user);
      const redirectPath = searchParams.get("redirect") || "/admin/dashboard";
      router.push(redirectPath);
    } catch (err) {
      setError(err.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/admin-resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP.");
      }

      setSuccess("A new verification code has been sent.");
      setResendTimer(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${step === 'otp' ? styles.otpActive : ''}`}>
        <div className={styles.header}>
          <h2>TatiAssam Admin</h2>
          <p>{step === 'login' ? 'Secure Restricted Access' : 'Identity Verification Required'}</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        {step === "login" ? (
          <form className={styles.form} onSubmit={handleLoginSubmit}>
            <div className={styles.field}>
              <label htmlFor="email">Admin Email</label>
              <input
                id="email"
                type="email"
                placeholder="admin@tatiassam.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Security Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className={styles.submitButton} type="submit" disabled={isLoading}>
              {isLoading ? "Validating Credentials..." : "Initiate Secure Access"}
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleOTPVerify}>
            <div className={styles.otpDescription}>
              Enter the 6-digit verification code sent to <strong>{email}</strong>.
            </div>
            
            <div className={styles.field}>
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className={styles.otpInput}
                required
                autoFocus
              />
            </div>

            <button className={styles.submitButton} type="submit" disabled={isLoading || otp.length < 6}>
              {isLoading ? "Verifying..." : "Verify & Authorize"}
            </button>

            <div className={styles.otpActions}>
              <button 
                type="button" 
                className={styles.resendButton} 
                onClick={handleResendOTP}
                disabled={resendTimer > 0 || isLoading}
              >
                {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend Verification Code"}
              </button>
              
              <button 
                type="button" 
                className={styles.backButton} 
                onClick={() => {
                  setStep("login");
                  setOtp("");
                  setError(null);
                  setSuccess(null);
                }}
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
