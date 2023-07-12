import * as projectRepository from '../repositories/project.repository';

type ReadOneData = { id: string };

type CreateData = {
  name: string;
  description: string;
  url: string;
  nextMaintenance: Date;
};

export const readAll = async () => {
  try {
    const projects = await projectRepository.readAll();

    return projects;
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      throw new Error(`project.service.readAll, ${args}`);
    }
  }
};

export const readOne = async (data: ReadOneData) => {
  try {
    const project = await projectRepository.readOne(data);

    return project;
  } catch (e) {
    if (e instanceof Error) {
      const args = `data: ${JSON.stringify(data, null, 2)} msg: ${e.message}`;

      throw new Error(`project.service.readOne, ${args}`);
    }
  }
};

export const create = async (data: CreateData) => {
  try {
    const project = await projectRepository.create(data);

    return project;
  } catch (e) {
    if (e instanceof Error) {
      const args = `data: ${JSON.stringify(data, null, 2)} msg: ${e.message}`;

      throw new Error(`project.service.create, ${args}`);
    }
  }
};
