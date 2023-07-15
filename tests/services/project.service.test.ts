import seeder from '@seed/seeder';
import { prisma } from '@lib/prisma';
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

    it('should return all projects', async () => {
      const projects = await projectService.readAll();

      expect(projects).toEqual([
        {
          id: expect.any(String),
          name: 'getAll-test-name1',
          description: 'getAll-test-description1',
          url: 'getAll-test-url1',
          lastMaintenance: null,
          nextMaintenance: null,
          createdAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          name: 'getAll-test-name2',
          description: 'getAll-test-description2',
          url: 'getAll-test-url2',
          lastMaintenance: null,
          nextMaintenance: null,
          createdAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          name: 'getAll-test-name3',
          description: 'getAll-test-description3',
          url: 'getAll-test-url3',
          lastMaintenance: null,
          nextMaintenance: null,
          createdAt: expect.any(Date),
        },
      ]);
    });

    it('should throw an error', async () => {
      jest.spyOn(projectRepository, 'readAll').mockImplementation(() => {
        throw new Error('readAll failed');
      });

      expect(projectService.readAll()).rejects.toThrow(
        'project.service.readAll, msg: readAll failed',
      );
    });
  });
});
