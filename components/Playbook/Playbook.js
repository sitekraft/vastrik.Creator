import styles from './Playbook.module.css';

export default function Playbook() {
  const steps = [
    { 
      num: '01', 
      icon: '✨', 
      title: 'APPLY & GET APPROVED', 
      desc: 'Submit your profile & fashion aesthetic to join the verified Vastrik Creator Atelier.' 
    },
    { 
      num: '02', 
      icon: '🎨', 
      title: 'SELECT A CAMPAIGN BRIEF', 
      desc: 'Choose from trending creator missions like "Pinterest to Reality", "Fit Test", or "AI Sketch to Stitch".' 
    },
    { 
      num: '03', 
      icon: '🎥', 
      title: 'CREATE & POST CONTENT', 
      desc: 'Record your reaction, Pinterest breakdown, or AI sketch test, tag #Vastrik (@vastrik.store), and post to Reels/Shorts.' 
    },

    { 
      num: '04', 
      icon: '💰', 
      title: 'EARN DIRECT FOR VIEWS', 
      desc: 'Receive transparent, guaranteed milestone payouts directly into your UPI/Bank as your views grow.' 
    },
  ];

  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>THE CREATOR<br /><span className="gradient-text">PLAYBOOK</span></h2>
          <p className={styles.subtitle}>Follow the simple 4-step path to creator growth & earnings.</p>
        </div>

        <div className={styles.grid}>
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


