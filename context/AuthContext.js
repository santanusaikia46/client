"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

import { getToken, logout as clearStoredToken, saveToken } from "../lib/auth";

const AuthContext = createContext(null);

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function AuthProvider({ children }) {
  const { addToast } = useToast();
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = async (nextToken) => {
    if (!nextToken || !apiBaseUrl) {
      setUser(null);
      setIsLoading(false);
      return null;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${nextToken}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Authentication failed.");
      }

      setUser(result.user);
      return result.user;
    } catch (error) {
      clearStoredToken();
      setToken("");
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = getToken();

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    setToken(storedToken);
    fetchCurrentUser(storedToken);
  }, []);

  const login = async (nextToken, nextUser) => {
    saveToken(nextToken);
    setToken(nextToken);
    setUser(nextUser || null);
    setIsLoading(false);

    if (!nextUser) {
      await fetchCurrentUser(nextToken);
    }
    addToast("Successfully logged in!", "success");
  };

  const logout = () => {
    clearStoredToken();
    setToken("");
    setUser(null);
    setIsLoading(false);
    addToast("Logged out successfully", "info");
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token && user),
    isAdmin: user?.role === "admin",
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
