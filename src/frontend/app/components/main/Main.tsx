'use client';

import styled from 'styled-components';

import Spinner from '../shared/spinner';
import { ProjectListType } from '#types/project';
import ProjectList from '../projectList/projectList';
import ChosenProject from '../chosenProject/chosenProject';

type MainProps = {
  projects: ProjectListType;
};

function Main({ projects }: MainProps) {
  const projectsUi = (
    <>
      {projects[0] && <ChosenProject initChosenProject={projects[0]} />}
      <ProjectList initProjectList={projects} />
    </>
  );

  return <Container>{projects ? projectsUi : <Spinner />}</Container>;
}

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 25px;
  width: 100%;
`;
