import { randomUUID } from 'crypto';
import { createMocks } from 'node-mocks-http';

import seeder from '@seed/seeder';
import { prisma } from '@lib/prisma';
import * as projectController from '@controllers/project.controller';
import { GeneralError, NotFoundError } from '@lib/customErrors';
import * as projectService from '@services/project.service';

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
              scheduled_at: new Date(),
            },
          },
        },
        {
          name: 'getAll-test-name2',
          description: 'getAll-test-description2',
          url: 'getAll-test-url2',
          maintenance: {
            create: {
              scheduled_at: new Date(),
            },
          },
        },
        {
          name: 'getAll-test-name3',
          description: 'getAll-test-description3',
          url: 'getAll-test-url3',
          maintenance: {
            create: {
              scheduled_at: new Date(),
            },
          },
        },
      ]);
    });

    afterAll(async () => {
      await prisma.maintenance.deleteMany({});
      await prisma.project.deleteMany({});
    });

    it('should return response with status code 200 and all projects', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      const mockNext = jest.fn();

      await projectController.getAll(req, res, mockNext);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        data: [
          {
            id: expect.any(String),
            name: 'getAll-test-name1',
            description: 'getAll-test-description1',
            url: 'getAll-test-url1',
            lastMaintenance: null,
            nextMaintenance: expect.any(String),
            createdAt: expect.any(String),
          },
          {
            id: expect.any(String),
            name: 'getAll-test-name2',
            description: 'getAll-test-description2',
            url: 'getAll-test-url2',
            lastMaintenance: null,
            nextMaintenance: expect.any(String),
            createdAt: expect.any(String),
          },
          {
            id: expect.any(String),
            name: 'getAll-test-name3',
            description: 'getAll-test-description3',
            url: 'getAll-test-url3',
            lastMaintenance: null,
            nextMaintenance: expect.any(String),
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

      jest.spyOn(projectService, 'readAll').mockImplementation(() => {
        throw new Error('readAll failed');
      });

      await projectController.getAll(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('readAll failed') }),
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
              scheduled_at: new Date(),
            },
          },
        },
      ]);
    });

    afterAll(async () => {
      await prisma.maintenance.deleteMany({});
      await prisma.project.deleteMany({});
    });

    it('should return response with status code 200 and a project', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        params: { id },
      });

      const mockNext = jest.fn();

      await projectController.getOne(req, res, mockNext);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        data: {
          id: expect.any(String),
          name: 'getOne-test-name',
          description: 'getOne-test-description',
          url: 'getOne-test-url',
          lastMaintenance: null,
          nextMaintenance: expect.any(String),
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

      await projectController.getOne(req, res, mockNext);

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

      jest.spyOn(projectService, 'readOne').mockImplementation(() => {
        throw new Error('readOne failed');
      });

      await projectController.getOne(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('readOne failed') }),
      );
    });
  });

  describe('post', () => {
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

      await projectController.post(req, res, mockNext);

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

      jest.spyOn(projectService, 'create').mockImplementation(() => {
        throw new Error('create failed');
      });

      await projectController.post(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('create failed') }),
      );
    });
  });

  describe('putMaintenance', () => {
    const id = randomUUID();

    beforeAll(async () => {
      await seeder([
        {
          id,
          name: 'pre-put-test-name',
          description: 'pre-put-test-description',
          url: 'pre-put-test-url',
          maintenance: {
            create: {
              scheduled_at: new Date(),
            },
          },
        },
      ]);
    });

    afterAll(async () => {
      await prisma.maintenance.deleteMany({});
      await prisma.project.deleteMany({});
    });

    it('should return response with status code 201 and the updated project', async () => {
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

      await projectController.put(req, res, mockNext);

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

      await projectController.put(req, res, mockNext);

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

      jest.spyOn(projectService, 'update').mockImplementation(() => {
        throw new Error('update failed');
      });

      await projectController.put(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('update failed') }),
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
              scheduled_at: new Date(),
            },
          },
        },
      ]);
    });

    afterAll(async () => {
      await prisma.maintenance.deleteMany({});
      await prisma.project.deleteMany({});
    });

    it('should return empty response status code 204', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        params: { id },
      });

      const mockNext = jest.fn();

      await projectController.remove(req, res, mockNext);

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

      await projectController.remove(req, res, mockNext);

      expect(mockNext.mock.calls[0][0]).toBeInstanceOf(NotFoundError);
    });

    it('should call next function with GeneralError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        params: { id },
      });

      const mockNext = jest.fn();

      jest.spyOn(projectService, 'destroy').mockImplementation(() => {
        throw new Error('destroy failed');
      });

      await projectController.remove(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('destroy failed') }),
      );
    });
  });

  describe('postMaintenance', () => {
    const doneMaintenanceId = randomUUID();

    const doneAt = new Date();

    const activeMaintenanceId1 = randomUUID();

    const activeMaintenanceId2 = randomUUID();

    const noMaintenanceProjectId = randomUUID();

    beforeAll(async () => {
      await seeder([
        {
          id: doneMaintenanceId,
          name: 'postMaintenance-test-name1',
          description: 'postDoneMaintenance-test-description',
          url: 'postDoneMaintenance-test-url',
          maintenance: {
            create: {
              done_at: doneAt,
              scheduled_at: new Date(),
            },
          },
        },
        {
          id: activeMaintenanceId1,
          name: 'postMaintenance-test-name2',
          description: 'postActiveMaintenance-test-description',
          url: 'postActiveMaintenance-test-url',
          maintenance: {
            create: {
              scheduled_at: new Date(),
            },
          },
        },
        {
          id: activeMaintenanceId2,
          name: 'postMaintenance-test-name3',
          description: 'postActiveMaintenance-test-description',
          url: 'postActiveMaintenance-test-url',
          maintenance: {
            create: {
              scheduled_at: new Date(),
            },
          },
        },
        {
          id: noMaintenanceProjectId,
          name: 'without-maintenance-test-name',
          description: 'putMaintenance-without-maintenance-test-description',
          url: 'putMaintenance-without-maintenance-test-url',
        },
      ]);
    });

    afterAll(async () => {
      await prisma.maintenance.deleteMany({});
      await prisma.project.deleteMany({});
    });

    it('should return response with status code 201 and the project with new maintenance', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        params: { projectId: doneMaintenanceId },
        query: { done: 'false' },
      });

      const mockNext = jest.fn();

      await projectController.postMaintenance(req, res, mockNext);

      expect(res._getStatusCode()).toBe(201);
      expect(JSON.parse(res._getData())).toEqual({
        data: {
          id: expect.any(String),
          name: 'postMaintenance-test-name1',
          description: 'postDoneMaintenance-test-description',
          url: 'postDoneMaintenance-test-url',
          lastMaintenance: doneAt.toISOString(),
          nextMaintenance: expect.any(String),
          createdAt: expect.any(String),
        },
        error: null,
      });
    });

    it('should return response with status code 201, update current maintenance as done and return the project with new maintenance', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        params: { projectId: activeMaintenanceId2 },
        query: { done: 'true' },
      });

      const mockNext = jest.fn();

      await projectController.postMaintenance(req, res, mockNext);

      expect(res._getStatusCode()).toBe(201);
      expect(JSON.parse(res._getData())).toEqual({
        data: {
          id: expect.any(String),
          name: 'postMaintenance-test-name3',
          description: 'postActiveMaintenance-test-description',
          url: 'postActiveMaintenance-test-url',
          lastMaintenance: expect.any(String),
          nextMaintenance: expect.any(String),
          createdAt: expect.any(String),
        },
        error: null,
      });
    });

    it('should call next function with NotFoundError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        params: { projectId: '5f531863-3774-4704-af3b-a2f54ec833a5' },
        query: { done: 'false' },
      });

      const mockNext = jest.fn();

      await projectController.postMaintenance(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new NotFoundError({
          message: 'project not found',
          params: { project: null },
        }),
      );
    });

    it("should call next function with GeneralError when the project's last maintenance is unfinished", async () => {
      const { req, res } = createMocks({
        method: 'POST',
        params: { projectId: activeMaintenanceId1 },
        query: { done: 'false' },
      });

      const mockNext = jest.fn();

      await projectController.postMaintenance(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({
          cause: new Error(
            'new maintenance can not be schedule, the last maintenance is unfinished',
          ),
        }),
      );
    });

    it('should call next function with GeneralError when the project does not have maintenance scheduled', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        params: { projectId: noMaintenanceProjectId },
        query: { done: 'true' },
      });

      const mockNext = jest.fn();

      await projectController.postMaintenance(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({
          cause: new Error(
            'maintenance can not be updated as done because there is no scheduled maintenance',
          ),
        }),
      );
    });

    it('should call next function with GeneralError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        params: { projectId: doneMaintenanceId },
        query: { done: 'false' },
      });

      const mockNext = jest.fn();

      jest
        .spyOn(projectService, 'scheduleMaintenance')
        .mockImplementation(() => {
          throw new Error('scheduleMaintenance failed');
        });

      await projectController.postMaintenance(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('scheduleMaintenance failed') }),
      );
    });
  });

  describe('putMaintenance', () => {
    const projectId = randomUUID();

    const noMaintenanceProjectId = randomUUID();

    const oldMaintenanceDate = new Date();

    beforeAll(async () => {
      await seeder([
        {
          id: projectId,
          name: 'pre-putMaintenance-test-name',
          description: 'pre-putMaintenance-test-description',
          url: 'pre-putMaintenance-test-url',
          maintenance: {
            create: {
              scheduled_at: oldMaintenanceDate,
            },
          },
        },
        {
          id: noMaintenanceProjectId,
          name: 'without-maintenance-test-name',
          description: 'putMaintenance-without-maintenance-test-description',
          url: 'putMaintenance-without-maintenance-test-url',
        },
      ]);
    });

    afterAll(async () => {
      await prisma.maintenance.deleteMany({});
      await prisma.project.deleteMany({});
    });

    it('should return response with status code 201 and the project with updated maintenance', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        params: { projectId },
      });

      const mockNext = jest.fn();

      await projectController.putMaintenance(req, res, mockNext);

      const parsedRes = JSON.parse(res._getData());

      expect(res._getStatusCode()).toBe(201);
      expect(parsedRes).toEqual({
        data: {
          id: expect.any(String),
          name: 'pre-putMaintenance-test-name',
          description: 'pre-putMaintenance-test-description',
          url: 'pre-putMaintenance-test-url',
          lastMaintenance: null,
          nextMaintenance: expect.any(String),
          createdAt: expect.any(String),
        },
        error: null,
      });

      const newMaintenanceDate = new Date(parsedRes.data.nextMaintenance);

      const diff = newMaintenanceDate.getTime() - oldMaintenanceDate.getTime();

      expect(diff).toBeGreaterThan(0);
    });

    it('should call next function with NotFoundError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        params: { projectId: '5f531863-3774-4704-af3b-a2f54ec833a5' },
      });

      const mockNext = jest.fn();

      await projectController.putMaintenance(req, res, mockNext);

      expect(mockNext.mock.calls[0][0]).toBeInstanceOf(NotFoundError);
    });

    it('should call next function with GeneralError when the project does not have maintenance scheduled', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        params: { projectId: noMaintenanceProjectId },
      });

      const mockNext = jest.fn();

      await projectController.putMaintenance(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({
          cause: new Error(
            'maintenance can not be postponed because there is no scheduled maintenance',
          ),
        }),
      );
    });

    it('should call next function with GeneralError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        params: { projectId },
      });

      const mockNext = jest.fn();

      jest
        .spyOn(projectService, 'postponeMaintenance')
        .mockImplementation(() => {
          throw new Error('postponeMaintenance failed');
        });

      await projectController.putMaintenance(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('postponeMaintenance failed') }),
      );
    });
  });

  describe('removeMaintenance', () => {
    const projectId = randomUUID();

    beforeAll(async () => {
      await seeder([
        {
          id: projectId,
          name: 'removeMaintenance-test-name',
          description: 'removeMaintenance-test-description',
          url: 'removeMaintenance-test-url',
          maintenance: {
            create: {
              scheduled_at: new Date(),
            },
          },
        },
      ]);
    });

    afterAll(async () => {
      await prisma.maintenance.deleteMany({});
      await prisma.project.deleteMany({});
    });

    it('should return empty response status code 204', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        params: { projectId },
      });

      const mockNext = jest.fn();

      await projectController.removeMaintenance(req, res, mockNext);

      expect(res._getStatusCode()).toBe(204);
      expect(JSON.parse(res._getData())).toEqual({
        data: null,
        error: null,
      });
    });

    it('should call next function with NotFoundError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        params: { projectId: '5f531863-3774-4704-af3b-a2f54ec833a5' },
      });

      const mockNext = jest.fn();

      await projectController.removeMaintenance(req, res, mockNext);

      expect(mockNext.mock.calls[0][0]).toBeInstanceOf(NotFoundError);
    });

    it('should call next function with GeneralError when error occur', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        params: { projectId },
      });

      const mockNext = jest.fn();

      jest.spyOn(projectService, 'cancelMaintenance').mockImplementation(() => {
        throw new Error('cancelMaintenance failed');
      });

      await projectController.removeMaintenance(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new GeneralError({ cause: new Error('cancelMaintenance failed') }),
      );
    });
  });
});
