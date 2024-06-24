import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice";
import configureReducer from '@/features/configureSlice';

export const rootReducer = combineReducers({
    user: userReducer,
    configure: configureReducer
});