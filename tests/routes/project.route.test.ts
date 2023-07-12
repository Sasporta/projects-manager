import { randomUUID } from 'crypto';
import { createMocks } from 'node-mocks-http';

import { prisma } from '@/backend/lib/prisma';
import { seeder } from '@/backend/prisma/seed/seeder';
import { post, put } from '@/backend/routes/project.route';
import * as projectController from '@/backend/controllers/project.controller';

describe('project.route', () => {
  describe('post', () => {
    afterAll(async () => {
      await prisma.project.deleteMany({});
    });

    it('should return the new project with status code 201', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'post-test-name',
          description: 'post-test-description',
          url: 'post-test-url',
        },
      });

      await post(req, res);

      expect(res._getStatusCode()).toBe(201);
      expect(JSON.parse(res._getData())).toEqual({
        data: {
          id: expect.any(String),
          name: 'post-test-name',
          description: 'post-test-description',
          url: 'post-test-url',
          lastMaintenance: null,
          nextMaintenance: expect.any(String),
          createdAt: expect.any(String),
        },
        error: null,
      });
    });

    it('should return an error with status code 500', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'post-test-name',
          description: 'post-test-description',
          url: 'post-test-url',
        },
      });

      jest.spyOn(projectController, 'post').mockImplementation(() => {
        throw new Error('post failed');
      });

      await post(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: 'Internal Server Error',
      });
    });
  });

  describe('put', () => {
    const id = randomUUID();

    beforeAll(async () => {
      await seeder([
        {
          id,
          name: 'pre-put-name',
          description: 'pre-put-description',
          url: 'pre-put-url',
          nextMaintenance: new Date(),
          maintenance: {
            create: {
              hours: 3,
            },
          },
        },
      ]);
    });

    afterAll(async () => {
      await prisma.project.deleteMany({});
    });

    it('should return the updated project with status code 201', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        params: { id },
        body: {
          name: 'put-test-name',
          description: 'put-test-description',
          url: 'put-test-url',
        },
      });

      await put(req, res);

      expect(res._getStatusCode()).toBe(201);
      expect(JSON.parse(res._getData())).toEqual({
        data: {
          id: expect.any(String),
          name: 'put-test-name',
          description: 'put-test-description',
          url: 'put-test-url',
          lastMaintenance: null,
          nextMaintenance: expect.any(String),
          createdAt: expect.any(String),
        },
        error: null,
      });
    });

    it('should return an error with status code 500', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        params: { id },
        body: {
          name: 'put-test-name',
          description: 'put-test-description',
          url: 'put-test-url',
        },
      });

      jest.spyOn(projectController, 'put').mockImplementation(() => {
        throw new Error('put failed');
      });

      await put(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: 'Internal Server Error',
      });
    });
  });
});
