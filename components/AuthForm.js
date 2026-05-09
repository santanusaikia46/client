"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "../context/AuthContext";
import styles from "./AuthForm.module.css";

const formConfig = {
  login: {
    title: "Welcome back",
    description: "Sign in to access your account and protected dashboard.",
    buttonLabel: "Login",
    endpoint: "/api/auth/login",
    fields: ["email", "password"],
    alternateCopy: "Need an account?",
    alternateHref: "/signup",
    alternateLabel: "Create one",
    forgotPasswordLink: true,
  },
  signup: {
    title: "Create your account",
    description: "Register securely with a hashed password and JWT session.",
    buttonLabel: "Signup",
    endpoint: "/api/auth/signup",
    fields: ["name", "email", "password"],
    alternateCopy: "Already registered?",
    alternateHref: "/login",
    alternateLabel: "Login instead",
  },
  verify: {
    title: "Verify your email",
    description: "We've sent a 6-digit verification code to your email.",
    buttonLabel: "Verify OTP",
    endpoint: "/api/auth/verify-otp",
    fields: ["otp"],
    alternateCopy: "Didn't receive a code?",
    alternateHref: "#",
    alternateLabel: "Resend OTP",
  },
  forgotPassword: {
    title: "Reset your password",
    description: "Enter your email address and we'll send you a link to reset your password.",
    buttonLabel: "Send Reset Link",
    endpoint: "/api/auth/forgot-password",
    fields: ["email"],
    alternateCopy: "Remember your password?",
    alternateHref: "/login",
    alternateLabel: "Login here",
  },
  resetPassword: {
    title: "Set new password",
    description: "Please enter your new password below.",
    buttonLabel: "Reset Password",
    endpoint: "/api/auth/reset-password",
    fields: ["password", "confirmPassword"],
    alternateCopy: "Remember your password?",
    alternateHref: "/login",
    alternateLabel: "Login here",
  }
};

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

export default function AuthForm({ mode: initialMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "profile";
  const { login } = useAuth();
  
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const config = formConfig[currentMode];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () => {
    if (currentMode === "verify") {
      if (!formData.otp.trim()) return "OTP is required.";
      return "";
    }

    if (currentMode === "signup" && !formData.name.trim()) {
      return "Name is required.";
    }

    if (config.fields.includes("email")) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email.trim())) {
        return "Please enter a valid email address.";
      }
    }

    if (config.fields.includes("password") && formData.password.trim().length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (config.fields.includes("confirmPassword") && formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      return "NEXT_PUBLIC_API_BASE_URL is not configured.";
    }

    return "";
  };

  const handleResend = async (e) => {
    e.preventDefault();
    if (resendCooldown > 0) return;

    try {
      setStatus({ type: "", message: "" });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email.trim() }),
      });
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || "Failed to resend OTP");
      
      setStatus({ type: "success", message: "OTP resent successfully!" });
      setResendCooldown(30);
      
      // Simple cooldown timer
      const interval = setInterval(() => {
        setResendCooldown(c => {
          if (c <= 1) {
            clearInterval(interval);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setStatus({ type: "error", message: validationMessage });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      let payload;
      if (currentMode === "signup") {
        payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        };
      } else if (currentMode === "login") {
        payload = {
          email: formData.email.trim(),
          password: formData.password,
        };
      } else if (currentMode === "verify") {
        payload = {
          email: formData.email.trim(),
          otp: formData.otp.trim(),
        };
      } else if (currentMode === "forgotPassword") {
        payload = {
          email: formData.email.trim(),
        };
      } else if (currentMode === "resetPassword") {
        payload = {
          email: searchParams.get("email"),
          token: searchParams.get("token"),
          password: formData.password,
        };
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${config.endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        if (result.requiresVerification) {
          setCurrentMode("verify");
          setStatus({ type: "success", message: "Please check your email for the OTP." });
          return;
        }
        throw new Error(result.message || "Authentication request failed.");
      }

      // Handle custom mode successes that don't log the user in
      if (currentMode === "forgotPassword") {
        setStatus({ type: "success", message: result.message });
        setFormData(initialState);
        return;
      }

      if (currentMode === "resetPassword") {
        setStatus({ type: "success", message: result.message + " Redirecting to login..." });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return;
      }

      if (result.requiresVerification) {
        setCurrentMode("verify");
        setStatus({ type: "success", message: result.message || "Please check your email for the OTP." });
        return;
      }

      await login(result.token, result.user);
      router.push(`/${redirect}`);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formTitle = currentMode === "signup" ? "Secure signup" : 
                    currentMode === "login" ? "Secure login" : 
                    currentMode === "verify" ? "Verification" : 
                    currentMode === "forgotPassword" ? "Account Recovery" : "Security";

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>{formTitle}</p>
        <h1>{config.title}</h1>
        <p className={styles.description}>{config.description}</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {config.fields.includes("name") && (
            <>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
              />
            </>
          )}

          {config.fields.includes("email") && (
            <>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </>
          )}

          {config.fields.includes("password") && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                {config.forgotPasswordLink && (
                  <Link href="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'underline' }}>
                    Forgot Password?
                  </Link>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                style={{ marginTop: '0.4rem' }}
              />
            </>
          )}

          {config.fields.includes("confirmPassword") && (
            <>
              <label htmlFor="confirmPassword" style={{ marginTop: '1rem' }}>Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
              />
            </>
          )}

          {config.fields.includes("otp") && (
            <>
              <label htmlFor="otp">Verification Code</label>
              <input
                id="otp"
                name="otp"
                type="text"
                value={formData.otp}
                onChange={handleChange}
                placeholder="123456"
                maxLength={6}
              />
            </>
          )}

          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : config.buttonLabel}
          </button>

          {status.message && (
            <p
              className={`${styles.statusMessage} ${
                status.type === "success" ? styles.success : styles.error
              }`}
            >
              {status.message}
            </p>
          )}
        </form>

        <p className={styles.altCopy}>
          {config.alternateCopy}{" "}
          {currentMode === "verify" ? (
            <a href="#" onClick={handleResend} style={{ pointerEvents: resendCooldown > 0 ? "none" : "auto", opacity: resendCooldown > 0 ? 0.6 : 1 }}>
              {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : config.alternateLabel}
            </a>
          ) : (
            <Link href={config.alternateHref}>{config.alternateLabel}</Link>
          )}
        </p>
      </div>
    </section>
  );
}
