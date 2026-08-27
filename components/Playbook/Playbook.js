import styles from './Playbook.module.css';

export default function Playbook() {
  const steps = [
    { num: '01', icon: '📝', title: 'APPLY & GET SELECTED', desc: 'Submit your profile and prove you have what it takes to join the elite roster.' },
    { num: '02', icon: '⚡', title: 'PICK A CHALLENGE', desc: 'Browse active fashion missions tailored to different aesthetics and styles.' },
    { num: '03', icon: '🎥', title: 'CREATE & SUBMIT', desc: 'Produce high-quality content that captures your unique vibe and fits the brief.' },
    { num: '04', icon: '🏆', title: 'WIN REWARDS', desc: 'Get featured, earn massive cash prizes, and unlock exclusive brand deals.' },
  ];

  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>THE MISSION<br/>PLAYBOOK</h2>
          <p className={styles.subtitle}>Follow the path to creator glory.</p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{step.icon}</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
              <div className={styles.watermark}>{step.num}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
