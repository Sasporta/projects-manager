'use client';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { MODAL_TYPE } from '#fe/consts';
import { ProjectType } from '#types/project';
import { removeProject } from '#slices/projectList';
import { closeModal, setModal } from '#slices/modal';
import * as projectActions from '#utils/projectActions.utils';

type RemoveProps = ProjectType;

function Remove(project: RemoveProps) {
  const { id, name } = project;

  const dispatch = useDispatch();

  const onConfirmation = async () => {
    const { isError } = await projectActions.remove(id);

    if (isError) {
      dispatch(setModal({ type: MODAL_TYPE.error, project: null }));

      return;
    }

    dispatch(removeProject({ id }));

    dispatch(closeModal());
  };

  const onCancel = async () => {
    dispatch(closeModal());
  };

  return (
    <>
      <TitleWrapper>
        <Title>Remove Project</Title>
      </TitleWrapper>
      <Description>Are you sure you want to remove {name} project?</Description>
      <ButtonWrapper>
        <Button onClick={onConfirmation}>Remove</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonWrapper>
    </>
  );
}

export default Remove;

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 25px;
`;

const Button = styled.button`
  background-color: #4363d7;
  border: none;
  border-radius: 4px;
  color: #fbfbfb;
  font-size: 16px;
  font-weight: 500;
  padding: 9px 15px;
  width: 200px;

  &:hover {
    cursor: pointer;
    background-color: #3a56c5;
  }
`;
