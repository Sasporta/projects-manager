import express from 'express';
import { Request, Response } from 'express';

import validator from '../middleware/validator';
import { getOneValidation } from '../validations/project.validation';
import * as projectController from '../controllers/project.controller';

const router = express.Router();

// TODO: delete if not needed
export const getAll = async (req: Request, res: Response) => {
  try {
    const projects = await projectController.getAll();

    return res.json({ data: projects, error: null });
  } catch (e) {
    // TODO: log error

    // TODO: create a custom error handler
    return res.status(500).json({ data: null, error: 'Internal Server Error' });
  }
};

// TODO: delete if not needed
export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = { id };

    const project = await projectController.getOne(data);

    return res.json({ data: project, error: null });
  } catch (e) {
    // TODO: log error

    // TODO: create a custom error handler
    return res.status(500).json({ data: null, error: 'Internal Server Error' });
  }
};

router.get('/project', getAll);

router.get('/project/:id', validator(getOneValidation), getOne);

export default router;
