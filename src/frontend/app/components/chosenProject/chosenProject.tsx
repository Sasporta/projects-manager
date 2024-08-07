'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ProjectType } from '#types/project';
import ActionButtons from '../shared/actionButtons';
import { getButtons } from './chosenProjectButtons.config';
import { getChosenProject, setChosenProject } from '#slices/chosenProject';

type ChosenProjectProps = {
  initChosenProject: ProjectType;
};

function ChosenProject({ initChosenProject }: ChosenProjectProps) {
  const dispatch = useDispatch();

  const chosenProject = useSelector(getChosenProject);

  const project = chosenProject || initChosenProject;

  const {
    id,
    name,
    description,
    url,
    createdAt,
    lastMaintenance,
    nextMaintenance,
  } = project;

  const buttons = getButtons(dispatch, id);

  const currentButtons = nextMaintenance ? buttons.slice(1) : [buttons[0]];

  useEffect(() => {
    dispatch(setChosenProject(initChosenProject));
  }, []);

  return (
    <Container>
      <Header>
        <Title>{name}</Title>
        <ActionButtons buttons={currentButtons} />
      </Header>
      <Content>
        <DescriptionWrapper>
          <Description>{description}</Description>
          <Link href={url} target='_blank' rel='noreferrer'>
            {url}
          </Link>
        </DescriptionWrapper>
        <Details>
          <LabelsWrapper>
            <div>Created At:</div>
            <div>Last Maintenance:</div>
            <div>next Maintenance:</div>
          </LabelsWrapper>
          <DatesWrapper>
            <Date>{createdAt}</Date>
            <Date>{lastMaintenance}</Date>
            <Date>{nextMaintenance}</Date>
          </DatesWrapper>
        </Details>
      </Content>
    </Container>
  );
}

export default ChosenProject;

const Container = styled.div`
  background-color: #0f1935;
  border: 0.6px solid #343b4f;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  padding: 20px;
`;

const Header = styled.div`
  border-bottom: 0.6px solid #343b4f;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 20px 20px;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 24px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 28px;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 250px;
`;

const Description = styled.p`
  color: #aeb9e1;
  font-size: 16px;
  margin-bottom: 15px;
`;

const Link = styled.a`
  color: #6267e8;
  font-size: 16px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 300px;
`;

const LabelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const DatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const Date = styled.div`
  color: #aeb9e1;
  height: 20px;
`;
