import styles from './Hero.module.css';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.tag}>
            <span className={styles.icon}>🔥</span> THE ULTIMATE CREATOR CHALLENGE
          </div>
          <h1 className={styles.title}>
            CREATE.<br />
            <span className="gradient-text">SHOW YOUR STYLE.</span><br />
            WIN BIG.
          </h1>
          <p className={styles.subtitle}>
            Join the most exclusive fashion creator network. Participate in challenges, elevate your unique aesthetic, and unlock massive rewards.
          </p>
          <div className={styles.actions}>
            <Link href="/apply" className="btn-primary">
              Apply Now &rarr;
            </Link>
            <a href="#how-it-works" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>How it Works</a>
          </div>
        </div>
      </div>
    </section>
  );
}
