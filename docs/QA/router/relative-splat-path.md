# React Router 相对路径解析行为说明

## 警告信息
```
React Router Future Flag Warning: Relative route resolution within Splat routes 
is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early.
```

## 问题原因

### v7 之前的行为
- 在通配符路由（`*`）中的相对路径解析可能不符合预期
- 例如：
  ```typescript
  // 路由配置
  {
    path: "files/*",
    children: [
      {
        path: "../other",  // 相对路径解析可能不符合预期
        element: <Other />
      }
    ]
  }
  ```

### v7 的新行为
- 提供更直观的相对路径解析
- 更好地处理通配符路由中的相对路径
- 与普通路由的相对路径行为保持一致

## 解决方案

在路由配置中启用新的解析行为：

```typescript
import { createHashRouter } from 'react-router-dom';
import { routes } from './routes';

const router = createHashRouter(routes, {
  future: {
    v7_relativeSplatPath: true
  }
});
```

## 使用示例

1. **通配符路由配置**：
```typescript
const routes = [
  {
    path: "files/*",  // 通配符路由
    element: <FileLayout />,
    children: [
      {
        path: "view",        // /files/view
        element: <FileView />
      },
      {
        path: "../other",    // /other
        element: <Other />
      }
    ]
  }
];
```

2. **相对路径导航**：
```typescript
function FileView() {
  return (
    <div>
      <Link to="../other">返回上级</Link>
      <Link to="./detail">查看详情</Link>
    </div>
  );
}
```

## 最佳实践

1. **路径定义**：
   - 优先使用绝对路径
   - 谨慎使用相对路径，特别是在通配符路由中
   - 保持路由结构清晰

2. **路由组织**：
   - 合理使用路由嵌套
   - 避免过深的路由层级
   - 使用语义化的路径名称

## 相关链接
- [React Router v6 升级指南](https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath) 