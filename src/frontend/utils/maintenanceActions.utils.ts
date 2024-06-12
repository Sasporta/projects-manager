import { customFetch } from './customFetch.utils';

export const schedule = async (projectId: string, done: boolean) => {
  const url = `/api/v1/project/${projectId}/maintenance?done=${done}`;

  const options = { method: 'POST' };

  const { data: project, isError } = await customFetch(url, options);

  return { project, isError };
};

export const postpone = async (projectId: string) => {
  const url = `/api/v1/project/${projectId}/maintenance`;

  const options = { method: 'PUT' };

  const { data: project, isError } = await customFetch(url, options);

  return { project, isError };
};

export const cancel = async (projectId: string) => {
  const url = `/api/v1/project/${projectId}/maintenance`;

  const options = { method: 'DELETE' };

  const { data: project, isError } = await customFetch(url, options);

  return { project, isError };
};
