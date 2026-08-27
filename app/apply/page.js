import ApplyNavbar from '@/components/ApplyNavbar/ApplyNavbar';
import MultiStepForm from '@/components/MultiStepForm/MultiStepForm';
import ApplyPromoImage from '@/components/ApplyPromoImage/ApplyPromoImage';
import styles from './page.module.css';

export default function ApplyPage() {
  return (
    <main className={styles.main}>
      <ApplyNavbar />
      
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.formCol}>
            <MultiStepForm />
          </div>
          <div className={styles.imageCol}>
            <ApplyPromoImage />
          </div>
        </div>
      </div>
      
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.logo}>VASTRIK</div>
            <p className={styles.copyright}>&copy; 2024 VASTRIK CREATOR ECOSYSTEM.</p>
            <div className={styles.links}>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
