import styles from './chosenProject.module.css';

interface ChosenProjectProps {
  name: string;
  description: string;
  url: string;
  createdAt: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

function ChosenProject(chosenProject: ChosenProjectProps): JSX.Element {
  const {
    name,
    description,
    url,
    createdAt,
    lastMaintenance,
    nextMaintenance,
  } = chosenProject;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.content}>
        <div>
          <p className={styles.description}>{description}</p>
          <a
            className={styles.link}
            href={url}
            target='_blank'
            rel='noreferrer'
          >
            {url}
          </a>
        </div>
        <div className={styles.details}>
          <div className={styles.pair}>
            <span>Created At:</span>
            <span className={styles.date}>{createdAt}</span>
          </div>
          <div className={styles.pair}>
            <span>Last Maintenance:</span>
            <span className={styles.date}>{lastMaintenance}</span>
          </div>
          <div className={styles.pair}>
            <span>next Maintenance:</span>
            <span className={styles.date}>{nextMaintenance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChosenProject;
