import styles from './HubNavbar.module.css';

export default function HubNavbar() {
  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.logo}>CREATOR HUB</div>
      </div>
    </nav>
  );
}
