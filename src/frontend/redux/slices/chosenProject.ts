import { createSlice } from '@reduxjs/toolkit';

import { ProjectType } from '#types/project';

type InitialState = ProjectType | null;

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

// TODO: type the state parameter
export const getChosenProject = (state) => state.chosenProject;

export default chosenProjectSlice;
