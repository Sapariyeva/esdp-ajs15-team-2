import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "@/api/axiosApi";
import { AxiosError, isAxiosError } from "axios";

interface ISettings {
    id: number,
    title: string,
    image: string,
    video: string,
    category: string
}

interface IState {
    title: ISettings[],
    error: Error | null;
    loading: boolean;
}

type userResponceError = {
    error: { message: string }
}

type userResponceValidateError = {
    type: string;
    messages: string[]
}[];

const initialState: IState = {
    title: [],
    error: null,
    loading: true
}

export const fetchCards = createAsyncThunk('fetch/cards', async () => {
    return await axiosApi.get<ISettings[]>('/cards').then(res => res.data);
});

export const createSettings = createAsyncThunk<ISettings, FormData, { rejectValue: userResponceError | userResponceValidateError }>(
    '/settings',
    async (userData: FormData, { rejectWithValue }) => {
        try {
            const responce = await axiosApi.post('/cards', userData);
            return responce.data;
        } catch (e) {
            if (isAxiosError(e)) {
                const error: AxiosError<userResponceError> = e;
                return rejectWithValue(
                    error.response?.data || { error: { message: "An error occured" } }
                )
            }
            throw e;
        }
    }
)

export const getAllCards = createAsyncThunk('get/cardsAll', async () => {
    try {
        const response = await axiosApi.get(`/cards/all`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

export const deleteCard = createAsyncThunk('delete/card', async (id: number) => {
    try {
        const response = await axiosApi.delete(`/cards/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})


export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createSettings.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createSettings.fulfilled, (state, action) => {
                state.loading = false
                state.title = [action.payload]
            })
            .addCase(createSettings.rejected, (state, action) => {
                state.loading = true
                state.error = action.error as Error
            })

            .addCase(fetchCards.fulfilled, (state, action) => {
                state.title = action.payload;
                state.loading = false;
            }).addCase(fetchCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error as Error;
            })
            .addCase(fetchCards.pending, (state) => {
                state.loading = true;
            })

            .addCase(getAllCards.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllCards.fulfilled, (state, action) => {
                state.loading = false
                state.title = action.payload
            })
            .addCase(getAllCards.rejected, (state, action) => {
                state.loading = true
                state.error = action.error as Error
            })


            .addCase(deleteCard.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                state.loading = false
                state.title = action.payload
            })
            .addCase(deleteCard.rejected, (state, action) => {
                state.loading = true
                state.error = action.error as Error
            })
    }
});

export default settingsSlice.reducer;
