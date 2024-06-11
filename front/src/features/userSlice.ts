import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUser";
import axiosApi from "../api/axiosApi";
import { AxiosError, isAxiosError } from "axios";

interface IState {
    user: IUser | null;
    loading: boolean;
    registerError: null | string | userResponseValidateError;
    loginError: null | string;
    registerData: {email: string, password: string};
}

type userRequest = {
    email: string;
    password: string;
    username?: string; // Опциональное поле для имени пользователя при регистрации
    token?: string; // Опциональное поле для подтверждения электронной почты
};

type userResponseError = {
    error: { message: string };
};

type userResponseValidateError = { 
    type: string; 
    messages: string[];
}[];

const initialState: IState = {
    user: null,
    loading: false,
    registerError: null,
    loginError: null,
    registerData: {email: "", password: ""}
};

export const registerUser = createAsyncThunk<IUser, userRequest, { rejectValue: userResponseError | userResponseValidateError }>(
    "auth/register",
    async (userData, { rejectWithValue }) => {
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
    }
);

export const loginUser = createAsyncThunk<IUser, userRequest, { rejectValue: string }>(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        console.log(userData);
        
        try {
            const response = await axiosApi.post<IUser>("/users/login", userData);
            return response.data;
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<userResponseError> = err;
                return rejectWithValue(
                    error.response?.data?.error?.message || "Произошла неизвестная ошибка"
                );
            }
            throw err;
        }
    }
);

export const resendConfirmEmail = createAsyncThunk<IUser, userRequest, { rejectValue: string }>(
    "auth/resend-confirmation",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(`/users/resend-confirmation`, userData);
            console.log(response.data);
            
            return response.data;
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<userResponseError> = err;
                return rejectWithValue(
                    error.response?.data?.error?.message || "Произошла неизвестная ошибка"
                );
            }
            throw err;
        }
    }
);

export const setUsername = createAsyncThunk<IUser, userRequest, { rejectValue: userResponseValidateError }>(
    "auth/setUsername",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post<IUser>("/users/set-username", { username: userData.username });
            return response.data;
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<userResponseValidateError> = err;
                return rejectWithValue(error.response?.data || []);
            }
            throw err;
        }
    }
);

export const logoutUser = createAsyncThunk<void>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await axiosApi.delete("/users/logout");
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<userResponseError> = err;
                return rejectWithValue(
                    error.response?.data?.error?.message || "Ошибка подключения к Интернету"
                );
            }
            throw err;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearRegisterError(state) {
            state.registerError = null;
            state.loginError = null;
        },
        changeRegisterData(state, action: PayloadAction<{email: string, password: string}>) {
            state.registerData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.registerError = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
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
                state.user = action.payload;
                state.loading = false;
                state.loginError = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.payload || null;
            })
            .addCase(resendConfirmEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(resendConfirmEmail.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resendConfirmEmail.rejected, (state) => {
                state.loading = false;
            })
            .addCase(setUsername.pending, (state) => {
                state.loading = true;
            })
            .addCase(setUsername.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(setUsername.rejected, (state, action) => {
                state.loading = false;
                state.registerError = action.payload || null;
            })
            .addCase(logoutUser.fulfilled, () => {
                return initialState;
            });
    },
});

export const { clearRegisterError, changeRegisterData } = userSlice.actions;

export default userSlice.reducer;