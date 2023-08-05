import express from 'express';

import validator from '@middleware/validator';
import * as projectController from '@controllers/project.controller';
import * as projectValidations from '@validations/project.validation';

const router = express.Router();

router.get('/project', projectController.getAll);

router.get(
  '/project/:id',
  validator(projectValidations.getOne),
  projectController.getOne,
);

router.post(
  '/project',
  validator(projectValidations.post),
  projectController.post,
);

router.put(
  '/project/:id',
  validator(projectValidations.put),
  projectController.put,
);

router.delete(
  '/project/:id',
  validator(projectValidations.remove),
  projectController.remove,
);

router.post(
  '/project/:projectId/maintenance',
  validator(projectValidations.postMaintenance),
  projectController.postMaintenance,
);

router.put(
  '/project/:projectId/maintenance',
  validator(projectValidations.putMaintenance),
  projectController.putMaintenance,
);

router.delete(
  '/project/:projectId/maintenance/',
  validator(projectValidations.removeMaintenance),
  projectController.removeMaintenance,
);

export default router;
