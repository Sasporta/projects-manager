import * as projectService from '@/backend/services/project.service';
import * as projectRepository from '@/backend/repositories/project.repository';

describe('project.service', () => {
  describe('getAll', () => {
    it('should return all projects', async () => {
      const projects = await projectService.readAll();

      expect(projects).toEqual([
        {
          id: expect.any(String),
          name: 'projects-manager',
          url: 'https://projects-manager.com',
          nextMaintenance: null,
        },
        {
          id: expect.any(String),
          name: 'backlog',
          url: 'https://backlog.com',
          nextMaintenance: null,
        },
        {
          id: expect.any(String),
          name: 'portfolio',
          url: 'https://portfolio.com',
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
