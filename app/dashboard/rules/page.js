import styles from './page.module.css';

export default function RulesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>RULES & GUIDELINES</h1>
      </header>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Community Guidelines</h2>
          <ul className={styles.list}>
            <li><strong>Be Original:</strong> All submitted content must be your own original work. Plagiarism or unauthorized use of third-party assets will result in immediate disqualification and potential ban.</li>
            <li><strong>Respect the Aesthetic:</strong> Ensure your submissions align with Vastrik's premium, futuristic, and streetwear aesthetics.</li>
            <li><strong>No Hate Speech:</strong> Any content promoting violence, discrimination, or hate speech is strictly prohibited.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Challenge Rules</h2>
          <ul className={styles.list}>
            <li><strong>Deadlines are Final:</strong> Submissions must be uploaded before the countdown timer hits zero. No exceptions.</li>
            <li><strong>Format:</strong> All images must be high-resolution (min 1080x1080). Videos should be at least 1080p.</li>
            <li><strong>Tagging:</strong> You must use the official challenge hashtags on your social media posts to track engagement.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Rewards & Payouts</h2>
          <ul className={styles.list}>
            <li><strong>Points System:</strong> Points are awarded based on a combination of internal review score and social engagement metrics (views/likes).</li>
            <li><strong>Withdrawals:</strong> Cash withdrawals require a minimum balance of ₹10,000. Processing takes 3-5 business days.</li>
            <li><strong>Physical Merch:</strong> Redeemable physical items will be shipped within 2 weeks of claiming.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
