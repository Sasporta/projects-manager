import { createSlice } from '@reduxjs/toolkit';

import { MODAL_TYPE } from '#fe/consts';
import { ModalType } from '#types/modal';
import { ProjectType } from '#types/project';

type InitialState = {
  type: MODAL_TYPE | null;
  project: ProjectType | null;
};

type State = { modal: InitialState };

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

export const getModal = (state: State) => state.modal;

export default modalSlice;
