import Image from 'next/image';

import Project from './project';
import styles from './projectList.module.css';

const images = {
  add: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886ca5bd8c1f835e1aca3c_icons8-plus-30.png',
};

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
        <Image width={18} height={18} src={images.add} alt='' />
      </div>
      <ul className={styles.list}>
        {projectList.map((project, i) => <Project key={i} {...project} />)}
      </ul>
    </div>
  );
}

export default ProjectList;
