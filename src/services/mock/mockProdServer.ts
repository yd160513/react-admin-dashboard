import { createProdMockServer } from 'vite-plugin-mock/client';
import systemMock from './system';

export function setupProdMockServer() {
  createProdMockServer([...systemMock]);
} 