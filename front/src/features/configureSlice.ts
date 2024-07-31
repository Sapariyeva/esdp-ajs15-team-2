import axiosApi from '@/api/axiosApi';
import { ICard } from '@/containers/Games/GameSort/GameSort';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface State {
  categories: string[];
  selectedCategories: string[];
  cards: ICard[];
  error: Error | null;
  loading: boolean;
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
  errorHandling: boolean;
}

const initialState: State = {
  categories: [],
  selectedCategories: [],
  cards: [],
  error: null,
  loading: false,
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
  errorHandling: false,
};

export const fetchCards = createAsyncThunk('fetch/cards', async () => {
  return await axiosApi.get<ICard[]>('/cards/all').then((res) => res.data);
});

const configureSlice = createSlice({
  name: 'configure',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    setSelectedCategories(state, action: PayloadAction<string[]>) {
      state.selectedCategories = action.payload;
    },
    setCards(state, action: PayloadAction<ICard[]>) {
      state.cards = action.payload;
    },
    setSessionFormat(state, action: PayloadAction<string>) {
      state.sessionFormat = action.payload;
    },
    setErrorlessLearning(state, action: PayloadAction<boolean>) {
      state.isErrorlessLearning = action.payload;
    },
    setRotation(state, action: PayloadAction<number>) {
      state.rotation = action.payload;
    },
    setInteractiveEnd(state, action: PayloadAction<boolean>) {
      state.interactiveEnd = action.payload;
    },
    setEncouragement(state, action: PayloadAction<string>) {
      state.encouragement = action.payload;
    },
    setEncouragementSwitch(state, action: PayloadAction<boolean>) {
      state.encouragementSwitch = action.payload;
    },
    setCardPosition(state, action: PayloadAction<boolean>) {
      state.cardPosition = action.payload;
    },
    setHints(state, action: PayloadAction<boolean>) {
      state.hints = action.payload;
    },
    setAutoHints(state, action: PayloadAction<number>) {
      state.autoHints = action.payload;
    },
    setHintsLimit(state, action: PayloadAction<number>) {
      state.hintsLimit = action.payload;
    },
    setSound(state, action: PayloadAction<boolean>) {
      state.sound = action.payload;
    },
    setSuccessCriterion(state, action: PayloadAction<number>) {
      state.successCriterion = action.payload;
    },
    setSuccessStreakCriterion(state, action: PayloadAction<number>) {
      state.successStreakCriterion = action.payload;
    },
    setErrorHandling(state, action: PayloadAction<boolean>) {
      state.errorHandling = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.loading = false;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      });
  },
});

export const {
  setCategories,
  setSelectedCategories,
  setCards,
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
  setErrorHandling,
} = configureSlice.actions;

export default configureSlice.reducer;
