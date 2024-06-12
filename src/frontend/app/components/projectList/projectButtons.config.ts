import { MODAL_TYPE } from '#fe/consts';
import { setModal } from '#slices/modal';
import { ProjectType } from '#types/project';
import { AppDispatch } from '#fe/redux/store';

type GetButtonsParams = {
  url: string;
  project: ProjectType;
  dispatch: AppDispatch;
};

export const getButtons = (params: GetButtonsParams) => [
  {
    id: 'open',
    tooltip: 'Open in new tab',
    icon: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886bf9374c31b5a1b5562b_icons8-new-tab-64.png',
    action: () => {
      const { url } = params;

      window.open(url, '_blank');
    },
  },
  {
    id: 'edit',
    tooltip: 'Edit project',
    icon: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886a92a3922c655f012862_icons8-edit-icon.png',
    action: () => {
      const { dispatch, project } = params;

      dispatch(setModal({ type: MODAL_TYPE.edit, project }));
    },
  },
  {
    id: 'delete',
    tooltip: 'Delete project',
    icon: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886a1837cf11c6fda5e696_icons8-recycle-bin-icon.png',
    action: () => {
      const { dispatch, project } = params;

      dispatch(setModal({ type: MODAL_TYPE.remove, project }));
    },
  },
];
