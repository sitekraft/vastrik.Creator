import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Col 1: Brand & Contact Info */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              VASTRIK<span className={styles.creatorTag}>CREATOR</span>
            </Link>
            <p className={styles.brandDesc}>
              Design • Stitch • Wear. Connecting creators with India's bespoke custom fashion & Master Karigar ecosystem.
            </p>
            <div className={styles.quickContact}>
              <a href="https://wa.me/918009651086" target="_blank" rel="noopener noreferrer" className={styles.contactBadge}>
                <span>📞</span> +91 8009651086
              </a>
              <a href="mailto:vastrik.support@gmail.com" className={styles.contactBadge}>
                <span>✉️</span> vastrik.support@gmail.com
              </a>
            </div>
          </div>

          {/* Col 2: Creator Program */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Creator Program</h4>
            <ul className={styles.linkList}>
              <li><Link href="/#how-it-works">How It Works</Link></li>
              <li><Link href="/#payouts">View Payouts</Link></li>
              <li><Link href="/#challenges">Sample Missions</Link></li>
              <li><Link href="/status">Check Application Status</Link></li>
              <li><Link href="/apply">Apply as Creator</Link></li>
            </ul>
          </div>

          {/* Col 3: Brand Collaborations */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Brand Studio</h4>
            <ul className={styles.linkList}>
              <li><Link href="/collaborations">Brand Collaborations</Link></li>
              <li><Link href="/collaborations">Sponsor Challenges</Link></li>
              <li>
                <a href="https://instagram.com/vastrikofficial" target="_blank" rel="noopener noreferrer">
                  Instagram @vastrikofficial ↗
                </a>
              </li>
              <li>
                <a href="https://vastrik.store" target="_blank" rel="noopener noreferrer">
                  vastrik.store (Official Store) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Help Desk */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Help Desk</h4>
            <ul className={styles.linkList}>
              <li><Link href="/support">Support Portal & FAQs</Link></li>
              <li>
                <a href="https://wa.me/918009651086?text=Hi%20Vastrik%20Support" target="_blank" rel="noopener noreferrer">
                  WhatsApp Support Hotline ↗
                </a>
              </li>
              <li><Link href="/dashboard/rules">Creator Guidelines</Link></li>
              <li>
                <a href="mailto:sitekraft.dev@gmail.com">
                  Tech Support (Sitekraft Dev) ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; 2026 VASTRIK (vastrik.store) • Powered by Sitekraft. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/support">Help Desk</Link>
            <span>•</span>
            <Link href="/collaborations">Brand Inquiries</Link>
            <span>•</span>
            <a href="https://instagram.com/vastrikofficial" target="_blank" rel="noopener noreferrer">@vastrikofficial</a>
            <span>•</span>
            <a href="https://vastrik.store" target="_blank" rel="noopener noreferrer">vastrik.store</a>
          </div>
        </div>
      </div>
    </footer>
  );
}



