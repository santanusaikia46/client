"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  History, 
  Users, 
  Image as ImageIcon, 
  Mail,
  ChevronRight,
  LogOut
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import AdminOverview from "./AdminOverview";
import AdminProductsList from "./AdminProductsList";
import AdminOrdersList from "./AdminOrdersList";
import AdminCustomersList from "./AdminCustomersList";
import AdminMediaManager from "./AdminMediaManager";
import AdminBlogsList from "./AdminBlogsList";
import AdminEnquiriesList from "./AdminEnquiriesList";
import styles from "./AdminDashboardPanel.module.css";


export default function AdminDashboardPanel() {
  const router = useRouter();
  const { isAdmin, isAuthenticated, isLoading, token, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (isLoading) return;

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    if (isAuthenticated && !isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, isAuthenticated, isLoading, router, token]);

  if (isLoading || (token && !isAuthenticated)) {
    return (
      <section className={styles.shell}>
        <div className={styles.heroCard}>
          <p className={styles.eyebrow}>Admin</p>
          <h1>Checking your session...</h1>
          <p className={styles.description}>Verifying admin privileges...</p>
        </div>
      </section>
    );
  }

  if (!isAdmin) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  const menuItems = [
    { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard },
    { id: 'products', label: 'Product Inventory', icon: Package },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart },
    { id: 'blogs', label: 'Heritage Stories', icon: History },
    { id: 'customers', label: 'Customer CRM', icon: Users },
    { id: 'media', label: 'Media Manager', icon: ImageIcon },
    { id: 'enquiries', label: 'Enquiries', icon: Mail },
  ];

  return (
    <section className={styles.shell}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>Command Center</p>
          <h1>TatiAssam Admin</h1>
          <p className={styles.sidebarText}>
            Centralized management for your entire e-commerce platform.
          </p>

          <div className={styles.sidebarCard}>
            <span>Signed in</span>
            <strong>{user?.name}</strong>
            <small>{user?.email}</small>
          </div>

          <nav className={styles.sidebarNav}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button 
                  key={item.id}
                  className={activeTab === item.id ? styles.activeTabBtn : styles.tabBtn}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={18} strokeWidth={2} />
                  <span>{item.label}</span>
                  {activeTab === item.id && <ChevronRight size={14} className={styles.activeIndicator} />}
                </button>
              );
            })}

            <div className={styles.sidebarDivider} />

            <button className={styles.logoutBtn} onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout Session</span>
            </button>
          </nav>
        </aside>

        <div className={styles.content}>
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'products' && <AdminProductsList />}
          {activeTab === 'orders' && <AdminOrdersList />}
          {activeTab === 'blogs' && <AdminBlogsList />}
          {activeTab === 'customers' && <AdminCustomersList />}
          {activeTab === 'enquiries' && <AdminEnquiriesList token={token} />}
          {activeTab === 'media' && <AdminMediaManager />}
        </div>

      </div>
    </section>
  );
}
