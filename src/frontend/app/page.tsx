import Main from './components/main';
import styles from './page.module.css';
import Sidebar from './components/sidebar';

// TODO: this should probably be dynamic or moved to a config file
const items = [
  {
    text: 'Projects Manager',
    img: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/6489c0882b06ad764ea8f517_icons8-unit-50%20(1).png',
  },
  {
    text: 'Backlog',
    img: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/6489bbffd7f753d372cbd98c_icons8-repository-30.png',
  },
];

function ProjectsManager() {
  return (
    <div className={styles.container}>
      <Sidebar items={items} />
      <Main />
    </div>
  );
}

export default ProjectsManager;
