'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AdminCreatorDetail({ params }) {
  const router = useRouter();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCreator = async () => {
    try {
      const res = await fetch(`/api/admin/creators/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setCreator(data.creator);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreator();
  }, [params.id]);

  const handleAction = async (action) => {
    if (!confirm(`Are you sure you want to ${action} for ${creator.name}?`)) return;

    try {
      const res = await fetch(`/api/admin/creators/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchCreator(); // Refresh data
      } else {
        alert(data.message || 'Action failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  if (loading) return <div className={styles.page}>Loading...</div>;
  if (!creator) return <div className={styles.page}>Creator not found</div>;

  // Derive initials for avatar
  const initials = creator.name ? creator.name.substring(0, 2).toUpperCase() : 'C';

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => router.back()}>
        &larr; Back to Directory
      </button>

      <div className={styles.header}>
        <div className={styles.profileInfo}>
          <div className={styles.avatar}>{initials}</div>
          <div>
            <h1 className={styles.name}>{creator.name}</h1>
            <p className={styles.id}>ID: {creator.id} &bull; {creator.email}</p>
          </div>
        </div>
        <div className={styles.statusBadge}>
          <span className={`${styles.status} ${styles[creator.status.toLowerCase()] || ''}`}>
            {creator.status}
          </span>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Performance Stats</h3>
          <div className={styles.statList}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Current Rank</span>
              <span className={`${styles.statValue} ${styles.rankHighlight}`}>{creator.rank}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Points</span>
              <span className={styles.statValue}>{creator.points.toLocaleString()}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Payouts</span>
              <span className={styles.statValue}>{creator.totalEarned}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Join Date</span>
              <span className={styles.statValue}>{creator.joinDate}</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Administrative Actions</h3>
          <p className={styles.warningText}>Current Warnings: {creator.warnings || 0}/3</p>
          
          <div className={styles.actionButtons}>
            <button 
              className={styles.btnSecondary} 
              onClick={() => handleAction('Process Payout')}
              style={{ backgroundColor: '#22c55e', color: 'white', borderColor: '#22c55e' }}
            >
              Process Payout
            </button>
            <button className={styles.btnSecondary} onClick={() => handleAction('Issue Warning')}>
              Issue Warning
            </button>
            <button className={styles.btnSecondary} onClick={() => handleAction('Reset Points')}>
              Reset Points
            </button>
            <button className={styles.btnDanger} onClick={() => handleAction('Suspend Account')}>
              Suspend Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
