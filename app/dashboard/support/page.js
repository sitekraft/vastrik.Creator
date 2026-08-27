'use client';

import styles from './page.module.css';

export default function SupportPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>SUPPORT CENTER</h1>
        <p className={styles.subtitle}>Need help? We've got you covered.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>How are challenge winners selected?</h3>
              <p className={styles.faqAnswer}>Winners are chosen based on a mix of engagement metrics (likes, views) and an internal review by our fashion council.</p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>When do I get paid?</h3>
              <p className={styles.faqAnswer}>Payouts are processed on the 1st and 15th of every month for balances over ₹10,000.</p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Can I edit a submission?</h3>
              <p className={styles.faqAnswer}>Once submitted, content cannot be edited. If you made a mistake, please contact support to cancel your entry.</p>
            </div>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Subject</label>
            <input type="text" className={styles.input} placeholder="E.g. Payment Issue" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Message</label>
            <textarea className={styles.textarea} rows="5" placeholder="Describe your issue..."></textarea>
          </div>
          <button type="button" className="btn-primary" style={{marginTop: '8px'}} onClick={() => alert('Message sent successfully! Our support team will get back to you within 24 hours.')}>Send Message</button>
        </div>
      </div>
    </div>
  );
}
