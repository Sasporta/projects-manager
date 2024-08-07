'use client';

import styled from 'styled-components';

import ActionButton from './actionButton';

type ActionButtonsProps = {
  buttons: {
    id: string;
    icon: string;
    tooltip: string;
    action: () => Promise<void> | void;
  }[];
};

function ActionButtons({ buttons }: ActionButtonsProps) {
  return (
    <Container>
      {buttons.map(({ id, icon, tooltip, action }) => (
        <ActionButton key={id} src={icon} tooltip={tooltip} onClick={action} />
      ))}
    </Container>
  );
}

export default ActionButtons;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
`;
