'use client';

import styles from './actionButtons.module.css';
import ActionButton from '../../../../shared/actionButton';

const images = {
  open: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886bf9374c31b5a1b5562b_icons8-new-tab-64.png',
  edit: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886a92a3922c655f012862_icons8-edit-icon.png',
  delete:
    'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886a1837cf11c6fda5e696_icons8-recycle-bin-icon.png',
};

interface ActionButtonsProps {
  url: string;
}

function ActionButtons({ url }: ActionButtonsProps): JSX.Element {
  const onOpen = () => {
    window.open(url, '_blank');
  };
  const onEdit = () => {
    // TODO: Implement edit
  };
  const onDelete = () => {
    // TODO: Implement delete
  };

  return (
    <div className={styles.container}>
      <ActionButton src={images.open} onClick={onOpen} />
      <ActionButton src={images.edit} onClick={onEdit} />
      <ActionButton src={images.delete} onClick={onDelete} />
    </div>
  );
}

export default ActionButtons;
