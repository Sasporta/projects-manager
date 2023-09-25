import { Prisma } from '@prisma/client';

import { prisma } from '@lib/prisma';
import { ExtendedError, GeneralError, NotFoundError } from '@lib/customErrors';

type CreateData = { projectId: string; scheduledAt: Date };

type UpdateData = { id: string; scheduledAt?: Date; done?: boolean };

type DestroyData = { id: string };

export const getLatest = async () => {
  try {
    const getLatestData = {
      orderBy: {
        scheduled_at: Prisma.SortOrder.desc,
      },
      select: {
        id: true,
        hours: true,
        scheduled_at: true,
        done_at: true,
        take: 1,
      },
    };

    const maintenance = await prisma.maintenance.findMany(getLatestData);

    return maintenance;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ cause: e });
    }
  }
};

export const create = async (data: CreateData) => {
  try {
    const { projectId, scheduledAt } = data;

    const createData = {
      data: {
        project_id: projectId,
        scheduled_at: scheduledAt,
      },
      select: {
        id: true,
        hours: true,
        scheduled_at: true,
        done_at: true,
      },
    };

    const maintenance = await prisma.maintenance.create(createData);

    return maintenance;
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
    const { id, scheduledAt, done } = data;

    const updateFields: { scheduled_at?: Date; done_at?: Date } = {};

    scheduledAt && (updateFields.scheduled_at = scheduledAt);

    done && (updateFields.done_at = new Date());

    const updateData = {
      where: { id },
      data: updateFields,
      select: {
        id: true,
        hours: true,
        scheduled_at: true,
        done_at: true,
      },
    };

    const maintenance = await prisma.maintenance.update(updateData);

    return maintenance;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        throw new NotFoundError({ message: e.message, params: data });
      }
    } else if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};

export const destroy = async (data: DestroyData) => {
  try {
    const { id } = data;

    const deleteData = {
      where: { id },
    };

    const project = await prisma.maintenance.delete(deleteData);

    return project;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        throw new NotFoundError({ message: e.message, params: data });
      }
    } else if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ params: data, cause: e });
    }
  }
};
