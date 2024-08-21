import axiosApi from "@/api/axiosApi";
import { IShowCard } from "@/containers/Games/GameShow/GameShow";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
        const response = await axiosApi.get<IShowCard[]>('/cards/show', {
          params: { category: selectedCategories }
        });
        console.log(response.data);
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
        state.showCards = action.payload;
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