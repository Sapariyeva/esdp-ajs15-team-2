import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApiClient } from "../helpers/axiosApiClient";
import { IShowCard } from "../components/GameShow";

interface CardState {
  showCards: IShowCard[];
  error: Error | null;
  loading: boolean;
}

const initialState: CardState = {
  showCards: [],
  error: null,
  loading: false,
};

export const fetchShowCards = createAsyncThunk(
    'fetch/showCards',
    async (selectedCategories: string[], { rejectWithValue }) => {
      try {
        const response = await axiosApiClient.get<IShowCard[]>('/cards/show', {
          params: { category: selectedCategories }
        });
        return response.data;
      } catch (e) {
        return rejectWithValue((e as Error)?.message);
      }
    }
);

const showCardSlice = createSlice(
  {
    name: 'showCards',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchShowCards.fulfilled, (state, action) => {
        state.showCards = action.payload; // Преобразование в двумерный массив с размером чанка 3
        console.log(state.showCards);
        state.loading = false;
      }).addCase(fetchShowCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(fetchShowCards.pending, (state) => {
        state.loading = true;
      })
    },
  }
)

export default showCardSlice.reducer;