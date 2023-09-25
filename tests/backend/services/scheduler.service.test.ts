import { prisma } from '@lib/prisma';
import { GeneralError } from '@lib/customErrors';
import * as schedulerService from '@services/scheduler.service';
import * as maintenanceRepository from '@repositories/maintenance.repository';

describe('scheduler.service', () => {
  describe('scheduleNextMaintenance', () => {
    beforeAll(() => {
      jest.useFakeTimers();

      jest.setSystemTime(new Date('2023-09-25')); // its a monday
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return the next Saturday date', async () => {
      const scheduledAt = await schedulerService.scheduleNextMaintenance();

      expect(scheduledAt).toEqual(new Date('2023-10-07'));
    });

    it('should return the next Saturday after the last maintenance date', async () => {
      await prisma.project.create({
        data: {
          name: 'scheduler-test-name',
          description: 'scheduler-test-description',
          url: 'scheduler-test-url',
          maintenance: {
            create: {
              scheduled_at: new Date('2023-10-07'),
            },
          },
        },
      });

      const scheduledAt = await schedulerService.scheduleNextMaintenance();

      expect(scheduledAt).toEqual(new Date('2023-10-14'));

      await prisma.project.deleteMany({});
    });

    it('should throw a GeneralError', async () => {
      jest.spyOn(maintenanceRepository, 'getLatest').mockImplementation(() => {
        throw new Error('getLatest failed');
      });

      expect(schedulerService.scheduleNextMaintenance()).rejects.toThrow(
        GeneralError,
      );
    });
  });
});
