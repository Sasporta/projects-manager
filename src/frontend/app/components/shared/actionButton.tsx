'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import Tooltip from './tooltip';

type ActionButtonProps = {
  src: string;
  tooltip: string;
  onClick: () => void;
};

function ActionButton({ src, tooltip, onClick }: ActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container
      onClick={onClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Image className={'icon'} width={18} height={18} src={src} alt='' />
      {isHovered && <Tooltip text={tooltip} />}
    </Container>
  );
}

export default ActionButton;

const Container = styled.button`
  background: transparent;
  border: none;
  height: 24px;
  position: relative;
  width: 24px;

  &:hover {
    cursor: pointer;

    .icon {
      height: 24px;
      transition: 0.1s ease-in;
      width: 24px;
    }
  }
`;
