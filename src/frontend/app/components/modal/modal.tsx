'use client';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Edit from './content/edit';
import Error from './content/error';
import Create from './content/create';
import Remove from './content/remove';
import { MODAL_TYPE } from '#fe/consts';
import { closeModal } from '#slices/modal';

function Modal({ type, project }) {
  const dispatch = useDispatch();

  const modalMap = {
    [MODAL_TYPE.error]: <Error />,
    [MODAL_TYPE.create]: <Create />,
    [MODAL_TYPE.edit]: <Edit {...project} />,
    [MODAL_TYPE.remove]: <Remove {...project} />,
  };

  const onClick = () => {
    dispatch(closeModal());
  };

  return (
    <ModalBackground onClick={onClick}>
      <Container onClick={e => e.stopPropagation()}>{modalMap[type]}</Container>
    </ModalBackground>
  );
}

export default Modal;

const ModalBackground = styled.div`
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.31);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Container = styled.div`
  background-color: #0f1935;
  border: 0.6px solid #343b4f;
  border-radius: 12px;
  padding: 20px;
  width: 600px;
`;
