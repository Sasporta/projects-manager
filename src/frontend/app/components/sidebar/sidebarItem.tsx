'use client';

import Image from 'next/image';
import styled from 'styled-components';

type SidebarProps = {
  text: string;
  img: string;
};

function SidebarItem({ text, img }: SidebarProps) {
  const onClick = () => {
    // TODO: Implement onClick
  };

  return (
    <Container onClick={onClick}>
      <Image width={18} height={18} src={img} alt='' />
      <Text>{text}</Text>
    </Container>
  );
}

export default SidebarItem;

const Container = styled.li`
  color: #aeb9e1;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  &:hover {
    color: #fbfbfb;
    cursor: pointer;
  }
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 18px;
`;
