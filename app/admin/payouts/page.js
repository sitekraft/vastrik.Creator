'use client';

import styles from './page.module.css';

export default function AdminPayouts() {
  const payouts = [
    { id: 'PAY-882', creator: 'CyberKing', amount: '₹50,000', method: 'Bank Transfer', requestDate: '2026-08-25', status: 'Pending' },
    { id: 'PAY-883', creator: 'TechwearTom', amount: '₹25,000', method: 'UPI', requestDate: '2026-08-26', status: 'Pending' },
    { id: 'PAY-880', creator: 'NeonQueen', amount: '₹10,000', method: 'Bank Transfer', requestDate: '2026-08-20', status: 'Completed' },
    { id: 'PAY-879', creator: 'Vastrik Creator', amount: '₹15,000', method: 'UPI', requestDate: '2026-08-18', status: 'Completed' },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Payout Management</h1>
          <p className={styles.subtitle}>Process withdrawal requests from creators.</p>
        </div>
        <div className={styles.totalPending}>
          <span className={styles.pendingLabel}>Total Pending</span>
          <span className={styles.pendingAmount}>₹75,000</span>
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
            {payouts.map((pay) => (
              <tr key={pay.id}>
                <td className={styles.id}>{pay.id}</td>
                <td className={styles.creator}>{pay.creator}</td>
                <td className={styles.amount}>{pay.amount}</td>
                <td className={styles.method}>{pay.method}</td>
                <td className={styles.date}>{pay.requestDate}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
