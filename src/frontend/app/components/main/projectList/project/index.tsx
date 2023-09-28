import Image from 'next/image';

import styles from './project.module.css';

const images = {
  open: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886bf9374c31b5a1b5562b_icons8-new-tab-64.png',
  edit: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886a92a3922c655f012862_icons8-edit-icon.png',
  delete:
    'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886a1837cf11c6fda5e696_icons8-recycle-bin-icon.png',
};

interface ProjectProps {
  name: string;
  description: string;
  url: string;
  createdAt: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

function Project({ name, url, nextMaintenance }: ProjectProps): JSX.Element {
  return (
    <li className={styles.container}>
      <div>
        <a href={url} target='_blank' rel='noreferrer' className={styles.name}>
          {name}
        </a>
      </div>
      <div className={styles.pair}>
        <span className={styles.label}>Next Maintenance:</span>
        <span className={styles.date}>{nextMaintenance}</span>
      </div>
      <div className={styles.actions}>
        <Image width={18} height={18} src={images.open} alt='' />
        <Image width={18} height={18} src={images.edit} alt='' />
        <Image width={18} height={18} src={images.delete} alt='' />
      </div>
    </li>
  );
}

export default Project;
