import styles from './HubFooter.module.css';

export default function HubFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.logo}>CREATOR HUB</div>
          
          <div className={styles.links}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">API Status</a>
            <a href="#">Support</a>
          </div>

          <div className={styles.copyright}>
            &copy; 2024 CREATOR HUB. SYSTEM ENCRYPTED.
          </div>
        </div>
      </div>
    </footer>
  );
}
