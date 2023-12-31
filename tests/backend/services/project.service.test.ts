import seeder from '@seed/seeder';
import { prisma } from '@lib/prisma.lib';
import { GeneralError } from '@lib/customErrors.lib';
import * as projectService from '@services/project.service';
import * as projectRepository from '@repositories/project.repository';

describe('project.service', () => {
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
      await prisma.project.deleteMany({});
    });

    it('should return all projects', async () => {
      const projects = await projectService.readAll();

      expect(projects).toEqual([
        {
          id: expect.any(String),
          name: 'getAll-test-name1',
          description: 'getAll-test-description1',
          url: 'getAll-test-url1',
          lastMaintenance: null,
          nextMaintenance: expect.any(Date),
          createdAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          name: 'getAll-test-name2',
          description: 'getAll-test-description2',
          url: 'getAll-test-url2',
          lastMaintenance: null,
          nextMaintenance: expect.any(Date),
          createdAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          name: 'getAll-test-name3',
          description: 'getAll-test-description3',
          url: 'getAll-test-url3',
          lastMaintenance: null,
          nextMaintenance: expect.any(Date),
          createdAt: expect.any(Date),
        },
      ]);
    });

    it('should throw a GeneralError', async () => {
      jest.spyOn(projectRepository, 'readAll').mockImplementation(() => {
        throw new Error('readAll failed');
      });

      expect(projectService.readAll()).rejects.toThrow(GeneralError);
    });
  });
});
