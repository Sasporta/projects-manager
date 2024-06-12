import { customFetch } from './customFetch.utils';

type ProjectBodyType = {
  name: string;
  description: string;
  url: string;
};

export const create = async (body: ProjectBodyType) => {
  const url = '/api/v1/project/';

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data: project, isError } = await customFetch(url, options);

  return { project, isError };
};

export const update = async (id: string, body: ProjectBodyType) => {
  const url = `/api/v1/project/${id}`;

  const options = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data: project, isError } = await customFetch(url, options);

  return { project, isError };
};

export const remove = async (id: string) => {
  const url = `/api/v1/project/${id}`;

  const options = { method: 'DELETE' };

  const { isError } = await customFetch(url, options);

  return { isError };
};
