# React Router Fetcher 持久化行为说明

## 什么是 Fetcher

Fetcher 是 React Router 提供的一个数据加载工具，它允许你在不导航到新页面的情况下与你的路由处理程序进行交互。主要用于：

1. **并行数据加载**：

```typescript
function ProductList() {
  // 可以同时加载多个数据
  const productFetcher = useFetcher();
  const reviewsFetcher = useFetcher();

  useEffect(() => {
    productFetcher.load("/products");
    reviewsFetcher.load("/reviews");
  }, []);

  return (
    <div>
      {productFetcher.data && <ProductGrid products={productFetcher.data} />}
      {reviewsFetcher.data && <ReviewList reviews={reviewsFetcher.data} />}
    </div>
  );
}
```

2. **表单提交**：

```typescript
function CommentForm() {
  const fetcher = useFetcher();
  
  return (
    <fetcher.Form method="post" action="/comments">
      <textarea name="comment" />
      <button type="submit">
        {fetcher.state === "submitting" ? "提交中..." : "提交评论"}
      </button>
    </fetcher.Form>
  );
}
```

## 警告信息
```
React Router Future Flag Warning: The persistence behavior of fetchers 
is changing in v7. You can use the `v7_fetcherPersist` future flag to opt-in early.
```

## 问题原因

### v7 之前的行为
- fetcher 状态在路由导航后会被清除
- 例如：提交表单后跳转页面，加载状态会丢失
- 可能导致用户体验不连贯

### v7 的新行为
- fetcher 状态在路由导航后会被保持
- 保持加载状态直到数据加载完成
- 提供更流畅的用户体验

## 解决方案

在路由配置中启用新的持久化行为：

```typescript
import { createHashRouter } from 'react-router-dom';
import { routes } from './routes';

const router = createHashRouter(routes, {
  future: {
    v7_fetcherPersist: true
  }
});
```

## 使用示例

1. **数据加载示例**：

```typescript
import { useFetcher } from 'react-router-dom';

function UserProfile() {
  const fetcher = useFetcher();

  useEffect(() => {
    // 加载用户数据
    fetcher.load(`/api/users/123`);
  }, []);

  // 即使页面发生导航，加载状态也会保持
  return (
    <div>
      {fetcher.state === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <UserInfo user={fetcher.data} />
      )}
    </div>
  );
}
```

2. **表单提交示例**：

```typescript
function CommentForm() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/api/comments">
      <textarea name="content" />
      {/* 提交状态在页面导航后仍然保持 */}
      <button type="submit" disabled={fetcher.state === "submitting"}>
        {fetcher.state === "submitting" ? "提交中..." : "发表评论"}
      </button>
    </fetcher.Form>
  );
}
```

## 最佳实践

1. **状态管理**：
   - 合理利用持久化的 fetcher 状态
   - 在合适的时机重置 fetcher
   - 使用 fetcher.state 显示加载状态

2. **性能优化**：
   - 避免重复的数据请求
   - 利用持久化状态提供更连贯的用户体验
   - 合理设置加载和错误状态的展示

## 相关链接
- [React Router useFetcher 文档](https://reactrouter.com/en/main/hooks/use-fetcher)
- [React Router v6 升级指南](https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist)