# 🚀 START HERE - Real API Setup Guide

## What's Been Done ✅

All your admin pages have been converted to use a **real PostgreSQL database** instead of mock data. No more simulated delays—this is production-ready!

### Files Modified:
- `app/admin/page.tsx` - Dashboard with real stats
- `app/admin/members/page.tsx` - Members list with real data
- `app/admin/members/add/page.tsx` - Create member with real API
- `app/admin/members/[id]/page.tsx` - Edit member with real API
- `.env.local` - PostgreSQL connection string
- `prisma/schema.prisma` - Changed from SQLite to PostgreSQL
- `package.json` - Added Prisma scripts

## What You Need to Do 🛠️

### Step 1: Install PostgreSQL (One-time only)

**Windows Users:**
1. Download: https://www.postgresql.org/download/windows/
2. Run installer → accept defaults
3. Remember the password you set for `postgres` user
4. Installation should add PostgreSQL to your PATH

**WSL/WSL2 Users:** See `POSTGRES_SETUP.md` for detailed instructions

### Step 2: Create Database & User

Open **Command Prompt** or **PowerShell** and run:

```powershell
psql -U postgres
```

When prompted, enter the password you created during PostgreSQL installation.

Then copy-paste these commands one by one:

```sql
CREATE DATABASE datastreet_dev;
CREATE USER datastreet WITH PASSWORD 'datastreet_dev_123';
ALTER ROLE datastreet CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE datastreet_dev TO datastreet;
\c datastreet_dev
GRANT ALL PRIVILEGES ON SCHEMA public TO datastreet;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO datastreet;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO datastreet;
\q
```

✅ Database is now ready!

### Step 3: Initialize Prisma & Seed Data

In your project folder (`d:\Data Street\Website V2`), open **PowerShell** and run:

```powershell
# Set Node.js path
$env:PATH = "$PWD\node-temp\node-v22.10.0-win-x64;$env:PATH"

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create tables (migrations)
npx prisma migrate dev --name init

# Seed database with 74 sample members
npx prisma db seed
```

✅ Database is now populated!

### Step 4: Start Development Server

```powershell
npm run dev
```

### Step 5: Test the Dashboard

1. Open browser: http://localhost:3000/admin
2. You should see:
   - Dashboard with **74 total members**, **8 departments**
   - Members list with real data
   - Full CRUD: Create, Read, Update, Delete members
   - Real-time data persistence (refresh the page—data stays!)

## 🎯 Expected Results

### Dashboard Stats
- **Total Members**: 74
- **Active Members**: Will vary based on status filtering
- **Departments**: 8 (Engineering, Marketing, Design, Sales, Support, HR, Finance, Operations)

### Sample Member Data
```
Name: Alice Johnson
Email: alice@datastreet.com
Phone: (555) 101-0002
Role: Senior Engineer
Department: Engineering
Status: ACTIVE
```

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| `psql: command not found` | PostgreSQL PATH not set. Restart Command Prompt or reinstall PostgreSQL |
| `role "datastreet" already exists` | Database already created. Run `\q` to exit, then continue |
| `@prisma/client did not initialize yet` | Run: `npx prisma generate` |
| `Can't connect to database` | Check DATABASE_URL in `.env.local` matches your db credentials |
| `No data showing on dashboard` | Run: `npx prisma db seed` to populate test data |

## 📚 Documentation

For more details, see:
- **`QUICK_START.md`** - Quick command reference
- **`REAL_API.md`** - Complete API documentation
- **`POSTGRES_SETUP.md`** - Detailed PostgreSQL setup (all OSes)
- **`IMPLEMENTATION_SUMMARY.md`** - Full technical overview

## 🎉 You're All Set!

Once you see the admin dashboard loading with 74 members, the real API migration is complete. All data is now persisted to PostgreSQL instead of in-memory mock data.

**Questions?** Check the troubleshooting tables in the documentation files above.
