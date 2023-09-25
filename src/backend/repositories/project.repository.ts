import { Prisma } from '@prisma/client';

import { prisma } from '@lib/prisma.lib';
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

export const readAll = async () => {
  try {
    const findManyData = {
      select: {
        id: true,
        name: true,
        description: true,
        url: true,
        created_at: true,
        maintenance: {
          select: {
            id: true,
            hours: true,
            scheduled_at: true,
            done_at: true,
          },
          take: 2,
          orderBy: {
            scheduled_at: Prisma.SortOrder.desc,
          },
        },
      },
    };

    // TODO: Add pagination and limit
    const projects = await prisma.project.findMany(findManyData);

    return projects;
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
    const { id } = data;

    const findUniqueData = {
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        url: true,
        created_at: true,
        maintenance: {
          select: {
            id: true,
            hours: true,
            scheduled_at: true,
            done_at: true,
          },
          take: 2,
          orderBy: {
            scheduled_at: Prisma.SortOrder.desc,
          },
        },
      },
    };

    const project = await prisma.project.findUnique(findUniqueData);

    if (!project) {
      throw new NotFoundError({
        message: 'project not found',
        params: { project },
      });
    }

    return project;
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
    const { name, description, url, scheduledAt } = data;

    const createData = {
      data: {
        name,
        description,
        url,
        maintenance: {
          create: {
            scheduled_at: scheduledAt,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        url: true,
        created_at: true,
        maintenance: {
          select: {
            id: true,
            hours: true,
            scheduled_at: true,
            done_at: true,
          },
        },
      },
    };

    const project = await prisma.project.create(createData);

    return project;
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
    const { id, name, description, url } = data;

    const updateData = {
      where: { id },
      data: {
        name,
        description,
        url,
      },
      select: {
        id: true,
        name: true,
        description: true,
        url: true,
        created_at: true,
        maintenance: {
          select: {
            id: true,
            hours: true,
            scheduled_at: true,
            done_at: true,
          },
          take: 2,
          orderBy: {
            scheduled_at: Prisma.SortOrder.desc,
          },
        },
      },
    };

    const project = await prisma.project.update(updateData);

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

export const destroy = async (data: DestroyData) => {
  try {
    const { id } = data;

    const deleteData = {
      where: { id },
    };

    const project = await prisma.project.delete(deleteData);

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
