import styles from './Step1BasicInfo.module.css';

export default function Step1BasicInfo({ onNext }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        <span className={styles.icon}>👤</span> Basic Information
      </h3>

      <div className={styles.formGroup}>
        <label className={styles.label}>Full Name</label>
        <div className={styles.inputWrapper}>
          <span className={styles.inputIcon}>📝</span>
          <input type="text" placeholder="Enter your full name" className={styles.input} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>✉️</span>
            <input type="email" placeholder="hello@creator.com" className={styles.input} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>📱</span>
            <input type="tel" placeholder="+1 (555) 000 0000" className={styles.input} />
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Primary City/Location</label>
        <div className={styles.inputWrapper}>
          <span className={styles.inputIcon}>📍</span>
          <input type="text" placeholder="e.g. Los Angeles, CA" className={styles.input} />
        </div>
      </div>

      <div className={styles.actions}>
        <button className="btn-primary" onClick={onNext}>
          CONTINUE TO PROFILE &rarr;
        </button>
      </div>
    </div>
  );
}
