import styles from './StatusCard.module.css';

export default function StatusCard({ searchParams }) {
  const id = searchParams?.id || 'VST-99201';
  const email = searchParams?.email || 'creator@example.com';
  
  let displayDate = 'Oct 24, 2024';
  if (searchParams?.date) {
    displayDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(searchParams.date));
  }
  return (
    <div className={styles.card}>
      <div className={styles.tagWrapper}>
        <span className={styles.tag}>
          <span className={styles.icon}>🕒</span> APPLICATION RECEIVED
        </span>
      </div>
      
      <h1 className={styles.title}>
        YOU'RE IN THE RUN. <span className={styles.emoji}>🚀</span>
      </h1>
      
      <p className={styles.subtitle}>
        Your application has been submitted successfully. Our team will review your profile and update you through your registered email.
      </p>

      <div className={styles.tracker}>
        <div className={styles.step}>
          <div className={`${styles.circle} ${styles.completed}`}>✓</div>
          <span className={`${styles.label} ${styles.completedLabel}`}>Submitted</span>
        </div>
        <div className={`${styles.line} ${styles.completedLine}`}></div>
        <div className={styles.step}>
          <div className={`${styles.circle} ${styles.active}`}>
            <span className={styles.dot}></span>
          </div>
          <span className={`${styles.label} ${styles.activeLabel}`}>In Review</span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.step}>
          <div className={styles.circle}>🔒</div>
          <span className={styles.label}>Access</span>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>APPLICATION ID</span>
          <span className={styles.detailValueBox}>#{id.substring(id.length - 6).toUpperCase()}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>SUBMISSION DATE</span>
          <span className={styles.detailValue}>{displayDate}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>REGISTERED EMAIL</span>
          <span className={styles.detailValue}>{email}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>CURRENT STATUS</span>
          <span className={styles.statusBox}>
            <span className={styles.statusDot}></span> UNDER REVIEW
          </span>
        </div>
      </div>
    </div>
  );
}
