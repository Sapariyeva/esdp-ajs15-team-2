import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApiClient } from "../helpers/axiosApiClient";
import { ICard } from "@/components/GameSort";

interface CardState {
  cards: ICard[];
  error: Error | null;
  loading: boolean;
}

const initialState: CardState = {
  cards: [],
  error: null,
  loading: false,
};

export const fetchCards = createAsyncThunk('fetch/cards', async () => {
    return await axiosApiClient.get<ICard[]>('/cards').then(res => res.data);
});

const cardSlice = createSlice(
  {
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.loading = false;
      }).addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
      })
    },
  }
)

export default cardSlice.reducer;