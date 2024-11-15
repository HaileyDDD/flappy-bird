import axios from 'axios';
import { errorHandler } from '@/core/errorHandler';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    errorHandler.capture(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response,
  error => {
    errorHandler.capture(error);
    
    if (error.response?.status === 401) {
      // 处理未授权
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
); 