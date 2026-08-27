import styles from './ApplyPromoImage.module.css';
import Image from 'next/image';

export default function ApplyPromoImage() {
  return (
    <div className={styles.wrapper}>
      <Image 
        src="/apply_promo.jpg" 
        alt="Vastrik Creator Application" 
        width={500} 
        height={500} 
        className={styles.image}
        priority
      />
      <div className={styles.glow}></div>
    </div>
  );
}
