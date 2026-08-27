import styles from './ApplyNavbar.module.css';
import Link from 'next/link';

export default function ApplyNavbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>VASTRIK</div>
          <div className={styles.badge}>
            <span className={styles.star}>★</span> CREATOR PROGRAM
          </div>
        </div>
        <Link href="/" className={styles.backLink}>
          &larr; Back to Home
        </Link>
      </div>
    </nav>
  );
}
