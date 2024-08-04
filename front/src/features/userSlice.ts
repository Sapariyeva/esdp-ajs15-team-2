import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
import { IUser } from "@/interfaces/IUser";
import axiosApi from '@/api/axiosApi';
import { omit } from "lodash";

interface IState {
    user: IUser | null;
    loading: boolean;
    registerError: null | string | userResponseValidateError;
    loginError: null | string;
    userEmail: string;
}

type userRequest = {
    email?: string;
    password?: string;
    username?: string;
    token?: string;
};

type userResetPassword =  {
    password: string;
    resetPasswordToken: string;
}

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
    userEmail: "",
};

// Запрос на регистрацию
export const registerUser = createAsyncThunk<IUser, userRequest, { rejectValue: userResponseError | userResponseValidateError }>(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post<IUser>("/users/register", userData);
            console.log(response.data);
            
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

// Запрос на вход
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

// Повторная отправка письма с подтверждением почты
export const resendConfirmEmail = createAsyncThunk(
    "auth/resend_confirmation",
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(`/users/resend_confirmation`, { email });
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

// Изменение имени пользователя
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

// Выход пользователя
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

// Поиск пользователя по email
export const getUserFindByEmail = createAsyncThunk(
    "auth/get_user_find_by_email",
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get<IUser>(`/users/find_by_email/${email}`);
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

// Поиск пользователя по токену сброса пароля
export const getUserFindByResetPasswordToken = createAsyncThunk(
    "auth/get_user_find_by_reset_password_token",
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get<IUser>(`/users/find_by_reset_password_token/${token}`);
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

// Запрос на сброс пароля
export const resetPasswordEmail = createAsyncThunk<IUser, string, { rejectValue: string }>(
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

// Повторная отправка письма для сброса пароля
export const resendResetPassword = createAsyncThunk(
    "auth/resend_password_reset",
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(`/users/resend_password_reset`, { email });
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

// Изменение пароля
export const resetPassword = createAsyncThunk<IUser, userResetPassword, { rejectValue: userResponseError | userResponseValidateError }>(
    "auth/reset_password",
    async (resetPassword, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post<IUser>(`/users/reset_password/${resetPassword.resetPasswordToken}`, {password:resetPassword.password});
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

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearRegisterError(state) {
            state.registerError = null;
            state.loginError = null;
        },
        changeUserEmail(state, action) {
            state.userEmail = action.payload;
        },
        changeInitialState(state) {
            state.user = null;
            state.userEmail = "";
            state.loading = false;
            state.registerError = null;
            state.loginError = null;
        },
        setUser(state, action: PayloadAction<IUser>) {
            const userWithoutPassword = omit(action.payload, ['password']);
            state.user = userWithoutPassword as IUser;
        },
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
            .addCase(resetPasswordEmail.pending, (state) => {
                state.loading = true;
                state.loginError = null;
            })
            .addCase(resetPasswordEmail.fulfilled, (state) => {
                state.loading = false;
                state.loginError = null;
            })
            .addCase(resetPasswordEmail.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.payload || null;
            })
            .addCase(resendResetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resendResetPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resendResetPassword.rejected, (state) => {
                state.loading = false;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.registerError = null;
            })
            .addCase(resetPassword.fulfilled, () => {
                return initialState;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.registerError = action.payload;
                } else {
                    state.registerError = action.payload?.error.message ?? "Произошла неизвестная ошибка";
                }
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
            .addCase(getUserFindByResetPasswordToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserFindByResetPasswordToken.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(getUserFindByResetPasswordToken.rejected, (state) => {
                state.loading = false;
            })
    },
});

export const { clearRegisterError, changeUserEmail, changeInitialState, setUser } = userSlice.actions;

export default userSlice.reducer;