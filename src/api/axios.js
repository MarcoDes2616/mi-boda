import axios from 'axios';
// import { EXPO_PUBLIC_API } from '@env';

const axiosInstance = axios.create({
  baseURL: "https://marriedserver-production.up.railway.app/api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
