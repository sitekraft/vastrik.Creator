'use client';

import styles from './page.module.css';

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>SETTINGS</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Profile Information</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Display Name</label>
            <input type="text" className={styles.input} defaultValue="Anshika" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input type="email" className={styles.input} defaultValue="creator@example.com" disabled />
          </div>
          <button className="btn-primary" style={{marginTop: '16px'}} onClick={() => alert('Profile updated successfully!')}>Save Changes</button>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Payment Details</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Bank Account / UPI ID</label>
            <input type="text" className={styles.input} placeholder="Enter payment details" />
          </div>
          <button className="btn-secondary" style={{marginTop: '16px'}} onClick={() => alert('Payment method updated!')}>Update Payment Method</button>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Notifications</h2>
          <div className={styles.toggleGroup}>
            <label className={styles.toggleLabel}>Email notifications for new challenges</label>
            <input type="checkbox" className={styles.toggle} defaultChecked />
          </div>
          <div className={styles.toggleGroup}>
            <label className={styles.toggleLabel}>SMS alerts for reward payouts</label>
            <input type="checkbox" className={styles.toggle} />
          </div>
        </div>
      </div>
    </div>
  );
}
