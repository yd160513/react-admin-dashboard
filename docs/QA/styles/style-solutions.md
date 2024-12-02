# 样式解决方案对比

## 问题描述
项目中的 CSS Modules 和 SASS/SCSS 各自的使用场景是什么？

## 解答

### CSS Modules
适用场景：
- 组件级别的样式隔离
- 需要避免样式冲突
- 需要样式模块化管理

优势：
- 局部作用域
- 避免命名冲突
- 更好的样式复用
- 与 TypeScript 结合提供类型提示

### SASS/SCSS
适用场景：
- 需要更强大的 CSS 预处理功能
- 需要维护大量样式代码
- 需要样式的嵌套和复用

优势：
- 变量支持
- 嵌套规则
- Mixins 和函数
- 模块化导入
- 数学运算

### 结合使用
在实际项目中，我们常常结合两者使用：

1. **文件命名**：
```
Component.module.scss  // 结合 CSS Modules 和 SCSS
```

2. **使用示例**：
```scss
// variables.scss
$primary-color: #1890ff;
$border-radius: 4px;

// Component.module.scss
@import './variables.scss';

.container {
  border-radius: $border-radius;
  
  .header {
    color: $primary-color;
    
    &:hover {
      opacity: 0.8;
    }
  }
}
```

3. **在组件中使用**：
```tsx
import styles from './Component.module.scss'

const Component = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        标题
      </header>
    </div>
  )
}
```

### 最佳实践建议

1. **CSS Modules 用于**：
   - 组件级别的样式
   - 需要样式隔离的场景
   - 与 JavaScript/TypeScript 紧密结合的样式

2. **SCSS 用于**：
   - 全局样式定义
   - 变量和 mixins 管理
   - 复杂的样式嵌套
   - 主题定制

3. **项目结构建议**：
```
src/
├── styles/
│   ├── variables.scss     # 全局变量
│   ├── mixins.scss       # 全局 mixins
│   └── global.scss       # 全局样式
└── components/
    └── Button/
        ├── index.tsx
        └── style.module.scss  # 组件样式
```

## 结论

1. CSS Modules 和 SCSS 各有优势，可以结合使用：
   - CSS Modules 提供样式隔离
   - SCSS 提供强大的预处理能力

2. 选择依据：
   - 组件样式：优先使用 CSS Modules
   - 全局样式：使用 SCSS
   - 需要预处理：使用 SCSS
   - 需要隔离：使用 CSS Modules

3. 通过合理组合，可以同时获得：
   - 样式隔离
   - 代码复用
   - 维护性
   - 开发效率 