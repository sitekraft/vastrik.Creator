import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.logo}>VASTRIK</div>
        <p className={styles.copyright}>&copy; 2024 VASTRIK CREATOR PROGRAM. ALL RIGHTS RESERVED.</p>
        <div className={styles.links}>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Support</a>
          <a href="#">Press</a>
        </div>
      </div>
    </footer>
  );
}
