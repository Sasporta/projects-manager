'use client';

import styled from 'styled-components';

type TooltipProps = {
  text: string;
};

function Tooltip({ text }: TooltipProps) {
  return (
    <Container>
      {text}
      <DownLeftCorner />
    </Container>
  );
}

export default Tooltip;

const Container = styled.div`
  background: #395bd5;
  border-radius: 5px;
  color: #aeb9e1;
  font-size: 14px;
  line-height: 14px;
  position: absolute;
  right: 100%;
  top: -22px;
  padding: 3px 5px;
  white-space: nowrap;
`;

const DownLeftCorner = styled.div`
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #395bd5;
  position: absolute;
  left: calc(100% - 6px);
  top: calc(100% - 4px);
  transform: rotate(30deg);
`;
