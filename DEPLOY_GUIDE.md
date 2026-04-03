# 山中一甲子游戏 - GitHub Pages 部署指南

本指南将帮助你将游戏部署到 GitHub Pages，实现在任何设备上通过域名访问游戏。

## 📋 准备工作

### 1. 注册 GitHub 账号
- 访问 [GitHub](https://github.com)
- 点击 "Sign up" 注册新账号
- 完成邮箱验证

### 2. 安装 Git（可选，推荐）
- **Windows**：[Git for Windows](https://gitforwindows.org/)
- **Mac**：`brew install git`
- **Linux**：`sudo apt install git`

或使用 **GitHub Desktop** 客户端（更简单）：
- 下载地址：[GitHub Desktop](https://desktop.github.com/)

## 🚀 快速部署步骤

### 方法一：使用 GitHub Desktop（最简单）

1. **下载并安装 GitHub Desktop**
2. **登录你的 GitHub 账号**
3. **创建新仓库**：
   - 点击 "File" → "New repository"
   - 仓库名：`mountain-game`（或你喜欢的名字）
   - 本地路径：选择当前游戏文件夹
   - 点击 "Create repository"

4. **提交游戏文件**：
   - GitHub Desktop 会自动检测所有文件
   - 输入提交信息，如 "添加山中一甲子游戏"
   - 点击 "Commit to main"

5. **发布到 GitHub**：
   - 点击 "Publish repository"
   - 确保选中 "Public"（公开）
   - 点击 "Publish"

### 方法二：使用 Git 命令行

1. **打开终端/命令提示符**
2. **进入游戏文件夹**：
   ```bash
   cd c:\Users\huang\CodeBuddy\20260403100429
   ```

3. **初始化仓库**：
   ```bash
   git init
   git add .
   git commit -m "添加山中一甲子游戏"
   ```

4. **创建 GitHub 仓库**：
   - 访问 https://github.com/new
   - 仓库名：`mountain-game`
   - 选择 **Public**（公开）
   - 不要勾选 "Initialize this repository with..."（我们已经有了文件）

5. **连接并推送**：
   ```bash
   git branch -M main
   git remote add origin https://github.com/你的用户名/mountain-game.git
   git push -u origin main
   ```

### 方法三：使用部署脚本（推荐）

1. **Windows 用户**：双击 `deploy.bat`
2. **Mac/Linux 用户**：在终端运行 `./deploy.sh`

脚本会自动：
- 检查 Git 状态
- 提交更改
- 推送到 GitHub

## 🌐 启用 GitHub Pages

### 1. 进入仓库设置
- 打开你的仓库页面：`https://github.com/你的用户名/mountain-game`
- 点击 "Settings"（设置）
- 左侧菜单点击 "Pages"（页面）

### 2. 配置部署源
- **Source**（来源）：选择 `Deploy from a branch`
- **Branch**（分支）：选择 `main`
- **Folder**（文件夹）：选择 `/ (root)`
- 点击 "Save"（保存）

### 3. 等待部署
- GitHub 会自动开始部署（约1-2分钟）
- 部署完成后，你会看到：
  ```
  Your site is published at https://你的用户名.github.io/mountain-game/
  ```

### 4. 访问游戏
- 打开上面的链接
- 游戏加载完成即可开始游玩

## 📱 多设备访问

### 手机访问
1. 打开手机浏览器
2. 输入：`https://你的用户名.github.io/mountain-game`
3. 添加到主屏幕（可选）：游戏支持 PWA

### 其他电脑访问
1. 在其他电脑上打开浏览器
2. 输入相同的网址
3. 游戏数据保存在各设备的浏览器本地存储中

## 🔧 高级配置

### 1. 自定义域名
如果你有自己的域名：
1. 在仓库 "Settings" → "Pages" 的 "Custom domain" 输入你的域名
2. 按照提示配置 DNS 记录
3. 游戏可通过你的域名访问，如：`https://game.yourdomain.com`

### 2. 自动部署
每次你推送新代码到 `main` 分支时，GitHub Pages 会自动重新部署。

### 3. 查看部署历史
在仓库页面点击 "Actions" 标签，可以查看所有部署记录。

## 💾 数据保存说明

### 浏览器本地存储
- 游戏数据保存在各设备的浏览器本地存储中
- **手机、电脑独立存储**：不同设备的数据不共享
- **同一设备**：相同浏览器共享数据

### 数据迁移（可选）
如果你想在不同设备间同步数据：
1. 导出数据：游戏目前没有导出功能
2. 手动备份：可通过浏览器开发者工具导出 localStorage 数据
3. 恢复：在另一设备导入相同数据

## 🔍 常见问题

### Q: 部署后页面显示 404？
A: 等待1-2分钟，GitHub Pages 需要时间构建。

### Q: 如何更新游戏？
A: 修改文件后，提交并推送到 GitHub，GitHub Pages 会自动更新。

### Q: 手机访问很慢？
A: GitHub Pages 在国内访问可能较慢，建议使用加速器或部署到国内平台。

### Q: 可以设置密码保护吗？
A: GitHub Pages 不支持密码保护，如需隐私保护可设置为私有仓库。

### Q: 游戏支持移动端吗？
A: 是的，游戏采用响应式设计，适配手机和平板。

## 📊 部署状态检查

部署成功后，你可以：
1. 访问 `https://你的用户名.github.io/mountain-game/`
2. 查看控制台有无错误
3. 测试所有游戏功能

## 🆘 技术支持

如果遇到问题：
1. 检查 [GitHub Pages 文档](https://docs.github.com/en/pages)
2. 在游戏仓库提交 Issues
3. 查看部署日志（仓库 → Actions）

---

🎉 **恭喜！你的游戏现已部署完成，可以在任何设备上访问了！**

**手机、电脑、平板，随时随地享受五行平衡之旅！**