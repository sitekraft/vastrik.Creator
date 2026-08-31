import styles from './HubFooter.module.css';
import Link from 'next/link';

export default function HubFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
              VASTRIK<span style={{ fontSize: '0.65rem', background: 'var(--gradient-primary)', color: '#fff', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: '800' }}>CREATOR</span>
            </Link>
          </div>
          
          <div className={styles.links}>
            <a href="https://vastrik.store" target="_blank" rel="noopener noreferrer">vastrik.store ↗</a>
            <Link href="/support">Help Desk (+91 8009651086)</Link>
            <Link href="/collaborations">Brand Collaborations</Link>
            <Link href="/status">Check Status</Link>
            <Link href="/apply">Join Program</Link>
            <a href="mailto:vastrik.support@gmail.com">vastrik.support@gmail.com</a>
          </div>

          <div className={styles.copyright}>
            &copy; 2026 VASTRIK (vastrik.store) • Powered by Sitekraft. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}


