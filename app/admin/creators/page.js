'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function AdminCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreators() {
      try {
        const res = await fetch('/api/admin/creators');
        const data = await res.json();
        if (data.success && data.creators) {
          setCreators(data.creators);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCreators();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Creator Directory</h1>
          <p className={styles.subtitle}>Manage all approved creators on the platform.</p>
        </div>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search by name or ID..." className={styles.searchInput} />
        </div>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Creator Name</th>
              <th>Rank Tier</th>
              <th>Total Points</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Loading creators...</td></tr>
            ) : creators.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px', color: 'var(--text-secondary)'}}>No creators found.</td></tr>
            ) : (
              creators.map((creator) => (
                <tr key={creator._id}>
                  <td className={styles.id}>#{creator._id.slice(-6).toUpperCase()}</td>
                  <td className={styles.name}>{creator.name}</td>
                  <td>
                    <span className={`${styles.rankBadge} ${styles[(creator.rank || 'Newbie').toLowerCase()]}`}>
                      {creator.rank || 'Newbie'}
                    </span>
                  </td>
                  <td className={styles.points}>{creator.points || 0}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[(creator.status || 'Active').toLowerCase()]}`}>
                      {creator.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/creators/${creator._id}`} className={styles.actionBtn} style={{textDecoration: 'none', display: 'inline-block'}}>Manage</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
