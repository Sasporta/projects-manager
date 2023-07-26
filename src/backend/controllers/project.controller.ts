import * as scheduler from '@services/scheduler.service';
import * as projectService from '@services/project.service';
import { ExtendedError, GeneralError } from '@lib/customErrors';

type GetOneData = { id: string };

type PostData = { name: string; description: string; url: string };

type PutData = { id: string; name: string; description: string; url: string };

type RemoveData = { id: string };

export const getAll = async () => {
  try {
    const projects = await projectService.readAll();

    return projects;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ cause: e });
    }
  }
};

export const getOne = async (data: GetOneData) => {
  try {
    const project = await projectService.readOne(data);

    return project;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};

export const post = async (data: PostData) => {
  try {
    const scheduledAt = scheduler.scheduleNextMaintenance();

    const createData = { ...data, scheduledAt };

    const project = await projectService.create(createData);

    return project;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};

export const put = async (data: PutData) => {
  try {
    const project = await projectService.update(data);

    return project;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};

export const remove = async (data: RemoveData) => {
  try {
    const project = await projectService.destroy(data);

    return project;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};
