'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Project from './project';
import Modal from '../modal/modal';
import AddButton from './addButton';
import { getModal } from '#slices/modal';
import { ProjectListType } from '#types/project';
import { getProjectList, setProjectList } from '#slices/projectList';

type ProjectListProps = {
  initProjectList: ProjectListType;
};

function ProjectList({ initProjectList }: ProjectListProps) {
  const dispatch = useDispatch();

  const modal = useSelector(getModal);

  const projectList = useSelector(getProjectList);

  const projects = projectList || initProjectList;

  useEffect(() => {
    dispatch(setProjectList(initProjectList));
  }, []);

  return (
    <Container>
      <TitleWrapper>
        <Title>Projects List</Title>
        <AddButton />
      </TitleWrapper>
      <List>
        {projects.map((project, i) => (
          <Project key={i} {...project} />
        ))}
      </List>
      {modal.type && <Modal {...modal} />}
    </Container>
  );
}

export default ProjectList;

const Container = styled.div`
  background-color: #0f1935;
  border: 0.6px solid #343b4f;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 24px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;
