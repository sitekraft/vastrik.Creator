import styles from './PromoImage.module.css';
import Image from 'next/image';

export default function PromoImage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.imageWrapper}>
          <Image 
            src="/promo.jpg" 
            alt="Vastrik Show Your Style" 
            width={800} 
            height={800} 
            className={styles.image}
            priority
          />
          <div className={styles.glow}></div>
        </div>
      </div>
    </section>
  );
}
