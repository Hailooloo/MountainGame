#!/bin/bash

# 山中一甲子游戏 - GitHub Pages 部署脚本
# 使用方法：./deploy.sh [提交信息]

echo "=== 山中一甲子游戏部署脚本 ==="
echo ""

# 检查是否在Git仓库中
if [ ! -d ".git" ]; then
    echo "❌ 当前目录不是Git仓库"
    echo "正在初始化Git仓库..."
    git init
    echo "✅ Git仓库初始化完成"
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "📦 检测到未提交的更改："
    git status --short
    
    # 添加所有文件
    echo "添加所有文件到暂存区..."
    git add .
    
    # 提交
    COMMIT_MSG=${1:-"更新游戏内容"}
    echo "提交更改：'$COMMIT_MSG'"
    git commit -m "$COMMIT_MSG"
    echo "✅ 提交完成"
else
    echo "📭 没有检测到未提交的更改"
fi

# 检查远程仓库
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")
if [ -z "$REMOTE_URL" ]; then
    echo "⚠️  未设置远程仓库"
    echo "请先设置远程仓库："
    echo "  git remote add origin https://github.com/你的用户名/仓库名.git"
    echo "然后重新运行此脚本"
    exit 1
fi

echo "📡 远程仓库：$REMOTE_URL"

# 推送更改
echo "推送更改到GitHub..."
if git push origin main; then
    echo "✅ 推送成功！"
    echo ""
    echo "🎮 游戏部署信息："
    echo "  1. 请访问仓库的 'Settings' → 'Pages'"
    echo "  2. 确保 'Source' 设置为 'main' 分支，'/(root)' 文件夹"
    echo "  3. 等待约1-2分钟，GitHub Pages 会自动部署"
    echo "  4. 游戏地址：https://你的用户名.github.io/仓库名"
else
    echo "❌ 推送失败"
    echo "请检查："
    echo "  1. GitHub 仓库权限"
    echo "  2. 网络连接"
    echo "  3. 远程分支名称"
fi

echo ""
echo "📱 手机/其他电脑访问："
echo "  打开浏览器，输入上面显示的地址即可玩游戏"
echo "  游戏数据保存在浏览器本地存储中"