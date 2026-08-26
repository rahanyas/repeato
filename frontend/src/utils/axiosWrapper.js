import axios from 'axios';

const baseUrl = import.meta.env.VITE_DEV === 'dev' ? import.meta.env.VITE_DEV_API : import.meta.env.VITE_PROD_API

const axiosInstance = axios.create({
  baseURL : baseUrl,
  timeout : 10000,
  headers : {
    'Content-Type' : 'application/json'
  }
});

export default axiosInstance