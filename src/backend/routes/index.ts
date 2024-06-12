import express from 'express';

import projectRoutes from './project.route';

const router = express.Router();

router.use('/api/v1', projectRoutes);

export default router;
