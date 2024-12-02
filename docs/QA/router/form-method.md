# React Router 表单方法大小写规范化说明

## 警告信息
```
React Router Future Flag Warning: Casing of `formMethod` fields is being normalized 
to uppercase in v7. You can use the `v7_normalizeFormMethod` future flag to opt-in early.
```

## 问题原因

### v7 之前的行为
- 表单方法（form method）的大小写是区分的
- 可能导致不一致的行为，例如：
  ```typescript
  // 这些会被当作不同的方法
  formMethod="post"
  formMethod="POST"
  formMethod="Post"
  ```

### v7 的新行为
- 所有表单方法都会被规范化为大写
- 提供更一致的行为，例如：
  ```typescript
  // 这些都会被规范化为 "POST"
  formMethod="post" -> "POST"
  formMethod="Post" -> "POST"
  ```

## 解决方案

在路由配置中启用新的规范化行为：

```typescript
import { createHashRouter } from 'react-router-dom';
import { routes } from './routes';

const router = createHashRouter(routes, {
  future: {
    v7_normalizeFormMethod: true
  }
});
```

## 最佳实践

1. **统一使用大写**：
```typescript
<Form method="POST" action="/submit">
  {/* 表单内容 */}
</Form>
```

2. **使用常量定义**：
```typescript
const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

<Form method={HTTP_METHODS.POST}>
  {/* 表单内容 */}
</Form>
```

## 相关链接
- [React Router v6 升级指南](https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod) 