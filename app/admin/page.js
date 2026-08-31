'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalCreators: 0,
    pendingApplications: 0,
    activeChallenges: 0,
    totalSubmissions: 0,
    totalPayouts: '₹0'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Overview</h1>
          <p className={styles.subtitle}>Welcome back, Vastrik System Admin. Real-time platform metrics.</p>
        </div>
      </header>

      <div className={styles.kpiGrid}>
        <Link href="/admin/creators" className={styles.kpiCard} style={{ textDecoration: 'none' }}>
          <span className={styles.kpiLabel}>Total Approved Creators</span>
          <span className={styles.kpiValue}>{loading ? '...' : stats.totalCreators}</span>
          <span className={styles.kpiTrend}>Live Active Roster</span>
        </Link>
        
        <Link href="/admin/applications" className={styles.kpiCard} style={{ textDecoration: 'none' }}>
          <span className={styles.kpiLabel}>Pending Applications</span>
          <span className={`${styles.kpiValue} ${styles.alert}`}>{loading ? '...' : stats.pendingApplications}</span>
          <span className={styles.kpiTrend}>{stats.pendingApplications > 0 ? 'Requires Review →' : 'All Reviewed'}</span>
        </Link>
        
        <Link href="/admin/challenges" className={styles.kpiCard} style={{ textDecoration: 'none' }}>
          <span className={styles.kpiLabel}>Active Missions</span>
          <span className={styles.kpiValue}>{loading ? '...' : stats.activeChallenges}</span>
          <span className={styles.kpiTrend}>Live Campaigns</span>
        </Link>
        
        <Link href="/admin/submissions" className={styles.kpiCard} style={{ textDecoration: 'none' }}>
          <span className={styles.kpiLabel}>Creator Submissions</span>
          <span className={styles.kpiValue}>{loading ? '...' : stats.totalSubmissions}</span>
          <span className={styles.kpiTrend}>Review Videos →</span>
        </Link>
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent System Activity</h2>
        <ul className={styles.alertList}>
          <li className={styles.alertItem}>
            <span className={styles.alertIcon}>📝</span>
            <div className={styles.alertContent}>
              <strong>{stats.pendingApplications} Creator Applications</strong> currently waiting for review.
              <span className={styles.alertTime}>Live sync</span>
            </div>
          </li>
          <li className={styles.alertItem}>
            <span className={styles.alertIcon}>🎥</span>
            <div className={styles.alertContent}>
              <strong>Zero-Inventory Creator Program</strong> running on vastrik.store Pinterest & AI missions.
              <span className={styles.alertTime}>Active</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

