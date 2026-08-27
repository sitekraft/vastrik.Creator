'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await fetch('/api/submissions');
        const data = await res.json();
        if (data.success) {
          setSubmissions(data.submissions);
        }
      } catch (error) {
        console.error('Failed to fetch submissions', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>MY SUBMISSIONS</h1>
          <p className={styles.subtitle}>Track your challenge entries and their status.</p>
        </div>
        <Link href="/dashboard/submissions/new" className="btn-primary" style={{textDecoration: 'none'}}>+ New Submission</Link>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Content Link</th>
              <th>Challenge</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Loading submissions...</td></tr>
            ) : submissions.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>You haven't submitted to any challenges yet.</td></tr>
            ) : (
              submissions.map((sub) => (
                <tr key={sub._id}>
                  <td>
                    <div className={styles.contentCell}>
                      <a href={sub.contentLink} target="_blank" rel="noopener noreferrer" style={{color: '#bcff00'}}>View Media</a>
                    </div>
                  </td>
                  <td className={styles.challengeName}>{sub.challenge?.title || 'Unknown'}</td>
                  <td>{sub.description}</td>
                  <td className={styles.date}>{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`${styles.status} ${styles[sub.status?.toLowerCase()] || styles.pending}`}>
                      {sub.status || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <a href={sub.contentLink} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} style={{textDecoration: 'none', display: 'inline-block'}}>View Post</a>
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
