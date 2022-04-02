import { configureStore } from '@reduxjs/toolkit';

import questionSlice from './questionSlice';

export const store = configureStore({
  reducer: {
    question: questionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
