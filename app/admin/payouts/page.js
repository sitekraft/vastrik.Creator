'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AdminPayouts() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayouts() {
      try {
        const res = await fetch('/api/admin/payouts');
        const data = await res.json();
        if (data.success && data.payouts) {
          setPayouts(data.payouts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPayouts();
  }, []);

  const totalPending = payouts
    .filter(p => p.status === 'Pending')
    .reduce((sum, p) => sum + (parseFloat(p.amount.toString().replace(/[^0-9.-]+/g,"")) || 0), 0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Payout Management</h1>
          <p className={styles.subtitle}>Process withdrawal requests from creators.</p>
        </div>
        <div className={styles.totalPending}>
          <span className={styles.pendingLabel}>Total Pending</span>
          <span className={styles.pendingAmount}>₹{totalPending.toLocaleString()}</span>
        </div>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Creator</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>Loading payouts...</td></tr>
            ) : payouts.length === 0 ? (
              <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px', color: 'var(--text-secondary)'}}>No payouts found.</td></tr>
            ) : (
              payouts.map((pay) => (
                <tr key={pay._id || pay.id}>
                  <td className={styles.id}>{pay.id || `#${pay._id?.slice(-6).toUpperCase()}`}</td>
                  <td className={styles.creator}>{pay.creator}</td>
                  <td className={styles.amount}>{pay.amount}</td>
                  <td className={styles.method}>{pay.method}</td>
                  <td className={styles.date}>{new Date(pay.requestDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[pay.status.toLowerCase()]}`}>
                      {pay.status}
                    </span>
                  </td>
                  <td>
                    {pay.status === 'Pending' ? (
                      <button className={styles.btnPay} onClick={(e) => { e.target.parentElement.parentElement.style.opacity = '0.5'; alert('Payout processed successfully!'); }}>Mark as Paid</button>
                    ) : (
                      <span className={styles.paidText}>Processed</span>
                    )}
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
