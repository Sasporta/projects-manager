import { getFutureSaturdayDate } from '@utils/dates.util';
import { ExtendedError, GeneralError } from '@lib/customErrors.lib';
import * as maintenanceRepository from '@repositories/maintenance.repository';

export const scheduleNextMaintenance = async () => {
  try {
    const maintenances = await maintenanceRepository.getLatest();

    const lastScheduledAt = maintenances?.[0]?.scheduled_at;

    const date = lastScheduledAt ? new Date(lastScheduledAt) : new Date();

    const nextMaintenanceDate = getFutureSaturdayDate(date, 1);

    return nextMaintenanceDate;
  } catch (e) {
    if (e instanceof ExtendedError) {
      throw e;
    } else if (e instanceof Error) {
      throw new GeneralError({ cause: e });
    }
  }
};
