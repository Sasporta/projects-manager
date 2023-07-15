import * as scheduler from '@services/scheduler.service';
import * as projectService from '@services/project.service';

type GetOneData = { id: string };

type PostData = { name: string; description: string; url: string };

type PutData = { id: string, name: string; description: string; url: string };

type RemoveData = { id: string };

export const getAll = async () => {
  try {
    const projects = await projectService.readAll();

    return projects;
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      throw new Error(`project.controller.getAll, ${args}`);
    }
  }
};

export const getOne = async (data: GetOneData) => {
  try {
    const project = await projectService.readOne(data);

    return project;
  } catch (e) {
    if (e instanceof Error) {
      const args = `data: ${JSON.stringify(data, null, 2)} msg: ${e.message}`;

      throw new Error(`project.controller.getOne, ${args}`);
    }
  }
};

export const post = async (data: PostData) => {
  try {
    const nextMaintenance = scheduler.scheduleNextMaintenance();

    const createData = { ...data, nextMaintenance };

    const project = await projectService.create(createData);

    return project;
  } catch (e) {
    if (e instanceof Error) {
      const args = `data: ${JSON.stringify(data, null, 2)} msg: ${e.message}`;

      throw new Error(`project.controller.post, ${args}`);
    }
  }
};

export const put = async (data: PutData) => {
  try {
    const project = await projectService.update(data);

    return project;
  } catch (e) {
    if (e instanceof Error) {
      const args = `data: ${JSON.stringify(data, null, 2)} msg: ${e.message}`;

      throw new Error(`project.controller.put, ${args}`);
    }
  }
};

export const remove = async (data: RemoveData) => {
  try {
    const project = await projectService.destroy(data);

    return project;
  } catch (e) {
    if (e instanceof Error) {
      const args = `data: ${JSON.stringify(data, null, 2)} msg: ${e.message}`;

      throw new Error(`project.controller.remove, ${args}`);
    }
  }
};
