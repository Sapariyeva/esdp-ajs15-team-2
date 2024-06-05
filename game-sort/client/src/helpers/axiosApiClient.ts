import axios from 'axios';

export const apiUrl = 'http://localhost:8000';

export const axiosApiClient = axios.create({
  baseURL: apiUrl,
});
