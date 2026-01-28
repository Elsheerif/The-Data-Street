@echo off
REM Setup script for Data Street Website development environment
REM This script adds Node.js to PATH and starts the development server

echo Setting up Data Street development environment...

REM Add Node.js to PATH
set "NODE_PATH=d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64"
set "PATH=%NODE_PATH%;%PATH%"

REM Verify Node is available
node --version
if errorlevel 1 (
    echo Error: Node.js not found at %NODE_PATH%
    pause
    exit /b 1
)

npm --version
if errorlevel 1 (
    echo Error: npm not found
    pause
    exit /b 1
)

echo.
echo ✓ Node.js and npm are available
echo ✓ Starting development server...
echo.

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Start development server
call npm run dev

pause
