import styles from './NextSteps.module.css';
import Link from 'next/link';

export default function NextSteps() {
  const steps = [
    {
      num: '01',
      title: 'We review your profile',
      desc: 'Our team checks your creator profile, content quality, and engagement metrics.'
    },
    {
      num: '02',
      title: 'Selection update',
      desc: 'Selected creators receive an official invitation email with onboarding details.'
    },
    {
      num: '03',
      title: 'Start your journey',
      desc: 'Get access to exclusive challenges, campaigns, and your custom creator dashboard.'
    }
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>What Happens Next?</h3>
      
      <div className={styles.grid}>
        {steps.map((step, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.num}>{step.num}</div>
            <h4 className={styles.title}>{step.title}</h4>
            <p className={styles.desc}>{step.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Link href="/dashboard" className="btn-primary">EXPLORE PROGRAM</Link>
        <Link href="/" className="btn-secondary">
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
