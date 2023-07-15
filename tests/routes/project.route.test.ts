import { randomUUID } from 'crypto';
import { createMocks } from 'node-mocks-http';

import seeder from '@seed/seeder';
import { prisma } from '@lib/prisma';
import * as projectController from '@controllers/project.controller';
import { getAll, getOne, post, put, remove } from '@routes/project.route';

describe('project.route', () => {
  describe('getAll', () => {
    beforeAll(async () => {
      await seeder([
        {
          name: 'getAll-test-name1',
          description: 'getAll-test-description1',
          url: 'getAll-test-url1',
          maintenance: {
            create: {
              hours: 3,
            },
          },
        },
        {
          name: 'getAll-test-name2',
          description: 'getAll-test-description2',
          url: 'getAll-test-url2',
          maintenance: {
            create: {
              hours: 3,
            },
          },
        },
        {
          name: 'getAll-test-name3',
          description: 'getAll-test-description3',
          url: 'getAll-test-url3',
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

    it('should return all projects with status code 200', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await getAll(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        data: [
          {
            id: expect.any(String),
            name: 'getAll-test-name1',
            description: 'getAll-test-description1',
            url: 'getAll-test-url1',
            lastMaintenance: null,
            nextMaintenance: null,
            createdAt: expect.any(String),
          },
          {
            id: expect.any(String),
            name: 'getAll-test-name2',
            description: 'getAll-test-description2',
            url: 'getAll-test-url2',
            lastMaintenance: null,
            nextMaintenance: null,
            createdAt: expect.any(String),
          },
          {
            id: expect.any(String),
            name: 'getAll-test-name3',
            description: 'getAll-test-description3',
            url: 'getAll-test-url3',
            lastMaintenance: null,
            nextMaintenance: null,
            createdAt: expect.any(String),
          },
        ],
        error: null,
      });
    });

    it('should return an error with status code 500', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      jest.spyOn(projectController, 'getAll').mockImplementation(() => {
        throw new Error('getAll failed');
      });

      await getAll(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: 'Internal Server Error',
      });
    });
  });

  describe('getOne', () => {
    const id = randomUUID();

    beforeAll(async () => {
      await seeder([
        {
          id,
          name: 'getOne-test-name',
          description: 'getOne-test-description',
          url: 'getOne-test-url',
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

    it('should return a project with status code 200', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        params: { id },
      });

      await getOne(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        data: {
          id: expect.any(String),
          name: 'getOne-test-name',
          description: 'getOne-test-description',
          url: 'getOne-test-url',
          lastMaintenance: null,
          nextMaintenance: null,
          createdAt: expect.any(String),
        },
        error: null,
      });
    });

    it('should return an error with status code 404', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        params: { id: '5f531863-3774-4704-af3b-a2f54ec833a5' },
      });

      await getOne(req, res);

      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: 'Not Found',
      });
    });

    it('should return an error with status code 500', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        params: { id },
      });

      jest.spyOn(projectController, 'getOne').mockImplementation(() => {
        throw new Error('getOne failed');
      });

      await getOne(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: 'Internal Server Error',
      });
    });
  });

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
          name: 'pre-put-test-name',
          description: 'pre-put-test-description',
          url: 'pre-put-test-url',
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

    it('should return an error with status code 404', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        params: { id: '5f531863-3774-4704-af3b-a2f54ec833a5' },
        body: {
          name: 'put-test-name',
          description: 'put-test-description',
          url: 'put-test-url',
        },
      });

      await put(req, res);

      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: 'Not Found',
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

  describe('remove', () => {
    const id = randomUUID();

    beforeAll(async () => {
      await seeder([
        {
          id,
          name: 'delete-test-name',
          description: 'delete-test-description',
          url: 'delete-test-url',
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

    it('should return empty response status code 204', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        params: { id },
      });

      await remove(req, res);

      expect(res._getStatusCode()).toBe(204);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: null,
      });
    });

    it('should return an error with status code 404', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        params: { id: '5f531863-3774-4704-af3b-a2f54ec833a5' },
      });

      await remove(req, res);

      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: 'Not Found',
      });
    });

    it('should return an error with status code 500', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        params: { id },
      });

      jest.spyOn(projectController, 'remove').mockImplementation(() => {
        throw new Error('remove failed');
      });

      await remove(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: 'Internal Server Error',
      });
    });
  });
});
