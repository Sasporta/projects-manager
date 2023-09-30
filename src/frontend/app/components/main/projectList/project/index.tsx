'use client';

import styles from './project.module.css';
import ActionButtons from './actionButtons';

interface ProjectProps {
  name: string;
  description: string;
  url: string;
  createdAt: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

function Project({ name, url, nextMaintenance }: ProjectProps): JSX.Element {
  const onClick = () => {
    // TODO: Implement onClick
  };

  return (
    <li className={styles.container} onClick={onClick}>
      <div>
        <a href={url} target='_blank' rel='noreferrer' className={styles.name}>
          {name}
        </a>
      </div>
      <div className={styles.pair}>
        <span className={styles.label}>Next Maintenance:</span>
        <span className={styles.date}>{nextMaintenance}</span>
      </div>
      <ActionButtons url={url} />
    </li>
  );
}

export default Project;
