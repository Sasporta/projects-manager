import { MODAL_TYPE } from '#fe/consts';
import { setModal } from '#slices/modal';
import { AppDispatch } from '#fe/redux/store';
import { editProject } from '#slices/projectList';
import * as maintenanceActions from '#utils/maintenanceActions.utils';

export const getButtons = (dispatch: AppDispatch, id: string) => [
  {
    id: 'schedule',
    tooltip: 'Schedule maintenance',
    icon: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/661fe4cc757ecae1e5f70860_icons8-schedule-30.png',
    action: async () => {
      const { project, isError } = await maintenanceActions.schedule(id, false);

      if (isError) {
        dispatch(setModal({ type: MODAL_TYPE.error, project: null }));
      } else {
        dispatch(editProject(project));
      }
    },
  },
  {
    id: 'done',
    tooltip: 'Mark as done',
    icon: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/6591867812e347d4da6810cc_icons8-schedule.png',
    action: async () => {
      const { project, isError } = await maintenanceActions.schedule(id, true);

      if (isError) {
        dispatch(setModal({ type: MODAL_TYPE.error, project: null }));
      } else {
        dispatch(editProject(project));
      }
    },
  },
  {
    id: 'postpone',
    tooltip: 'Postpone maintenance',
    icon: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/659186b44d6df02a5fd522ef_icons8-rescheduling.png',
    action: async () => {
      const { project, isError } = await maintenanceActions.postpone(id);

      if (isError) {
        dispatch(setModal({ type: MODAL_TYPE.error, project: null }));
      } else {
        dispatch(editProject(project));
      }
    },
  },
  {
    id: 'cancel',
    tooltip: 'Cancel maintenance',
    icon: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/659186c34d6df02a5fd52957_icons8-cancel-schedule.png',
    action: async () => {
      const { project, isError } = await maintenanceActions.cancel(id);

      if (isError) {
        dispatch(setModal({ type: MODAL_TYPE.error, project: null }));
      } else {
        dispatch(editProject(project));
      }
    },
  },
];
