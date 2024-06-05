import { configureStore } from '@reduxjs/toolkit';
import configureReducer from '../features/configureSlice';

export const store = configureStore({
  reducer: {
    configure: configureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
