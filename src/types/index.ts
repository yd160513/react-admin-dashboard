export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> extends ApiResponse {
  data: {
    list: T[];
    total: number;
    page: number;
    pageSize: number;
  };
}
