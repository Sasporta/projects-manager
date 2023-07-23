import { randomUUID } from 'crypto';
import { createMocks } from 'node-mocks-http';

import seeder from '@seed/seeder';
import { prisma } from '@lib/prisma';
import { GeneralError, NotFoundError } from '@lib/customErrors';
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

    it('should return response with status code 200 and all projects', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      const mockNext = jest.fn();

      await getAll(req, res, mockNext);

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

    it('should call next function with GeneralError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      const mockNext = jest.fn();

      jest.spyOn(projectController, 'getAll').mockImplementation(() => {
        throw new Error('getAll failed');
      });

      await getAll(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('getAll failed') }),
      );
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

    it('should return response with status code 200 and a project', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        params: { id },
      });

      const mockNext = jest.fn();

      await getOne(req, res, mockNext);

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

    it('should call next function with NotFoundError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        params: { id: '5f531863-3774-4704-af3b-a2f54ec833a5' },
      });

      const mockNext = jest.fn();

      await getOne(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new NotFoundError({
          message: 'project not found',
          params: { project: null },
        }),
      );
    });

    it('should call next function with GeneralError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        params: { id },
      });

      const mockNext = jest.fn();

      jest.spyOn(projectController, 'getOne').mockImplementation(() => {
        throw new Error('getOne failed');
      });

      await getOne(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('getOne failed') }),
      );
    });
  });

  describe('post', () => {
    afterAll(async () => {
      await prisma.project.deleteMany({});
    });

    it('should return response with status code 201 and the new project', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'post-test-name',
          description: 'post-test-description',
          url: 'post-test-url',
        },
      });

      const mockNext = jest.fn();

      await post(req, res, mockNext);

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

    it('should call next function with GeneralError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'post-test-name',
          description: 'post-test-description',
          url: 'post-test-url',
        },
      });

      const mockNext = jest.fn();

      jest.spyOn(projectController, 'post').mockImplementation(() => {
        throw new Error('post failed');
      });

      await post(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('post failed') }),
      );
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

    it('should return response with status code 201 and the updated project ', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        params: { id },
        body: {
          name: 'put-test-name',
          description: 'put-test-description',
          url: 'put-test-url',
        },
      });

      const mockNext = jest.fn();

      await put(req, res, mockNext);

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

    it('should call next function with NotFoundError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        params: { id: '5f531863-3774-4704-af3b-a2f54ec833a5' },
        body: {
          name: 'put-test-name',
          description: 'put-test-description',
          url: 'put-test-url',
        },
      });

      const mockNext = jest.fn();

      await put(req, res, mockNext);

      expect(mockNext.mock.calls[0][0]).toBeInstanceOf(NotFoundError);
    });

    it('should call next function with GeneralError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        params: { id },
        body: {
          name: 'put-test-name',
          description: 'put-test-description',
          url: 'put-test-url',
        },
      });

      const mockNext = jest.fn();

      jest.spyOn(projectController, 'put').mockImplementation(() => {
        throw new Error('put failed');
      });

      await put(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('put failed') }),
      );
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

      const mockNext = jest.fn();

      await remove(req, res, mockNext);

      expect(res._getStatusCode()).toBe(204);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: null,
      });
    });

    it('should call next function with NotFoundError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        params: { id: '5f531863-3774-4704-af3b-a2f54ec833a5' },
      });

      const mockNext = jest.fn();

      await remove(req, res, mockNext);

      expect(mockNext.mock.calls[0][0]).toBeInstanceOf(NotFoundError);
    });

    it('should call next function with GeneralError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        params: { id },
      });

      const mockNext = jest.fn();

      jest.spyOn(projectController, 'remove').mockImplementation(() => {
        throw new Error('remove failed');
      });

      await remove(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('remove failed') }),
      );
    });
  });
});
