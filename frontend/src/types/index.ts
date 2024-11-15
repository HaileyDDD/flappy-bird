// 统一类型定义
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
} 