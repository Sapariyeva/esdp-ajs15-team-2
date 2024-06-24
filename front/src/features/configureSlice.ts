import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  actions: string[];
}

const initialState: State = {
  actions: ['Нюхать', 'Спать', 'Нюхать', 'Нюхать'],
};

const configureSlice = createSlice({
  name: 'configure',
  initialState,
  reducers: {
    setActions(state, action: PayloadAction<string[]>) {
      state.actions = action.payload;
    },
  },
});

export const { setActions } = configureSlice.actions;

export default configureSlice.reducer;