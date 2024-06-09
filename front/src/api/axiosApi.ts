import axios, { AxiosInstance } from 'axios';
import { Store } from "@reduxjs/toolkit";
import { RootState } from '@/app/store';
import { apiURL } from '@/constants';

type AppStore = Store<RootState>;

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

const axiosApi: AxiosInstance = axios.create({
  baseURL: apiURL
});

axiosApi.interceptors.request.use(config => {
  try {
    // config.headers['Authorization'] = store.getState().user.user?.token;
  } catch (e) {
    console.error(e);
  }
  return config;
});

export default axiosApi;