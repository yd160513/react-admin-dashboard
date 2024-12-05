import { createProdMockServer } from 'vite-plugin-mock/client';
import systemMock from './system';
import authMock from './auth';
import menuMock from './menu';

export function setupProdMockServer() {
  createProdMockServer([...systemMock, ...authMock, ...menuMock]);
} 