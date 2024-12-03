# React Admin Dashboard

一个基于 React 18、Ant Design、TypeScript 的现代化后台管理系统模板。

## 特性
- 基于 React 18、Vite 4、TypeScript 开发
- 🎨 使用 Ant Design 组件库
- 📦 状态管理: Redux Toolkit
- 🔐 权限管理: 路由级别权限控制
- 📝 代码规范: ESLint + Prettier

## 技术栈

### 核心技术
- **前端框架**: React 18
- **构建工具**: Vite
- **类型系统**: TypeScript
- **状态管理**: Redux Toolkit
- **路由系统**: React Router DOM 6

### UI 与样式
- **UI 框架**: Ant Design
- **样式解决方案**: 
  - CSS Modules
  - SASS/SCSS
- **图标库**: @ant-design/icons

### 工程化工具
- **包管理器**: pnpm
- **代码规范**: 
  - ESLint
  - Prettier
  - Stylelint
- **Git 规范**: 
  - husky
  - commitlint
  - lint-staged

### 开发工具
- **开发服务器**: Vite Dev Server
- **调试工具**: React Developer Tools
- **API 请求**: Axios

## 目录结构
```
├── docs/                      # 项目文档
│   └── QA/                    # 问答文档
│       ├── state-management/  # 状态管理相关
│       └── styles/            # 样式相关
│
├── src/                       # 源代码
│   ├── assets/               # 静态资源
│   │   ├── images/          # 图片资源
│   │
│   ├── components/          # 公共组件
│   │   ├─ common/         # 基础组件
│   │   │   └── RouteGuard.tsx  # 路由守卫组件
│   │   └── business/       # 业务组件
│   │
│   ├── hooks/              # 自定义 Hooks
│   │
│   ├── pages/              # 页面组件
│   │   └── [page]/        # 页面目录
│   │       ├── index.tsx   # 页面入口
│   │       └── style.module.scss  # 页面样式
│   │
│   ├── router/             # 路由配置
│   │   ├── index.tsx      # 路由入口
│   │   ├── routes.tsx     # 路由定义
│   │   └── types.ts       # 路由类型
│   │
│   ├── services/           # API 服务
│   │   └── api.ts         # API 定义
│   │
│   ├── store/             # 状态管理
│   │   ├── index.ts       # Store 配置
│   │   └── features/      # 状态切片
│   │
│   ├── styles/            # 全局样式
│   │   ├── variables.scss # 变量定义
│   │   └── global.scss    # 全局样式
│   │
│   ├── types/             # 类型定义
│   │   └── index.ts       # 公共类型
│   │
│   ├── utils/             # 工具函数
│   │   └── index.ts       # 工具函数
│   │
│   ├── App.tsx            # 应用入口
│   └── main.tsx           # 主入口
│
├── .husky/                  # Git Hooks 配置
│   └── pre-commit          # 提交前执行的脚本
│
├── .gitignore              # Git 忽略配置
├── .eslintrc.js           # ESLint 配置
├── .prettierrc            # Prettier 配置
├── commitlint.config.js    # Commit 信息校验配置
├── index.html             # HTML 入口文件
├── package.json           # 项目配置
├── pnpm-lock.yaml         # pnpm 依赖锁定文件
├── README.md              # 项目说明文档
├── tsconfig.json          # TypeScript 配置
├── tsconfig.node.json      # Node 环境 TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 路由系统

### 路由配置
路由配置采用集中式管理，主要包含以下文件：
- `router/index.tsx`: 路由入口，导出路由实例
- `router/routes.tsx`: 路由配置定义
- `router/types.ts`: 路由相关类型定义

### 路由类型
```typescript
interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    permissions?: string[];
  };
}
```

### 路由守卫
项目包含路由守卫功能，支持：
- 页面标题自动设置
- 路由权限控制
- 登录状态检查

### 使用示例
```typescript
// 定义路由
export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <HelloPage />,
    meta: {
      title: 'Hello World',
    },
  },
];

// 使用路由守卫
<RouteGuard config={routeConfig}>
  <YourComponent />
</RouteGuard>
```

## 快速开始

### 环境要求
- Node.js >= 16
- pnpm >= 7

### 安装依赖
```bash
pnpm install
```

### 开发命令
```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码格式化
pnpm format

# 代码检查
pnpm lint
```

## 开发规范

### 命名规范
- 组件文件使用 PascalCase 命名，如：`Button.tsx`
- 工具函数使用 camelCase 命名，如：`formatDate.ts`
- 样式文件使用与组件相同的名称，如：`Button.module.css`
- 常量使用全大写下划线分隔，如：`MAX_COUNT`

### Git 提交规范
提交信息格式：
```
<type>(<scope>): <subject>
```

type 类型：
- feat: 新功能
- fix: 修复
- docs: 文档更改
- style: 代码格式修改
- refactor: 代码重构
- test: 测试用例修改
- chore: 其他修改

## 项目特性

- ⚡️ 闪电般的热更新速度
- 🔑 完整的 TypeScript 支持
- 📱 响应式设计
- 🎨 模块化 CSS 与 SCSS 支持
- 🔍 ESLint + Prettier 代码规范
- 📦 组件自动导入
- 🚀 自动路由生成
- 🔐 Redux Toolkit 状态管理
- 🔐 内置权限管理
- 📝 Git 提交信息规范化
- 🛣️ 声明式路由配置
- 🔒 路由级别的权限控制

## 常见问题

1. **遇到 React Router Action 重新验证警告？**
    ```
    React Router Future Flag Warning: The revalidation behavior after 4xx/5xx `action` responses 
    is changing in v7...
    ```
    - **简要说明**：这是因为 React Router v7 改变了错误响应后的重新验证行为
    - **快速解决**：在路由配置中添加 `v7_skipActionErrorRevalidation: true`
    - **详细说明**：[查看详情](./docs/QA/router/action-revalidation.md)

2. **遇到 RouterProvider 水合警告？**
    ```
    React Router Future Flag Warning: `RouterProvider` hydration behavior is changing in v7. 
    You can use the `v7_partialHydration` future flag to opt-in early.
    ```
    - **简要说明**：这是因为 React Router v7 改变了组件的水合（hydration）行为
    - **快速解决**：在路由配置中添加 `v7_partialHydration: true`
    - **详细说明**：[查看详情](./docs/QA/router/hydration-behavior.md)

3. **遇到 formMethod 大小写规范化警告？**
    ```
    React Router Future Flag Warning: Casing of `formMethod` fields is being normalized 
    to uppercase in v7. You can use the `v7_normalizeFormMethod` future flag to opt-in early.
    ```
    - **简要说明**：这是因为 React Router v7 将统表单方法的大小写为大写
    - **快速解决**：在路由配置中添加 `v7_normalizeFormMethod: true`
    - **详细说明**：[查看详情](./docs/QA/router/form-method.md)

4. **遇到 Fetcher 持久化警告？**
    ```
    React Router Future Flag Warning: The persistence behavior of fetchers 
    is changing in v7. You can use the `v7_fetcherPersist` future flag to opt-in early.
    ```
    - **简要说明**：这是因为 React Router v7 改变了 fetcher 的持久化行为
    - **快速解决**：在路由配置中添加 `v7_fetcherPersist: true`
    - **详细说明**：[查看详情](./docs/QA/router/fetcher-persist.md)

5. **遇到相对路径解析警告？**
    ```
    React Router Future Flag Warning: Relative route resolution within Splat routes 
    is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early.
    ```
    - **简要说明**：这是因为 React Router v7 改变了通配符路由中的相对路径解析行为
    - **快速解决**：在路由配置中添加 `v7_relativeSplatPath: true`
    - **详细说明**：[查看详情](./docs/QA/router/relative-splat-path.md)

6. **遇到 startTransition 警告？**
    ```
    React Router Future Flag Warning: React Router will begin wrapping state updates 
    in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early.
    ```
    - **简要说明**：这是因为 React Router v7 将使用 React.startTransition 来包装状态更新
    - **快速解决**：在路由配置中添加 `v7_startTransition: true`
    - **详细说明**：[查看详情](./docs/QA/router/start-transition.md)

7. **安装依赖失败？**
    - 检查 Node.js 版本
    - 清除 pnpm 缓存：`pnpm store prune`
    - 删除 node_modules 后重新安装

8. **遇到 SASS @import 弃用警告？**
    ```
    Deprecation Warning: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
    More info and automated migrator: https://sass-lang.com/d/import
    ```
    - **简要说明**：这是因为 Sass 将在 3.0.0 版本中移除 @import 规则
    - **快速解决**：将 SASS 文件中的 @import 替换为 @use
      ```scss
      // 旧写法
      @import './variables.scss';
      
      // 新写法
      @use './variables.scss' as *;
      ```
    - **详细说明**：[Sass 文档](https://sass-lang.com/documentation/at-rules/use)

9. **遇到 ESLint 配置文件加载错误？**
    ```
    Error [ERR_REQUIRE_ESM]: require() of ES Module .eslintrc.js not supported.
    .eslintrc.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module"
    ```
    - **简要说明**：这是因为项目使用了 `"type": "module"` 而 ESLint 配置文件需要使用 CommonJS 格式
    - **快速解决**：将 `.eslintrc.js` 重命名为 `.eslintrc.cjs`
    ```bash
    mv .eslintrc.js .eslintrc.cjs
    ```
    - **其他解决方案**：
      - 在 package.json 中移除 `"type": "module"`
      - 或将配置改为 JSON 格式，使用 `.eslintrc.json`
    
    建议使用第一种方案，因为它最简单且不会影响项目的其他部分。这样可以保持项目使用 ES 模块，同时让 ESLint 配置文件使用 CommonJS 格式。

## 许可证

MIT