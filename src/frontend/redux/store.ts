import { configureStore } from '@reduxjs/toolkit';

import modalSlice from './slices/modal';
import projectListSlice from './slices/projectList';
import chosenProjectSlice from './slices/chosenProject';

export const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
    [projectListSlice.name]: projectListSlice.reducer,
    [chosenProjectSlice.name]: chosenProjectSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
