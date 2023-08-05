import { RequestHandler } from 'express';

import * as scheduler from '@services/scheduler.service';
import * as projectService from '@services/project.service';
import { ExtendedError, GeneralError } from '@lib/customErrors';

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const projects = await projectService.readAll();

    return res.json({ data: projects, error: null });
  } catch (e) {
    if (e instanceof ExtendedError) {
      next(e);
    } else if (e instanceof Error) {
      next(new GeneralError({ cause: e }));
    }
  }
};

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = { id };

    const project = await projectService.readOne(data);

    return res.json({ data: project, error: null });
  } catch (e) {
    if (e instanceof ExtendedError) {
      next(e);
    } else if (e instanceof Error) {
      next(new GeneralError({ cause: e }));
    }
  }
};

export const post: RequestHandler = async (req, res, next) => {
  try {
    const { name, description, url } = req.body;

    const scheduledAt = scheduler.scheduleNextMaintenance();

    const data = { name, description, url, scheduledAt };

    const project = await projectService.create(data);

    return res.status(201).json({ data: project, error: null });
  } catch (e) {
    if (e instanceof ExtendedError) {
      next(e);
    } else if (e instanceof Error) {
      next(new GeneralError({ cause: e }));
    }
  }
};

export const put: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, description, url } = req.body;

    const data = { id, name, description, url };

    const project = await projectService.update(data);

    return res.status(201).json({ data: project, error: null });
  } catch (e) {
    if (e instanceof ExtendedError) {
      next(e);
    } else if (e instanceof Error) {
      next(new GeneralError({ cause: e }));
    }
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = { id };

    await projectService.destroy(data);

    return res.status(204).json({ data: null, error: null });
  } catch (e) {
    if (e instanceof ExtendedError) {
      next(e);
    } else if (e instanceof Error) {
      next(new GeneralError({ cause: e }));
    }
  }
};

export const postMaintenance: RequestHandler = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const { done } = req.query;

    const scheduledAt = scheduler.scheduleNextMaintenance();

    const data = { projectId, done: done === 'true', scheduledAt };

    const project = await projectService.scheduleMaintenance(data);

    return res.status(201).json({ data: project, error: null });
  } catch (e) {
    if (e instanceof ExtendedError) {
      next(e);
    } else if (e instanceof Error) {
      next(new GeneralError({ cause: e }));
    }
  }
};

export const putMaintenance: RequestHandler = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const scheduledAt = scheduler.scheduleNextMaintenance();

    const data = { projectId, scheduledAt };

    const project = await projectService.postponeMaintenance(data);

    return res.status(201).json({ data: project, error: null });
  } catch (e) {
    if (e instanceof ExtendedError) {
      next(e);
    } else if (e instanceof Error) {
      next(new GeneralError({ cause: e }));
    }
  }
};

export const removeMaintenance: RequestHandler = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const data = { projectId };

    await projectService.cancelMaintenance(data);

    return res.status(204).json({ data: null, error: null });
  } catch (e) {
    if (e instanceof ExtendedError) {
      next(e);
    } else if (e instanceof Error) {
      next(new GeneralError({ cause: e }));
    }
  }
};
