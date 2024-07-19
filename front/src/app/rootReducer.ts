import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice";
import surveyReducer from "@/features/surveySlice";
import configureReducer from '@/features/configureSlice';
import cardReducer from '@/features/cardSlice';
import showCardReducer from "@/features/showCardSlice";

export const rootReducer = combineReducers({
    user: userReducer,
    survey: surveyReducer,
    configure: configureReducer,
    cards: cardReducer,
    showCards: showCardReducer,
});