# 个人简历网站

这是一个基于React+TypeScript构建的个人简历网站，具有星光宇宙背景和现代UI设计。

## 运行步骤

1. 确保已安装Node.js（推荐v16+）和pnpm
   - 安装pnpm: `npm install -g pnpm`

2. 克隆或下载项目到本地

3. 在VSCode中打开项目文件夹

4. 打开终端（Ctrl+` 或 查看 > 终端）

5. 安装依赖:
   ```bash
   pnpm install
   ```

6. 启动开发服务器:
   ```bash
   pnpm dev
   ```

7. 在浏览器中访问 http://localhost:3000 查看网站

## 项目结构

- `src/pages/Home.tsx` - 引导页
- `src/pages/Resume.tsx` - 详细简历页
- `src/components/` - 可复用组件
- `src/index.css` - 全局样式