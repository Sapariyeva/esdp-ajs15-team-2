import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice";
import configureReducer from '@/features/configureSlice';
import surveyReducer from "@/features/surveySlice";

export const rootReducer = combineReducers({
    user: userReducer,
    configure: configureReducer,
    survey: surveyReducer
});