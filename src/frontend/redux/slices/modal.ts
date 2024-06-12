import { createSlice } from '@reduxjs/toolkit';

import { MODAL_TYPE } from '#fe/consts';
import { ModalType } from '#types/modal';
import { ProjectType } from '#types/project';

type InitialState = {
  type: MODAL_TYPE | null;
  project: ProjectType | null;
};

type SetModalAction = {
  payload: ModalType;
};

const initialState: InitialState = { type: null, project: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action: SetModalAction) => {
      return action.payload;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { setModal, closeModal } = modalSlice.actions;

// TODO: type the state parameter
export const getModal = state => state.modal;

export default modalSlice;
