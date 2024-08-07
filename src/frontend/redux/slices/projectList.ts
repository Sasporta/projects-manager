import { createSlice } from '@reduxjs/toolkit';

import { ProjectListType, ProjectType } from '#types/project';

type InitialState = ProjectListType | null;

type State = { projectList: InitialState };

type setProjectListAction = {
  payload: ProjectListType;
};

type addProjectAction = {
  payload: ProjectType;
};

type editProjectAction = {
  payload: ProjectType;
};

type removeProjectAction = {
  payload: {
    id: string;
  };
};

const initialState: InitialState = null;

const projectListSlice = createSlice({
  name: 'projectList',
  initialState,
  reducers: {
    setProjectList: (state, action: setProjectListAction) => {
      return action.payload;
    },
    addProject: (state, action: addProjectAction) => {
      state.push(action.payload);
    },
    editProject: (state, action: editProjectAction) => {
      const {
        payload: {
          id,
          name,
          description,
          url,
          nextMaintenance,
          lastMaintenance,
        },
      } = action;

      const project = state.find(project => project.id === id);

      project.name = name;
      project.description = description;
      project.url = url;
      project.nextMaintenance = nextMaintenance;
      project.lastMaintenance = lastMaintenance;
    },
    removeProject: (state, action: removeProjectAction) => {
      const projectList = state;

      for (let i = 0; i < projectList.length; i++) {
        if (projectList[i].id === action.payload.id) {
          projectList.splice(i, 1);

          break;
        }
      }
    },
    orderProjectList: state => {
      state?.sort(
        (a, b) =>
          new Date(a.nextMaintenance).getTime() -
          new Date(b.nextMaintenance).getTime(),
      );
    },
  },
});

export const {
  setProjectList,
  addProject,
  editProject,
  removeProject,
  orderProjectList,
} = projectListSlice.actions;

export const getProjectList = (state: State) => state.projectList;

export default projectListSlice;
