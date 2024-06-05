import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUser";
import axiosApi from "../api/axiosApi";
import { AxiosError, isAxiosError } from "axios";

interface IState {
    user: IUser | null;
    loading: boolean;
    registerError: null | string | userResponseValidateError;
    loginError: null | string;
}

type userRequest = {
    email: string,
    password: string
};

type userResponseError = {
    error: { message: string };
};

type userResponseValidateError = { 
    type: string; 
    messages: string[] 
}[];

const initialState: IState = {
    user: null,
    loading: false,
    registerError: null,
    loginError: null,
}

export const registerUser = createAsyncThunk<IUser,userRequest, { rejectValue: userResponseError | userResponseValidateError }>(
    "auth/register", 
    async (userData: userRequest, { rejectWithValue }) => {
    try {
        const response = await axiosApi.post<IUser>("/users/register", userData);
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<userResponseError> = err;
            return rejectWithValue(
                error.response?.data || { error: { message: "Произошла неизвестная ошибка" } }
            );
        }
        throw err;
    }
});

export const loginUser = createAsyncThunk< IUser, userRequest, { rejectValue: string }>(
    "auth/login", 
    async (userData: userRequest, { rejectWithValue }) => {
    try {
        const response = await axiosApi.post<IUser>("users/login", userData);
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<userResponseError> = err;
            return rejectWithValue(
                error.response?.data.error.message || "Произошла неизвестная ошибка"
            );
        }
        throw err;
    }
});

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete("/users/logout");
            return response.data;
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<userResponseError> = err;
                return rejectWithValue(
                    error.response?.data.error.message || "Ошибка подключения к Интернету"
                );
            }
            throw err;
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearRegisterError(state) {
            state.registerError = null;
        },
    }, 
    extraReducers: builder => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.registerError = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.user = { ...action.payload };
            state.loading = false;
            state.registerError = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            if (Array.isArray(action.payload)) {
                state.registerError = action.payload;
            } else {
                state.registerError = action.payload?.error.message ?? "Произошла неизвестная ошибка";
            }
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.loginError = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = { ...action.payload };
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.loginError = action.payload || null;
        })
        .addCase(logoutUser.fulfilled, () => {
            return initialState;
        })
    }
})

export const { clearRegisterError } = userSlice.actions;

export default userSlice.reducer;