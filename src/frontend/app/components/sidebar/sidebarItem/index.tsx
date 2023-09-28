import Image from 'next/image';

import styles from './sidebarItem.module.css';

interface SidebarProps {
  text: string;
  img: string;
}

function SidebarItem({ text, img }: SidebarProps): JSX.Element {
  return (
    <li className={styles.container}>
      <Image width={16} height={16} src={img} alt='' />
      <div className={styles.text}>{text}</div>
    </li>
  );
}

export default SidebarItem;
