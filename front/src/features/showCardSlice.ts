import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "@/api/axiosApi";
import { IShowCard } from "@/containers/Games/GameShow/GameShow";

interface ShowCardState {
  cards: IShowCard[];
  error: Error | null;
  loading: boolean;
}

const initialState: ShowCardState = {
  cards: [],
  error: null,
  loading: false
};

export const fetchCards = createAsyncThunk('fetch/cards', async () => {
    return await axiosApi.get<IShowCard[]>('/cards').then(res => res.data);
});

const showCardSlice = createSlice(
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

export default showCardSlice.reducer;