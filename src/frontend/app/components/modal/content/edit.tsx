'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { MODAL_TYPE } from '#fe/consts';
import { ProjectType } from '#types/project';
import { editProject } from '#slices/projectList';
import { closeModal, setModal } from '#slices/modal';
import GenericInput from '../../shared/genericInput';
import * as validations from '@common/validations.common';
import * as projectActions from '#utils/projectActions.utils';

type EditProps = ProjectType;

function Edit(project: EditProps) {
  const { id, name, description, url } = project;

  const dispatch = useDispatch();

  const [inputsValues, setInputsValues] = useState({ name, description, url });

  const [inputsErrors, setInputsErrors] = useState({
    name: false,
    description: false,
    url: false,
  });

  const isValid = () => {
    const inputsFields = Object.keys(inputsValues);

    return inputsFields.reduce((isValid, field) => {
      const { error } = validations[field].validate(inputsValues[field]);

      setInputsErrors(inputsErrors => ({ ...inputsErrors, [field]: !!error }));

      return isValid && !error;
    }, true);
  };

  const onChange = ({ target: { name, value } }) => {
    setInputsErrors(inputsErrors => ({ ...inputsErrors, [name]: false }));

    setInputsValues(inputsValues => ({ ...inputsValues, [name]: value }));
  };

  const onSubmit = async () => {
    if (!isValid()) {
      return;
    }

    const { project, isError } = await projectActions.update(id, inputsValues);

    if (isError) {
      dispatch(setModal({ type: MODAL_TYPE.error, project: null }));

      return;
    }

    dispatch(editProject(project));

    dispatch(closeModal());
  };

  const inputs = [
    {
      label: 'Project Name',
      type: 'text',
      name: 'name',
      value: inputsValues.name,
      error: inputsErrors.name ? 'Project name is invalid' : '',
      onChange,
    },
    {
      label: 'Project Description',
      type: 'text',
      name: 'description',
      value: inputsValues.description,
      error: inputsErrors.description ? 'Project description is invalid' : '',
      onChange,
    },
    {
      label: 'Project URL',
      type: 'text',
      name: 'url',
      value: inputsValues.url,
      error: inputsErrors.url ? 'Project url is invalid' : '',
      onChange,
    },
  ];

  return (
    <>
      <TitleWrapper>
        <Title>Edit Project</Title>
      </TitleWrapper>
      <Form>
        {inputs.map((input, i) => (
          <GenericInput key={i} {...input} />
        ))}
        <Button onClick={onSubmit}>Edit</Button>
      </Form>
    </>
  );
}

export default Edit;

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

const Form = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: #4363d7;
  border: none;
  border-radius: 4px;
  color: #fbfbfb;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 25px;
  padding: 9px 15px;
  width: 200px;

  &:hover {
    cursor: pointer;
    background-color: #3a56c5;
  }
`;
