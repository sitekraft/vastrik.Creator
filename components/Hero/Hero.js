import styles from './Hero.module.css';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.tag}>
            <span className={styles.icon}>✨</span> OFFICIAL CREATOR NETWORK
          </div>
          <h1 className={styles.title}>
            VASTRIK CREATOR PROGRAM.<br />
            <span className="gradient-text">GET PAID TO CREATE.</span>
          </h1>
          <p className={styles.subtitle}>
            Join India&apos;s premier fashion creator network. Create viral fashion content, review bespoke designs, and earn guaranteed payouts for every view.
          </p>
          <div className={styles.actions}>
            <Link href="/apply" className="btn-primary">
              Apply as Creator &rarr;
            </Link>
            <a href="#how-it-works" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

