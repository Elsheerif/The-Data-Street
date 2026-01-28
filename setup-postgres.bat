@echo off
REM Data Street Admin Dashboard - PostgreSQL Setup
REM This script sets up PostgreSQL and runs migrations

echo.
echo ========================================
echo Data Street Admin Dashboard Setup
echo ========================================
echo.

REM Set Node.js to PATH
set "NODE_PATH=d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64"
set "PATH=%NODE_PATH%;%PATH%"

echo Checking Node.js installation...
node --version
npm --version

echo.
echo ========================================
echo PostgreSQL Database Setup Instructions
echo ========================================
echo.
echo Before running this script, please:
echo.
echo 1. Install PostgreSQL from: https://www.postgresql.org/download/windows/
echo.
echo 2. Make sure PostgreSQL is running (check Services app)
echo.
echo 3. Create the database by running these commands in PowerShell:
echo.
echo    psql -U postgres -c "CREATE DATABASE datastreet_dev;"
echo    psql -U postgres -c "CREATE USER datastreet WITH PASSWORD 'datastreet_dev_123';"
echo    psql -U postgres -c "ALTER ROLE datastreet WITH CREATEDB;"
echo    psql -U postgres -d datastreet_dev -c "GRANT ALL PRIVILEGES ON DATABASE datastreet_dev TO datastreet;"
echo.
echo 4. Verify DATABASE_URL in .env.local:
echo    DATABASE_URL="postgresql://datastreet:datastreet_dev_123@localhost:5432/datastreet_dev?schema=public"
echo.
echo ========================================
echo Running Prisma Setup
echo ========================================
echo.

echo Installing dependencies...
npm install

echo.
echo Generating Prisma client...
npx prisma generate

echo.
echo Running database migration...
npx prisma migrate dev --name init

echo.
echo Seeding database with sample data...
npx prisma db seed

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo  1. Start the dev server: npm run dev
echo  2. Visit http://localhost:3000/admin
echo  3. Enjoy your admin dashboard!
echo.
pause
