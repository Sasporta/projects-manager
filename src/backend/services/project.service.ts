import { ExtendedError, GeneralError } from '@lib/customErrors';
import * as projectRepository from '@repositories/project.repository';

type ReadOneData = { id: string };

type CreateData = {
  name: string;
  description: string;
  url: string;
  scheduledAt: Date;
};

type UpdateData = {
  id: string;
  name: string;
  description: string;
  url: string;
};

type DestroyData = { id: string };

export const readAll = async () => {
  try {
    const projects = await projectRepository.readAll();

    if (!projects) {
      throw new GeneralError({ message: `project is ${projects}` });
    }

    const formattedProjects = projects.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description,
      url: project.url,
      createdAt: project.createdAt,
      lastMaintenance: project.maintenance?.[1]?.doneAt ?? null,
      nextMaintenance: project.maintenance[0].scheduledAt,
    }));

    return formattedProjects;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ cause: e });
    }
  }
};

export const readOne = async (data: ReadOneData) => {
  try {
    const project = await projectRepository.readOne(data);

    if (!project) {
      throw new GeneralError({
        message: `project is ${project}`,
        params: data,
      });
    }

    const formattedProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      url: project.url,
      createdAt: project.createdAt,
      lastMaintenance: project.maintenance?.[1]?.doneAt ?? null,
      nextMaintenance: project.maintenance[0].scheduledAt,
    };

    return formattedProject;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};

export const create = async (data: CreateData) => {
  try {
    const project = await projectRepository.create(data);

    if (!project) {
      throw new GeneralError({
        message: `project is ${project}`,
        params: data,
      });
    }

    const formattedProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      url: project.url,
      createdAt: project.createdAt,
      lastMaintenance: null,
      nextMaintenance: project.maintenance[0].scheduledAt,
    };

    return formattedProject;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};

export const update = async (data: UpdateData) => {
  try {
    const project = await projectRepository.update(data);

    if (!project) {
      throw new GeneralError({
        message: `project is ${project}`,
        params: data,
      });
    }

    const formattedProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      url: project.url,
      createdAt: project.createdAt,
      lastMaintenance: project.maintenance?.[1]?.doneAt ?? null,
      nextMaintenance: project.maintenance[0].scheduledAt,
    };

    return formattedProject;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};

export const destroy = async (data: DestroyData) => {
  try {
    const project = await projectRepository.destroy(data);

    return project;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};
