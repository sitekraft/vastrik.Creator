'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function AdminChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const res = await fetch('/api/admin/challenges');
        const data = await res.json();
        if (data.success) {
          setChallenges(data.challenges);
        }
      } catch (error) {
        console.error('Failed to fetch challenges', error);
      } finally {
        setLoading(false);
      }
    }
    fetchChallenges();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Challenge Management</h1>
          <p className={styles.subtitle}>Create, edit, or monitor platform challenges.</p>
        </div>
        <Link href="/admin/challenges/new" className={styles.createBtn} style={{textDecoration: 'none'}}>+ Create New Challenge</Link>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>End Date</th>
              <th>Reward Pool</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>Loading challenges...</td></tr>
            ) : challenges.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No challenges found. Create one!</td></tr>
            ) : (
              challenges.map((ch) => {
                const isUpcoming = new Date(ch.startDate) > new Date();
                const isCompleted = new Date(ch.endDate) < new Date();
                const status = isCompleted ? 'Completed' : (isUpcoming ? 'Upcoming' : 'Active');
                
                return (
                  <tr key={ch._id}>
                    <td className={styles.titleCell}>{ch.title}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[status.toLowerCase()]}`}>
                        {status}
                      </span>
                    </td>
                    <td className={styles.date}>{new Date(ch.endDate).toLocaleDateString()}</td>
                    <td className={styles.reward}>{ch.rewardPool}</td>
                    <td>
                      <button className={styles.editBtn}>Edit</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
