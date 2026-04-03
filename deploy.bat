@echo off
chcp 65001 >nul
echo ========================================
echo   山中一甲子游戏 - GitHub Pages 部署脚本
echo ========================================
echo.

REM 检查是否在Git仓库中
if not exist ".git" (
    echo ❌ 当前目录不是Git仓库
    echo 正在初始化Git仓库...
    git init
    echo ✅ Git仓库初始化完成
)

REM 检查是否有未提交的更改
git status --porcelain >nul 2>&1
if %errorlevel% equ 0 (
    echo 📦 检测到未提交的更改：
    git status --short
    
    REM 添加所有文件
    echo 添加所有文件到暂存区...
    git add .
    
    REM 提交
    set /p "COMMIT_MSG=请输入提交信息（默认：更新游戏内容）："
    if "%COMMIT_MSG%"=="" set COMMIT_MSG=更新游戏内容
    echo 提交更改：'%COMMIT_MSG%'
    git commit -m "%COMMIT_MSG%"
    echo ✅ 提交完成
) else (
    echo 📭 没有检测到未提交的更改
)

REM 检查远程仓库
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  未设置远程仓库
    echo 请先设置远程仓库：
    echo   git remote add origin https://github.com/你的用户名/仓库名.git
    echo 然后重新运行此脚本
    pause
    exit /b 1
)

git remote get-url origin > temp.txt
set /p REMOTE_URL=<temp.txt
del temp.txt
echo 📡 远程仓库：%REMOTE_URL%

REM 推送更改
echo 推送更改到GitHub...
git push origin main
if %errorlevel% equ 0 (
    echo ✅ 推送成功！
    echo.
    echo 🎮 游戏部署信息：
    echo   1. 请访问仓库的 'Settings' → 'Pages'
    echo   2. 确保 'Source' 设置为 'main' 分支，'/(root)' 文件夹
    echo   3. 等待约1-2分钟，GitHub Pages 会自动部署
    echo   4. 游戏地址：https://你的用户名.github.io/仓库名
) else (
    echo ❌ 推送失败
    echo 请检查：
    echo   1. GitHub 仓库权限
    echo   2. 网络连接
    echo   3. 远程分支名称
)

echo.
echo 📱 手机/其他电脑访问：
echo   打开浏览器，输入上面显示的地址即可玩游戏
echo   游戏数据保存在浏览器本地存储中
pause