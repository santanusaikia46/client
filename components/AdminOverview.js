"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useSWR from "swr";
import { 
  IndianRupee, 
  ShoppingBag, 
  Users, 
  Package,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Zap
} from "lucide-react";
import dynamic from 'next/dynamic';

const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
import styles from "./AdminDashboardPanel.module.css";

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

export default function AdminOverview() {
  const { token } = useAuth();
  const fetcher = async ([url, authToken]) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message);
    return result.data;
  };

  const { data, error, isLoading: loading } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/analytics`, token] : null,
    fetcher,
    { revalidateOnFocus: true }
  );



  if (loading) return <div className={styles.loading}>Accessing Secure Analytics Node...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!data) return null;

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.headerRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Zap size={24} color="#3b82f6" fill="#3b82f6" />
          <h2 style={{ margin: 0 }}>Command Center Alpha</h2>
        </div>
        <div className={styles.statusBadge}>
          <div className={styles.pulse} />
          Live Neural Sync
        </div>
      </div>
      
      {/* KPI Section */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <h3>Gross Revenue</h3>
            <div style={{ padding: '0.4rem', background: '#ecfdf5', borderRadius: '8px' }}>
              <IndianRupee size={18} color="#10b981" />
            </div>
          </div>
          <p className={styles.kpiValue}>₹{data.totalRevenue.toLocaleString('en-IN')}</p>
          <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginTop: '0.25rem' }}>+12.5% from last month</div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <h3>Total Volume</h3>
            <div style={{ padding: '0.4rem', background: '#eff6ff', borderRadius: '8px' }}>
              <ShoppingBag size={18} color="#3b82f6" />
            </div>
          </div>
          <p className={styles.kpiValue}>{data.totalOrders}</p>
          <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 700, marginTop: '0.25rem' }}>Completed Orders</div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <h3>Unique Users</h3>
            <div style={{ padding: '0.4rem', background: '#f5f3ff', borderRadius: '8px' }}>
              <Users size={18} color="#8b5cf6" />
            </div>
          </div>
          <p className={styles.kpiValue}>{data.totalUsers}</p>
          <div style={{ fontSize: '0.75rem', color: '#8b5cf6', fontWeight: 700, marginTop: '0.25rem' }}>Registered Base</div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <h3>SKU Count</h3>
            <div style={{ padding: '0.4rem', background: '#fffbeb', borderRadius: '8px' }}>
              <Package size={18} color="#f59e0b" />
            </div>
          </div>
          <p className={styles.kpiValue}>{data.totalProducts}</p>
          <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700, marginTop: '0.25rem' }}>Active Inventory</div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {/* Main Revenue Chart */}
        <div className={styles.chartContainer} style={{ margin: 0 }}>
          <div className={styles.chartHeader}>
            <TrendingUp size={18} />
            <h3>7-Day Performance Matrix</h3>
          </div>
          <div style={{ width: '100%', height: 350, marginTop: '1.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tick={{fontSize: 10, fill: '#94a3b8'}} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                  tickFormatter={(val) => new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                />
                <YAxis 
                  tick={{fontSize: 10, fill: '#94a3b8'}} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `₹${value}`} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', background: '#fff', padding: '1rem' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  dot={{ r: 5, fill: '#3b82f6', strokeWidth: 3, stroke: '#fff' }} 
                  activeDot={{ r: 8, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Top Products Chart */}
        <div className={styles.chartContainer} style={{ margin: 0 }}>
          <div className={styles.chartHeader}>
            <BarChart3 size={18} />
            <h3>Top Selling SKUs</h3>
          </div>
          <div style={{ width: '100%', height: 300, marginTop: '1.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{fontSize: 10, fill: '#475569', fontWeight: 600}} 
                  width={100} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.02)'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[0, 8, 8, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Mix Chart */}
        <div className={styles.chartContainer} style={{ margin: 0 }}>
          <div className={styles.chartHeader}>
            <PieChartIcon size={18} />
            <h3>Inventory Composition</h3>
          </div>
          <div style={{ width: '100%', height: 300, marginTop: '1.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
