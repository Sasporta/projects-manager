'use client';

import Image from 'next/image';

import styles from './actionButton.module.css';

interface ActionButtonProps {
  src: string;
  onClick: () => void;
}

function ActionButton({ src, onClick }: ActionButtonProps): JSX.Element {
  return (
    <button className={styles.container} onClick={onClick}>
      <Image width={18} height={18} src={src} alt='' />
    </button>
  );
}

export default ActionButton;
