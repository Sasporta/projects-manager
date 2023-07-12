import { prisma } from '@/backend/lib/prisma';
import { seeder } from '@/backend/prisma/seed/seeder';
import * as projectService from '@/backend/services/project.service';
import * as projectRepository from '@/backend/repositories/project.repository';

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
          url: 'getAll-test-url1',
          nextMaintenance: null,
        },
        {
          id: expect.any(String),
          name: 'getAll-test-name2',
          url: 'getAll-test-url2',
          nextMaintenance: null,
        },
        {
          id: expect.any(String),
          name: 'getAll-test-name3',
          url: 'getAll-test-url3',
          nextMaintenance: null,
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
