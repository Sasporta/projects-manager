'use client';

import styled from 'styled-components';

type onChangeParams = {
  target: {
    name: string;
    value: string;
  };
};

type GenericInputProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  error: string;
  onChange: (params: onChangeParams) => void;
};

function GenericInput(props: GenericInputProps) {
  const { label, error, ...inputProps } = props;

  return (
    <Container>
      <Label>{label}</Label>
      <Input {...inputProps} />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

export default GenericInput;

const Container = styled.div`
  height: 95px;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
`;

const Label = styled.div`
  color: #aeb9e1;
  font-size: 16px;
  font-weight: 700;
  margin: 0 auto 10px 0;
`;

const Input = styled.input`
  background-color: #fbfbfb;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  height: 40px;
  margin-bottom: 5px;
  padding: 5px 10px;
  width: 100%;
`;

const Error = styled.div`
  color: red;
  font-size: 16px;
`;
