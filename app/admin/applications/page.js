'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await fetch('/api/admin/applications');
        const data = await res.json();
        if (data.success) {
          setApplications(data.applications);
        }
      } catch (error) {
        console.error('Failed to fetch applications', error);
      } finally {
        setLoading(false);
      }
    }
    fetchApps();
  }, []);

  const handleStatusChange = async (id, newStatus, e) => {
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.map(app => 
          app._id === id ? { ...app, status: newStatus } : app
        ));
      } else {
        alert('Failed to update status: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating application status.');
    }
  };


  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Creator Applications</h1>
          <p className={styles.subtitle}>Review and approve new creator applications.</p>
        </div>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Creator Info</th>
              <th>Platform</th>
              <th>Niche</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>Loading applications...</td></tr>
            ) : applications.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No applications found.</td></tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div className={styles.creatorInfo}>
                      <span className={styles.name}>{app.fullName}</span>
                      <span className={styles.email}>{app.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.socialInfo}>
                      <span>Instagram: {app.instagramHandle || 'N/A'}</span>
                    </div>
                  </td>
                  <td className={styles.niche}>{app.contentNiche || 'N/A'}</td>
                  <td>
                    <span className={`${styles.status} ${styles[app.status.toLowerCase()] || styles.pending}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.btnApprove} onClick={(e) => handleStatusChange(app._id, 'Approved', e)}>Approve</button>
                      <button className={styles.btnReject} onClick={(e) => handleStatusChange(app._id, 'Rejected', e)}>Reject</button>
                    </div>
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
