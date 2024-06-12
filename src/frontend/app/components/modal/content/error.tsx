'use client';

import styled from 'styled-components';

function Error() {
  return (
    <>
      <TitleWrapper>
        <Title>Error Ocurred</Title>
      </TitleWrapper>
      <Description>
        Sorry, an error ocurred. Please try again later.
      </Description>
    </>
  );
}

export default Error;

const TitleWrapper = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 24px;
  margin: 0;
`;

const Description = styled.div`
  color: #aeb9e1;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
`;
