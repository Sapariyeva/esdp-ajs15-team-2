import axiosApi from "@/api/axiosApi";
import { IUser } from "@/interfaces/IUser";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IMessageState {
    users: IUser[];
    error: Error | null;
    loading: boolean;
};

const initialState: IMessageState = {
    users: [],
    error: null,
    loading: true
}

// Запрос на получение пользователей
export const getUsers = createAsyncThunk('get/users', async () => {
    try {
        const response = await axiosApi.get(`/users`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

export const adminSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload 
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = true
                state.error = action.error as Error
            })
    }
});

export default adminSlice.reducer