import { configureStore } from '@reduxjs/toolkit';
import configureReducer from '../features/configureSlice';
import cardReducer from '../features/CardSlice';

export const store = configureStore({
  reducer: {
    configure: configureReducer,
    cards: cardReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
