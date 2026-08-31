import styles from './HubNavbar.module.css';
import Link from 'next/link';

export default function HubNavbar() {
  return (
    <nav className={styles.navbar}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className={styles.logo} style={{ textDecoration: 'none', color: '#fff' }}>
          VASTRIK<span style={{ fontSize: '0.65rem', background: 'var(--gradient-primary)', color: '#fff', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: '800' }}>CREATOR</span>
        </Link>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Home</Link>
          <Link href="/apply" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.8rem' }}>Apply Now</Link>
        </div>
      </div>
    </nav>
  );
}

