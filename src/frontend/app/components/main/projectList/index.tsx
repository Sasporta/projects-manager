import Project from './project';
import AddButton from './addButton';
import styles from './projectList.module.css';

interface ProjectListProps {
  projectList: {
    name: string;
    description: string;
    url: string;
    createdAt: string;
    lastMaintenance: string;
    nextMaintenance: string;
  }[];
}

function ProjectList({ projectList }: ProjectListProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Projects List</h2>
        <AddButton />
      </div>
      <ul className={styles.list}>
        {projectList.map((project, i) => (
          <Project key={i} {...project} />
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
