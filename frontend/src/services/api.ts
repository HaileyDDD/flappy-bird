import axios from 'axios';
import { errorHandler } from '@/core/errorHandler';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const apiService = {
  async request(method: string, url: string, data?: any) {
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${url}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      errorHandler.capture(error);
      throw error;
    }
  },

  get: (url: string) => apiService.request('get', url),
  post: (url: string, data: any) => apiService.request('post', url, data),
  put: (url: string, data: any) => apiService.request('put', url, data),
  delete: (url: string) => apiService.request('delete', url)
}; 