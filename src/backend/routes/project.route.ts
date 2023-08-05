import express, { RequestHandler } from 'express';

import validator from '@middleware/validator';
import { ExtendedError, GeneralError } from '@lib/customErrors';
import * as projectController from '@controllers/project.controller';
import * as projectValidations from '@validations/project.validation';

const router = express.Router();

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const projects = await projectController.getAll();

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

    const project = await projectController.getOne(data);

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

    const data = { name, description, url };

    const project = await projectController.post(data);

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

    const project = await projectController.put(data);

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

    await projectController.remove(data);

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

    const data = { projectId, done: done === 'true' };

    const project = await projectController.postMaintenance(data);

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

    const data = { projectId };

    const project = await projectController.putMaintenance(data);

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

    await projectController.removeMaintenance(data);

    return res.status(204).json({ data: null, error: null });
  } catch (e) {
    if (e instanceof ExtendedError) {
      next(e);
    } else if (e instanceof Error) {
      next(new GeneralError({ cause: e }));
    }
  }
};

router.get('/project', getAll);

router.get('/project/:id', validator(projectValidations.getOne), getOne);

router.post('/project', validator(projectValidations.post), post);

router.put('/project/:id', validator(projectValidations.put), put);

router.delete('/project/:id', validator(projectValidations.remove), remove);

router.post(
  '/project/:projectId/maintenance',
  validator(projectValidations.postMaintenance),
  postMaintenance,
);

router.put(
  '/project/:projectId/maintenance',
  validator(projectValidations.putMaintenance),
  putMaintenance,
);

router.delete(
  '/project/:projectId/maintenance/',
  validator(projectValidations.removeMaintenance),
  removeMaintenance,
);

export default router;
