import styles from './DashboardHeader.module.css';

export default function DashboardHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.greeting}>
        <h1 className={styles.title}>HEY, ANSHIKA 👋</h1>
        <p className={styles.subtitle}>Ready for your next challenge?</p>
      </div>
      
      <div className={styles.actions}>
        <button className={styles.iconBtn}>🔔</button>
        <button className={styles.iconBtn}>✉️</button>
      </div>
    </header>
  );
}
