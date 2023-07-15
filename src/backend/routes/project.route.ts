import express from 'express';
import { Request, Response } from 'express';

import validator from '@middleware/validator';
import * as projectController from '@controllers/project.controller';
import * as projectValidations from '@validations/project.validation';

const router = express.Router();

export const getAll = async (req: Request, res: Response) => {
  try {
    const projects = await projectController.getAll();

    return res.json({ data: projects, error: null });
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      // TODO: replace with logger
      console.error(`project.route.getAll, ${args}`);
    }

    // TODO: create a custom error handler
    return res.status(500).json({ data: null, error: 'Internal Server Error' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = { id };

    const project = await projectController.getOne(data);

    if (!project) {
      return res.status(404).json({ data: null, error: 'Not Found' });
    }

    return res.json({ data: project, error: null });
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      // TODO: replace with logger
      console.error(`project.route.getOne, ${args}`);
    }

    // TODO: create a custom error handler
    return res.status(500).json({ data: null, error: 'Internal Server Error' });
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const { name, description, url } = req.body;

    const data = { name, description, url };

    const project = await projectController.post(data);

    return res.status(201).json({ data: project, error: null });
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      // TODO: replace with logger
      console.error(`project.route.post, ${args}`);
    }

    // TODO: create a custom error handler
    return res.status(500).json({ data: null, error: 'Internal Server Error' });
  }
};

export const put = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, description, url } = req.body;

    const data = { id, name, description, url };

    const project = await projectController.put(data);

    if (!project) {
      return res.status(404).json({ data: null, error: 'Not Found' });
    }

    return res.status(201).json({ data: project, error: null });
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      // TODO: replace with logger
      console.error(`project.route.put, ${args}`);
    }

    // TODO: create a custom error handler
    return res.status(500).json({ data: null, error: 'Internal Server Error' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = { id };

    const project = await projectController.remove(data);

    if (!project) {
      return res.status(404).json({ data: null, error: 'Not Found' });
    }

    return res.status(204).json({ data: null, error: null });
  } catch (e) {
    if (e instanceof Error) {
      const args = `msg: ${e.message}`;

      // TODO: replace with logger
      console.error(`project.route.remove, ${args}`);
    }

    // TODO: create a custom error handler
    return res.status(500).json({ data: null, error: 'Internal Server Error' });
  }
};

router.get('/project', getAll);

router.get('/project/:id', validator(projectValidations.getOne), getOne);

router.post('/project', validator(projectValidations.post), post);

router.put('/project/:id', validator(projectValidations.put), put);

router.delete('/project/:id', validator(projectValidations.remove), remove);

export default router;
