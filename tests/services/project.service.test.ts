import * as projectService from '@/backend/services/project.service';
import * as projectRepository from '@/backend/repositories/project.repository';

describe('project.service', () => {
  describe('getAll', () => {
    it('should return all projects', async () => {
      const projects = await projectService.getAll();

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
      jest.spyOn(projectRepository, 'getAll').mockImplementation(() => {
        throw new Error('getAll failed');
      });

      expect(projectService.getAll()).rejects.toThrow(
        'project.service.getAll, msg: getAll failed',
      );
    });
  });
});
