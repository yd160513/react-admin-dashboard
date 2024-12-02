# React Router Action 重新验证行为说明

## 警告信息
```
React Router Future Flag Warning: The revalidation behavior after 4xx/5xx `action` responses is changing in v7. 
You can use the `v7_skipActionErrorRevalidation` future flag to opt-in early.
```

## 产生原因

### v6 的行为
在 React Router v6 中，当一个 action（如表单提交）返回 4xx/5xx 错误响应时，路由会自动重新验证（revalidate）页面数据。这意味着：

```typescript
// v6 中的行为示例
const action = async ({ request }) => {
  const result = await submitForm(request);
  
  if (result.status === 400) {
    // 即使返回错误，路由也会重新加载数据
    return { status: 400, data: result.data };
  }
};
```

这种行为可能导致不必要的数据重新获取，因为：
1. 错误响应通常意味着操作失败
2. 失败的操作一般不会改变底层数据
3. 重新验证会导致额外的网络请求

### v7 的新行为
在 v7 中，当 action 返回 4xx/5xx 错误时，路由将跳过自动重新验证。这是一个更合理的默认行为，因为：
1. 减少不必要的网络请求
2. 提高应用性能
3. 更符合开发者的预期

## 解决方案

### 1. 使用 future flag
在路由配置中添加 `v7_skipActionErrorRevalidation` flag：

```typescript
import { createHashRouter } from 'react-router-dom';

const router = createHashRouter(routes, {
  future: {
    v7_skipActionErrorRevalidation: true
  }
});
```

### 2. 手动控制重新验证
如果在某些错误情况下确实需要重新验证，可以手动控制：

```typescript
const action = async ({ request }) => {
  const result = await submitForm(request);
  
  if (result.status === 400) {
    // 使用 shouldRevalidate 显式控制是否重新验证
    return { 
      status: 400, 
      data: result.data,
      shouldRevalidate: true // 手动触发重新验证
    };
  }
};
```

## 最佳实践

1. **提前采用 v7 行为**：
```typescript
const router = createHashRouter(routes, {
  future: {
    v7_skipActionErrorRevalidation: true
  }
});
```

2. **选择性重新验证**：
- 只在数据可能发生变化时重新验证
- 对于纯验证错误，避免不必要的重新验证
- 考虑使用客户端状态管理错误信息

3. **错误处理策略**：
```typescript
const action = async ({ request }) => {
  try {
    const result = await submitForm(request);
    return { ok: true, data: result };
  } catch (error) {
    // 对于 4xx/5xx 错误，不触发重新验证
    return { 
      status: error.status,
      error: error.message,
      shouldRevalidate: false
    };
  }
};
```

## 相关链接
- [React Router v6 文档](https://reactrouter.com/docs/en/v6)
- [v7 升级指南](https://reactrouter.com/docs/en/v6/upgrading/v7) 