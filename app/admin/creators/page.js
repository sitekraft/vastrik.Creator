import styles from './page.module.css';
import Link from 'next/link';

export default function AdminCreators() {
  const creators = [
    { id: 'CR-001', name: 'CyberKing', rank: 'Icon', points: '1.2M', status: 'Active' },
    { id: 'CR-002', name: 'NeonQueen', rank: 'Icon', points: '980K', status: 'Active' },
    { id: 'CR-003', name: 'TechwearTom', rank: 'Icon', points: '850K', status: 'Active' },
    { id: 'CR-012', name: 'Vastrik Creator', rank: 'Elite', points: '245K', status: 'Active' },
    { id: 'CR-099', name: 'SpamBot99', rank: 'Newbie', points: '0', status: 'Suspended' },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Creator Directory</h1>
          <p className={styles.subtitle}>Manage all approved creators on the platform.</p>
        </div>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search by name or ID..." className={styles.searchInput} />
        </div>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Creator Name</th>
              <th>Rank Tier</th>
              <th>Total Points</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((creator) => (
              <tr key={creator.id}>
                <td className={styles.id}>{creator.id}</td>
                <td className={styles.name}>{creator.name}</td>
                <td>
                  <span className={`${styles.rankBadge} ${styles[creator.rank.toLowerCase()]}`}>
                    {creator.rank}
                  </span>
                </td>
                <td className={styles.points}>{creator.points}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[creator.status.toLowerCase()]}`}>
                    {creator.status}
                  </span>
                </td>
                <td>
                  <Link href={`/admin/creators/${creator.id}`} className={styles.actionBtn} style={{textDecoration: 'none', display: 'inline-block'}}>Manage</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
