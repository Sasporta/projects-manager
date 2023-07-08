import * as projectService from '../services/project.service';

type Data = { id: string };

export const getAll = async () => {
  try {
    const projects = await projectService.getAll();

    return projects;
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      throw new Error(`project.controller.getAll, ${args}`);
    }
  }
};

export const getOne = async (data: Data) => {
  try {
    const project = await projectService.getOne(data);

    return project;
  } catch (e) {
    if (e instanceof Error) {
      const args = `data: ${JSON.stringify(data, null, 2)} msg: ${e.message}`;

      throw new Error(`project.controller.getOne, ${args}`);
    }
  }
};
