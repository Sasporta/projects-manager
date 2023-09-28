import Project from './chosenProject';
import styles from './main.module.css';
import ProjectList from './projectList';

const projects = [
  {
    name: 'Example 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    url: 'https://examle-1.com',
    createdAt: 'Jan 30, 2023',
    lastMaintenance: 'Jan 30, 2023',
    nextMaintenance: 'Jan 30, 2023',
  },
  {
    name: 'Example 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    url: 'https://examle-2.com',
    createdAt: 'Jan 30, 2023',
    lastMaintenance: 'Jan 30, 2023',
    nextMaintenance: 'Jan 30, 2023',
  },
  {
    name: 'Example 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    url: 'https://examle-3.com',
    createdAt: 'Jan 30, 2023',
    lastMaintenance: 'Jan 30, 2023',
    nextMaintenance: 'Jan 30, 2023',
  },
  {
    name: 'Example 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    url: 'https://examle-4.com',
    createdAt: 'Jan 30, 2023',
    lastMaintenance: 'Jan 30, 2023',
    nextMaintenance: 'Jan 30, 2023',
  },
  {
    name: 'Example 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    url: 'https://examle-5.com',
    createdAt: 'Jan 30, 2023',
    lastMaintenance: 'Jan 30, 2023',
    nextMaintenance: 'Jan 30, 2023',
  },
  {
    name: 'Example 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    url: 'https://examle-6.com',
    createdAt: 'Jan 30, 2023',
    lastMaintenance: 'Jan 30, 2023',
    nextMaintenance: 'Jan 30, 2023',
  },
];

function Main(): JSX.Element {
  return (
    <div className={styles.main}>
      <Project {...projects[0]} />
      <ProjectList projectList={projects} />
    </div>
  );
}

export default Main;
