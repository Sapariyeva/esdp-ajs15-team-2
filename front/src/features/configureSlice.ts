import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  actions: string[];
  sessionFormat: string;
  isErrorlessLearning: boolean;
  rotation: number;
  interactiveEnd: boolean;
  encouragement: string;
  encouragementSwitch: boolean;
  cardPosition: boolean;
  hints: boolean;
  autoHints: number;
  hintsLimit: number;
  sound: boolean;
  successCriterion: number;
  successStreakCriterion: number;
}

const initialState: State = {
  actions: ['Нюхать', 'Спать', 'Нюхать', 'Нюхать'],
  sessionFormat: 'Покажи',
  isErrorlessLearning: false,
  rotation: 1,
  interactiveEnd: false,
  encouragement: 'Звезда',
  encouragementSwitch: false,
  cardPosition: false,
  hints: false,
  autoHints: 1,
  hintsLimit: 1,
  sound: true,
  successCriterion: 0,
  successStreakCriterion: 1,
};

const configureSlice = createSlice({
  name: 'configure',
  initialState,
  reducers: {
    setActions(state, action: PayloadAction<string[]>) {
      state.actions = action.payload;
    },
    setSessionFormat(state, action) {
      state.sessionFormat = action.payload;
    },
    setErrorlessLearning(state, action) {
      state.isErrorlessLearning = action.payload;
    },
    setRotation(state, action) {
      state.rotation = action.payload;
    },
    setInteractiveEnd(state, action) {
      state.interactiveEnd = action.payload;
    },
    setEncouragement(state, action) {
      state.encouragement = action.payload;
    },
    setEncouragementSwitch(state, action) {
      state.encouragementSwitch = action.payload;
    },
    setCardPosition(state, action) {
      state.cardPosition = action.payload;
    },
    setHints(state, action) {
      state.hints = action.payload;
    },
    setAutoHints(state, action) {
      state.autoHints = action.payload;
    },
    setHintsLimit(state, action) {
      state.hintsLimit = action.payload;
    },
    setSound(state, action) {
      state.sound = action.payload;
    },
    setSuccessCriterion(state, action) {
      state.successCriterion = action.payload;
    },
    setSuccessStreakCriterion(state, action) {
      state.successStreakCriterion = action.payload;
    },
  },
});

export const {
  setActions,
  setErrorlessLearning,
  setSessionFormat,
  setRotation,
  setInteractiveEnd,
  setEncouragement,
  setEncouragementSwitch,
  setCardPosition,
  setHints,
  setAutoHints,
  setHintsLimit,
  setSound,
  setSuccessCriterion,
  setSuccessStreakCriterion,
} = configureSlice.actions;

export default configureSlice.reducer;