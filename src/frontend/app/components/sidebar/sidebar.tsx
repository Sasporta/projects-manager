import SidebarItem from './sidebarItem';
import styles from './sidebar.module.css';

interface SidebarProps {
  items: { text: string; img: string }[];
}

export default function Sidebar({ items }: SidebarProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Project Manager</h2>
      </div>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <SidebarItem key={i} {...item} />
        ))}
      </ul>
    </div>
  );
}
