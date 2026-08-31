import styles from './Challenges.module.css';
import Link from 'next/link';

export default function Challenges() {
  const sampleMissions = [
    {
      badge: 'VIRAL UGC / NO CLOTHES NEEDED',
      format: 'Screen Demo + Reaction Reel',
      title: 'PINTEREST & CELEB LOOK DECONSTRUCT',
      desc: 'Find a viral Pinterest or celebrity outfit, show the crazy designer price tag, and demonstrate on screen how anyone can upload that photo to vastrik.store to get it custom stitched by master karigars.',
      duration: '15-45s Short / Reel'
    },
    {
      badge: 'TECH & FASHION REVIEW',
      format: 'Live Tool Walkthrough',
      title: 'AI SKETCH ANALYZER TEST & REACTION',
      desc: 'Test Vastrik\'s AI Sketch Analyzer (vastrik.store/#analyzer) on camera. Drop design sketches or moodboard photos, show the live fabric breakdown, and share your genuine reaction.',
      duration: '30-60s Screen Record / POV'
    },
    {
      badge: 'RELATABLE FASHION POV',
      format: 'Talking Head / Storytelling',
      title: 'STANDARD SIZING STRUGGLES vs VASTRIK',
      desc: 'Talk about the universal struggle of off-the-rack clothes that never fit, and introduce Vastrik\'s 100% custom-fit solution where Indian master tailors stitch to exact body measurements.',
      duration: '15-45s Story / Reel'
    }
  ];

  return (
    <section className={styles.section} id="challenges">
      <div className="container">
        <div className={styles.topBar}>
          <div>
            <span className={styles.tag}>ZERO-INVENTORY CREATOR MISSIONS</span>
            <h2 className={styles.mainTitle}>
              CREATE CONTENT.<br /><span className="gradient-text">EARN FOR VIEWS.</span>
            </h2>
          </div>
          <p className={styles.headerDesc}>
            No need to wait for clothing shipments. Create digital reviews, Pinterest breakdowns, and AI tool demos on your phone or PC, and get paid directly for your video reach.
          </p>
        </div>
        
        <div className={styles.grid}>
          {sampleMissions.map((mission, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.status}>
                  <span className={styles.dot}></span> {mission.badge}
                </span>
                <span className={styles.formatTag}>{mission.format}</span>
              </div>
              
              <h3 className={styles.title}>{mission.title}</h3>
              <p className={styles.desc}>{mission.desc}</p>
              
              <div className={styles.cardFooter}>
                <div className={styles.metaInfo}>
                  <span className={styles.metaLabel}>FORMAT</span>
                  <span className={styles.metaValue}>{mission.duration}</span>
                </div>
                <div className={styles.lockBadge}>
                  <span className={styles.lockIcon}>⚡</span> Instant Approval
                </div>
              </div>

              <Link href="/apply" className={styles.btn}>
                Apply to Start Creating &rarr;
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.bottomCta}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaText}>
              <h3>Ready to turn your creativity into guaranteed payouts?</h3>
              <p>Promote Vastrik's custom stitching marketplace, bring Pinterest dreams to reality, and earn up to ₹5,000 per 1M views directly into your UPI/Bank.</p>
            </div>
            <Link href="/apply" className="btn-primary">
              Enroll as Creator &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}



