import axiosApi from "@/api/axiosApi";
import { ISurvey } from "@/interfaces/ISurvey";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IState {
    loading: boolean
    error: Error | null;
    survey: ISurvey
}

const initialState: IState = {
    loading: false,
    error: null,
    survey: { userId: "", source: ""}
};

export const createSurvey = createAsyncThunk(
    "create/survey",
    async (survey: ISurvey) => {
        try {
            await axiosApi.post<ISurvey>(`/surveys`, survey);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
)

const surveySlice = createSlice({
    name: "survey",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSurvey.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSurvey.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error as Error;
            })
            .addCase(createSurvey.fulfilled, (state) => {
                state.loading = false;
            })
    }
});

export default surveySlice.reducer