import { createProdMockServer } from 'vite-plugin-mock/client';
import systemMock from './system';
import authMock from './auth';

export function setupProdMockServer() {
  createProdMockServer([...systemMock, ...authMock]);
} 