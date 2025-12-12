@echo off
echo ==============================================
echo       Antigravity Auto-Deploy Tool
echo ==============================================
echo.

echo 1. Checking git status...
git status
echo.

echo 2. Staging all changes...
git add .
echo.

set /p UserInput="Enter commit message (Press Enter for 'Auto-update'): "
if "%UserInput%"=="" set UserInput=Auto-update

echo 3. Committing with message: "%UserInput%"...
git commit -m "%UserInput%"
echo.

echo 4. Pushing to GitHub (this triggers Netlify)...
git push origin main
echo.

echo ==============================================
echo       Deployment Triggered Successfully
echo ==============================================
pause
