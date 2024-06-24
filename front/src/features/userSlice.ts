import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUser";
import axiosApi from "../api/axiosApi";
import { AxiosError, isAxiosError } from "axios";

interface IState {
    user: IUser | null;
    loading: boolean;
    registerError: null | string | userResponseValidateError;
    loginError: null | string;
    registerEmail: string;
}

type userRequest = {
    email?: string;
    password?: string;
    username?: string;
    token?: string;
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
    registerEmail: ""
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

export const resendConfirmEmail = createAsyncThunk(
    "auth/resend_confirmation",
    async (email: string, { rejectWithValue }) => {
        console.log(email);
        
        try {
            const response = await axiosApi.post(`/users/resend_confirmation`, { email });
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
    "auth/set_username",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post<IUser>("/users/set_username", { username: userData.username });
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

export const getUserFindByEmail = createAsyncThunk(
    "auth/get_user_find_by_email",
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get<IUser>(`/users/find_by_email?email=${email}`);
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
)

export const resetPassword = createAsyncThunk<IUser, string, { rejectValue: string }>(
    "auth/request_password_reset",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post<IUser>("/users/request_password_reset", { email });
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

export const changePassword = createAsyncThunk<IUser, userRequest, { rejectValue: string }>(
    "auth/change_password",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post<IUser>("/users/change_password", userData);
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

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearRegisterError(state) {
            state.registerError = null;
            state.loginError = null;
        },
        changeRegisterEmail(state, action) {
            state.registerEmail = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.registerError = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
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
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.loginError = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.loginError = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.payload || null;
            })
            .addCase(getUserFindByEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserFindByEmail.fulfilled, (state, action) => {
                if(action.payload.isEmailConfirmed) {
                    state.user = action.payload;
                }
                state.loading = false;
            })
            .addCase(getUserFindByEmail.rejected, (state) => {
                state.loading = false;
            })
    },
});

export const { clearRegisterError, changeRegisterEmail } = userSlice.actions;

export default userSlice.reducer;