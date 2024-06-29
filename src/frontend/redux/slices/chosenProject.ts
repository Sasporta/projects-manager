import { createSlice } from '@reduxjs/toolkit';

import { ProjectType } from '#types/project';

type InitialState = ProjectType | null;

type State = { chosenProject: InitialState };

type SetChosenProjectAction = {
  payload: ProjectType;
};

const initialState: InitialState = null;

const chosenProjectSlice = createSlice({
  name: 'chosenProject',
  initialState,
  reducers: {
    setChosenProject: (state, action: SetChosenProjectAction) => {
      return action.payload;
    },
  },
});

export const { setChosenProject } = chosenProjectSlice.actions;

export const getChosenProject = (state: State) => state.chosenProject;

export default chosenProjectSlice;
