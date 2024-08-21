import axios, { AxiosInstance } from "axios";
import { Store } from "@reduxjs/toolkit";
import i18n from '@/i18n';
import { RootState } from "@/app/store";
import { apiURL } from "@/constants";

type AppStore = Store<RootState>;

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

const axiosApi: AxiosInstance = axios.create({
  baseURL: apiURL,
});

axiosApi.interceptors.request.use((config) => {
  try {
    config.headers["Authorization"] = store.getState().user.user?.token;

    const language = i18n.language; // Получить текущий язык из i18n
    if (language) {
      config.headers["Accept-Language"] = language;
    }
  } catch (e) {
    console.error(e);
  }
  return config;
});

export default axiosApi;
