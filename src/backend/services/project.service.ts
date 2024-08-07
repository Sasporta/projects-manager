import * as projectRepository from '@repositories/project.repository';
import * as maintenanceRepository from '@repositories/maintenance.repository';
import {
  ExtendedError,
  GeneralError,
  NotFoundError,
} from '@lib/customErrors.lib';

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

type ScheduleMaintenanceData = {
  projectId: string;
  done: boolean;
  scheduledAt: Date;
};

type PostponeMaintenanceData = { projectId: string; scheduledAt: Date };

type CancelMaintenanceData = { projectId: string };

export const readAll = async () => {
  try {
    const projects = await projectRepository.readAll();

    if (!projects) {
      throw new GeneralError({ message: `projects is ${projects}` });
    }

    const formattedProjects = projects.map(project => {
      const { created_at, maintenance, ...properties } = project;

      const next = maintenance[0]?.scheduled_at?.toLocaleDateString() ?? null;

      const last = maintenance[1]?.done_at?.toLocaleDateString() ?? null;

      return {
        ...properties,
        createdAt: created_at.toLocaleDateString(),
        nextMaintenance: next,
        lastMaintenance: last,
      };
    });

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

    const { created_at, maintenance, ...properties } = project;

    const next = maintenance[0]?.scheduled_at?.toLocaleDateString() ?? null;

    const last = maintenance[1]?.done_at?.toLocaleDateString() ?? null;

    const formattedProject = {
      ...properties,
      createdAt: created_at.toLocaleDateString(),
      nextMaintenance: next,
      lastMaintenance: last,
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

    const { created_at, maintenance, ...properties } = project;

    const next = maintenance[0]?.scheduled_at?.toLocaleDateString() ?? null;

    const formattedProject = {
      ...properties,
      createdAt: created_at.toLocaleDateString(),
      nextMaintenance: next,
      lastMaintenance: null,
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

    const { created_at, maintenance, ...properties } = project;

    const next = maintenance[0]?.scheduled_at?.toLocaleDateString() ?? null;

    const last = maintenance[1]?.done_at?.toLocaleDateString() ?? null;

    const formattedProject = {
      ...properties,
      createdAt: created_at.toLocaleDateString(),
      nextMaintenance: next,
      lastMaintenance: last,
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

export const scheduleMaintenance = async (data: ScheduleMaintenanceData) => {
  try {
    const { projectId, done } = data;

    const project = await projectRepository.readOne({ id: projectId });

    if (!project) {
      throw new NotFoundError({
        message: 'project not found',
        params: { data, project },
      });
    }

    if (done) {
      if (!project.maintenance?.[0]?.scheduled_at) {
        throw new GeneralError({
          message:
            'maintenance can not be updated as done because there is no scheduled maintenance',
          params: { data, project },
        });
      }

      const updateData = { id: project.maintenance[0].id, done };

      const updatedMaintenance = await maintenanceRepository.update(updateData);

      if (!updatedMaintenance) {
        throw new GeneralError({
          message: `maintenance is ${updatedMaintenance}`,
          params: { data, updatedMaintenance },
        });
      }
    }

    if (!done && project.maintenance?.[0]?.done_at === null) {
      throw new GeneralError({
        message:
          'new maintenance can not be schedule, the last maintenance is unfinished',
        params: { data, project },
      });
    }

    const newMaintenance = await maintenanceRepository.create(data);

    if (!newMaintenance) {
      throw new GeneralError({
        message: `maintenance is ${newMaintenance}`,
        params: { data, newMaintenance },
      });
    }

    const updatedProject = await projectRepository.readOne({ id: projectId });

    if (!updatedProject) {
      throw new NotFoundError({
        message: 'project not found',
        params: { data, updatedProject },
      });
    }

    const { created_at, maintenance, ...properties } = updatedProject;

    const next = maintenance[0]?.scheduled_at?.toLocaleDateString() ?? null;

    const last = maintenance[1]?.done_at?.toLocaleDateString() ?? null;

    const formattedProject = {
      ...properties,
      createdAt: created_at.toLocaleDateString(),
      nextMaintenance: next,
      lastMaintenance: last,
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

export const postponeMaintenance = async (data: PostponeMaintenanceData) => {
  try {
    const { projectId, scheduledAt } = data;

    const project = await projectRepository.readOne({ id: projectId });

    if (!project) {
      throw new NotFoundError({
        message: 'project not found',
        params: { project },
      });
    }

    if (!project.maintenance?.[0]?.scheduled_at) {
      throw new GeneralError({
        message:
          'maintenance can not be postponed because there is no scheduled maintenance',
        params: { data, project },
      });
    }

    const updateData = { id: project.maintenance[0].id, scheduledAt };

    const updatedMaintenance = await maintenanceRepository.update(updateData);

    if (!updatedMaintenance) {
      throw new GeneralError({
        message: `maintenance is ${updatedMaintenance}`,
        params: { data, updatedMaintenance },
      });
    }

    const updatedProject = await projectRepository.readOne({ id: projectId });

    if (!updatedProject) {
      throw new NotFoundError({
        message: 'project not found',
        params: { project },
      });
    }

    const { created_at, maintenance, ...properties } = updatedProject;

    const next = maintenance[0]?.scheduled_at?.toLocaleDateString() ?? null;

    const last = maintenance[1]?.done_at?.toLocaleDateString() ?? null;

    const formattedProject = {
      ...properties,
      createdAt: created_at.toLocaleDateString(),
      nextMaintenance: next,
      lastMaintenance: last,
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

export const cancelMaintenance = async (data: CancelMaintenanceData) => {
  try {
    const { projectId } = data;

    const project = await projectRepository.readOne({ id: projectId });

    if (!project) {
      throw new NotFoundError({
        message: 'project not found',
        params: { project },
      });
    }

    if (!project.maintenance?.[0]?.scheduled_at) {
      throw new GeneralError({
        message:
          'maintenance can not be canceled because there is no scheduled maintenance',
        params: { data, project },
      });
    }

    const destroyData = { id: project.maintenance[0].id };

    const deletedMaintenance = await maintenanceRepository.destroy(destroyData);

    if (!deletedMaintenance) {
      throw new GeneralError({
        message: `maintenance is ${deletedMaintenance}`,
        params: { data, deletedMaintenance },
      });
    }

    const updatedProject = await projectRepository.readOne({ id: projectId });

    if (!updatedProject) {
      throw new NotFoundError({
        message: 'project not found',
        params: { project },
      });
    }

    const { created_at, maintenance, ...properties } = updatedProject;

    const next = maintenance[0]?.scheduled_at?.toLocaleDateString() ?? null;

    const last = maintenance[1]?.done_at?.toLocaleDateString() ?? null;

    const formattedProject = {
      ...properties,
      createdAt: created_at.toLocaleDateString(),
      nextMaintenance: next,
      lastMaintenance: last,
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
