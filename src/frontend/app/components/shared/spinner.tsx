'use client';

import Image from 'next/image';
import styled from 'styled-components';

const Spinner = () => (
  <Container>
    <Image src='/assets/loader.svg' height={144} width={144} alt='spinner' />
  </Container>
);

export default Spinner;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
