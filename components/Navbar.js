"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, isAuthenticated, isLoading, logout, user } = useAuth();

  const [mounted, setMounted]         = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);


  const handleLogout = () => { logout(); router.push("/"); };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { label: "Women",          href: "/products?category=Women" },
    { label: "fabric",         href: "/products?category=Fabric" },
    { label: "Home",           href: "/products?category=Accessories" },
    { label: "Made to order",  href: "/products?category=Made to Order" },
    { label: "about us",       href: "/about" },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>

        {/* Mobile menu toggle */}
        <button 
          className={`${styles.iconBtn} ${styles.mobileToggle}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>

        {/* Logo */}
        <Link href="/" className={styles.logo}>TatiAssam</Link>

        {/* Centre nav */}
        <nav className={styles.nav}>
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`${styles.navLink} ${pathname === href ? styles.active : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className={styles.actions}>

          {/* Search */}
          <div className={`${styles.searchWrap} ${searchOpen ? styles.searchOpen : ""}`}>
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
              />
            </form>
            <button
              className={styles.iconBtn}
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Toggle search"
            >
              {searchOpen ? (
                /* X icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                /* Search icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              )}
            </button>
          </div>

          {mounted && (
            <>
              {/* User */}
              {isLoading ? null : isAuthenticated ? (
                <div className={styles.userMenu}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isAdmin && (
                      <Link 
                        href="/admin/dashboard" 
                        className={styles.iconBtn} 
                        title="Command Centre"
                        style={{ background: 'rgba(57, 75, 63, 0.1)', color: '#394B3F' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                      </Link>
                    )}
                    <div className={styles.avatar}>
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  </div>
                  <div className={styles.dropdown}>
                    <Link className={styles.dropItem} href="/profile">My Profile</Link>
                    {isAdmin && <Link className={styles.dropItem} href="/admin/dashboard">Command Centre</Link>}
                    <button className={styles.dropItem} onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              ) : (
                <>
                  <Link className={styles.textBtn} href="/login">Login</Link>
                  <Link className={styles.pillBtn} href="/signup">Sign up</Link>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileMenuVisible : ""}`}>
        <div className={styles.mobileNav}>
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`${styles.mobileNavLink} ${pathname === href ? styles.mobileActive : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className={styles.mobileDivider} />
          {isAuthenticated ? (
            <>
              <Link className={styles.mobileNavLink} href="/profile" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
              {isAdmin && <Link className={styles.mobileNavLink} href="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>Command Centre</Link>}
              <button className={styles.mobileNavLink} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className={styles.mobileNavLink} href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link className={styles.mobileNavLink} href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
