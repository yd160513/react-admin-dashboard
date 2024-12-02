# React Router 水合行为说明

## 警告信息
```
React Router Future Flag Warning: `RouterProvider` hydration behavior is changing in v7. 
You can use the `v7_partialHydration` future flag to opt-in early.
```

## 问题原因
这个警告是因为 React Router v7 改变了 `RouterProvider` 的水合（hydration）行为。水合是指将服务端渲染的静态 HTML 转换为可交互的 React 应用的过程。

### v7 之前的行为
- 一次性水合所有路由组件
- 可能导致性能问题，特别是在大型应用中

### v7 的新行为
- 采用部分水合策略
- 优先水合当前路由所需的组件
- 其他路由组件延迟到需要时再水合

## 解决方案

在路由配置中启用新的水合行为：

```typescript
import { createHashRouter } from 'react-router-dom';
import { routes } from './routes';

const router = createHashRouter(routes, {
  future: {
    v7_partialHydration: true
  }
});
```

## 优势
1. 更好的性能：减少初始水合时间
2. 更少的内存使用：不会一次性加载所有组件
3. 更快的首次内容渲染（FCP）

## 相关链接
- [React Router v6 升级指南](https://reactrouter.com/v6/upgrading/future#v7_partialhydration) 