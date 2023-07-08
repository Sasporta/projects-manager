import * as projectRepository from '../repositories/project.repository';

type Data = { id: string };

export const getAll = async () => {
  try {
    const projects = await projectRepository.getAll();

    return projects;
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      throw new Error(`project.service.getAll, ${args}`);
    }
  }
};

export const getOne = async (data: Data) => {
  try {
    const project = await projectRepository.getOne(data);

    return project;
  } catch (e) {
    if (e instanceof Error) {
      const args = `data: ${JSON.stringify(data, null, 2)} msg: ${e.message}`;

      throw new Error(`project.service.getOne, ${args}`);
    }
  }
};
