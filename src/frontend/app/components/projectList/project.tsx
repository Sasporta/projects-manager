'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ProjectType } from '#types/project';
import ActionButtons from '../shared/actionButtons';
import { getButtons } from './projectButtons.config';
import { orderProjectList } from '#slices/projectList';
import { getChosenProject, setChosenProject } from '#slices/chosenProject';

type ProjectProps = ProjectType;

function Project(project: ProjectProps) {
  const dispatch = useDispatch();

  const chosenProject = useSelector(getChosenProject);

  const { id, name, url, nextMaintenance } = project;

  const onClick = () => {
    dispatch(setChosenProject(project));
  };

  const buttons = getButtons({ dispatch, url, project });

  useEffect(() => {
    dispatch(orderProjectList());
  }, [nextMaintenance]);

  useEffect(() => {
    if (id === chosenProject?.id) {
      dispatch(setChosenProject(project));
    }
  }, [name, url, nextMaintenance]);

  return (
    <Container onClick={onClick}>
      <Indication isMaintained={nextMaintenance} />
      <div>
        <Name href={url} target='_blank' rel='noreferrer'>
          {name}
        </Name>
      </div>
      <Pair>
        <Label>Next Maintenance:</Label>
        <Date>{nextMaintenance || 'not maintained'}</Date>
      </Pair>
      <ActionButtons buttons={buttons} />
    </Container>
  );
}

export default Project;

const Container = styled.li`
  border-bottom: 0.6px solid #343b4f;
  display: grid;
  align-items: center;
  gap: 10px;
  grid-template-columns: 15px 3fr 3fr 1fr;
  margin-bottom: -0.6px;
  padding: 12px 28px;

  &:hover {
    background: #4363d7;
    transition: 0.2s ease-in;
  }
`;

const Indication = styled.span`
  background: ${({ isMaintained }) => (isMaintained ? '#2ce02c' : '#f82e2e')};
  border-radius: 50%;
  height: 10px;
  margin-top: 4px;
  width: 10px;
`;

const Name = styled.a`
  color: #aeb9e1;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: #0f1935;
  }
`;

const Pair = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.span`
  color: #aeb9e1;
  font-weight: 500;
  font-size: 14px;
`;

const Date = styled.span`
  color: #aeb9e1;
  font-size: 14px;
`;
