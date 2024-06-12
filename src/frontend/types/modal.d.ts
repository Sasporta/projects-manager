import { MODAL_TYPE } from '#fe/consts';
import { ProjectType } from './project';

export type ModalType = {
  type: MODAL_TYPE;
  project: ProjectType | null;
};
