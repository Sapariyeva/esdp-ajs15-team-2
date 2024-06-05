import { configureStore } from '@reduxjs/toolkit';
import cardReducer from "../features/CardSlice.ts"

const store = configureStore({
  reducer: {
    cards: cardReducer
  }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
