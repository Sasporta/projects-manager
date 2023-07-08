import express from 'express';

import validator from '../middleware/validator';
import { getOneValidation } from '../validations/project.validation';
import * as projectController from '../controllers/project.controller';

const router = express.Router();

router.get('/project', async (req, res) => {
  try {
    const projects = await projectController.getAll();

    return res.json({ data: projects, error: null });
  } catch (e) {
    // TODO: log error

    // TODO: create a custom error handler
    return res.status(500).json({ data: null, error: 'Internal Server Error' });
  }
});

router.get('/project/:id', validator(getOneValidation), async (req, res) => {
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
});

export default router;
