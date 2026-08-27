import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button className={styles.hamburger}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
          <div className={styles.logo}>VASTRIK</div>
        </div>
        <Link href="/apply" className="btn-primary" style={{ textDecoration: 'none' }}>JOIN PROGRAM</Link>
      </div>
    </nav>
  );
}
