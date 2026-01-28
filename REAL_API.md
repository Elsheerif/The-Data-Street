# Real API with PostgreSQL Database - Implementation Guide

## Overview

The admin dashboard has been successfully converted from mock API to use a **real PostgreSQL database** with **Prisma ORM**. All CRUD operations now work with persistent database storage.

## What Changed

### Before (Mock API)
- ❌ In-memory data using localStorage
- ❌ 300-400ms simulated delays
- ❌ Data lost on server restart
- ✅ No database setup required
- ✅ Instant feedback for development

### After (Real API + PostgreSQL)
- ✅ Persistent database storage
- ✅ Real-world performance
- ✅ Production-ready implementation
- ✅ Full ACID compliance
- ✅ Scalable architecture
- ⚠️ Requires PostgreSQL setup

## Architecture

```
Frontend (Next.js App)
    ↓
Next.js API Routes (/api/members, /api/departments)
    ↓
Prisma ORM
    ↓
PostgreSQL Database
```

## Setup Instructions (5-10 minutes)

### Step 1: Install PostgreSQL

**Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Run installer
3. Remember the `postgres` password
4. Keep default port 5432

**WSL:**
```bash
sudo apt update && sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

### Step 2: Create Database & User

Open PowerShell and run:

```powershell
# Connect to PostgreSQL
psql -U postgres

# Inside psql, create database
CREATE DATABASE datastreet_dev;

# Create user
CREATE USER datastreet WITH PASSWORD 'datastreet_dev_123';

# Grant permissions
ALTER ROLE datastreet WITH CREATEDB;
\c datastreet_dev
GRANT ALL PRIVILEGES ON DATABASE datastreet_dev TO datastreet;

# Exit
\q
```

Or run in one command:
```powershell
psql -U postgres -c "CREATE DATABASE datastreet_dev; CREATE USER datastreet WITH PASSWORD 'datastreet_dev_123'; ALTER ROLE datastreet WITH CREATEDB;" -d postgres; psql -U postgres -d datastreet_dev -c "GRANT ALL PRIVILEGES ON DATABASE datastreet_dev TO datastreet;"
```

### Step 3: Verify .env.local

The file should contain:
```env
DATABASE_URL="postgresql://datastreet:datastreet_dev_123@localhost:5432/datastreet_dev?schema=public"
```

### Step 4: Run Migrations & Seed

```powershell
# Set Node.js PATH
$env:PATH = "d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64;" + $env:PATH

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create database schema
npx prisma migrate dev --name init

# Load sample data (74 members, 8 departments)
npx prisma db seed
```

### Step 5: Start Development Server

```powershell
$env:PATH = "d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64;" + $env:PATH
npm run dev
```

Visit http://localhost:3000/admin

## Database Schema

### Members Table
```sql
CREATE TABLE "Member" (
  id INT PRIMARY KEY AUTO INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  photoUrl VARCHAR(500),
  bio TEXT,
  roleTitle VARCHAR(255),
  departmentId INT FOREIGN KEY,
  committeeId INT FOREIGN KEY,
  skills TEXT[],
  joinDate TIMESTAMP,
  socialLinkedIn VARCHAR(500),
  socialGitHub VARCHAR(500),
  status ENUM('ACTIVE', 'ALUMNI', 'INACTIVE'),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Departments Table
```sql
CREATE TABLE "Department" (
  id INT PRIMARY KEY AUTO INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

## API Routes

All routes are in `app/api/`:

### Members
```
GET     /api/members                 # List all members
GET     /api/members?status=ACTIVE   # Filter by status
GET     /api/members?search=John     # Search members
GET     /api/members/[id]            # Get specific member
POST    /api/members                 # Create member
PUT     /api/members/[id]            # Update member
DELETE  /api/members/[id]            # Delete member
```

### Departments
```
GET     /api/departments             # List all departments
POST    /api/departments             # Create department
GET     /api/departments/[id]        # Get specific department
PUT     /api/departments/[id]        # Update department
DELETE  /api/departments/[id]        # Delete department
```

## Admin UI Pages

### Dashboard (`/admin`)
- Real-time member statistics
- Active member count
- Department count
- Quick action buttons

### Members (`/admin/members`)
- List all members with search and filter
- Filter by status (Active, Alumni, Inactive)
- Delete member with confirmation
- Edit and view member details

### Add Member (`/admin/members/add`)
- Form validation (email, phone, URL)
- Real-time error feedback
- Department assignment
- Status selection
- Social profile links

### Edit Member (`/admin/members/[id]`)
- Load existing member data
- Update any field
- Full validation on submit
- Error notifications

### Departments (`/admin/departments`)
- List departments
- Manage department info
- Delete protection for departments with members

### Settings (`/admin/settings`)
- Organization configuration
- Feature toggles
- System settings

## Code Changes Summary

### Updated Files
1. **lib/prisma.ts** - Prisma client instance (existing, unchanged)
2. **prisma/schema.prisma** - Changed `sqlite` → `postgresql`
3. **.env.local** - Added proper DATABASE_URL
4. **app/admin/page.tsx** - Uses `/api/members` endpoint
5. **app/admin/members/page.tsx** - Fetches from real API
6. **app/admin/members/add/page.tsx** - Creates via API
7. **app/admin/members/[id]/page.tsx** - Updates via API
8. **app/api/members/route.ts** - Real API implementation
9. **app/api/departments/route.ts** - Real API implementation
10. **package.json** - Added scripts and ts-node

### Created Files
1. **prisma/seed.ts** - Database seeding script (74 sample members)
2. **POSTGRES_SETUP.md** - Setup guide
3. **setup-postgres.bat** - Automated setup script
4. **REAL_API.md** - This file

## Sample Data

The seed script creates:
- **8 Departments**: Engineering, Marketing, Design, Sales, Support, HR, Finance, Operations
- **74 Members** across all departments with realistic data:
  - Names
  - Email addresses
  - Phone numbers
  - Role titles
  - Bio descriptions
  - Department assignments
  - Join dates
  - Status (Active/Alumni)
  - Social links (LinkedIn, GitHub)

## Troubleshooting

### "connection refused"
**Solution:** PostgreSQL is not running
- Windows: Check Services app for PostgreSQL
- WSL: Run `sudo service postgresql start`

### "FATAL: password authentication failed"
**Solution:** Wrong password
- Recreate user:
```powershell
psql -U postgres -c "DROP USER datastreet;"
psql -U postgres -c "CREATE USER datastreet WITH PASSWORD 'datastreet_dev_123';"
psql -U postgres -c "ALTER ROLE datastreet WITH CREATEDB;"
```

### "@prisma/client did not initialize yet"
**Solution:** Run migrations and generate client
```powershell
npx prisma generate
npx prisma migrate dev --name init
```

### "database 'datastreet_dev' does not exist"
**Solution:** Create database
```powershell
psql -U postgres -c "CREATE DATABASE datastreet_dev;"
psql -U postgres -d datastreet_dev -c "GRANT ALL PRIVILEGES ON DATABASE datastreet_dev TO datastreet;"
```

### Port 5432 already in use
**Solution:** Change DATABASE_URL port or stop other PostgreSQL instance
```env
DATABASE_URL="postgresql://datastreet:datastreet_dev_123@localhost:5433/datastreet_dev?schema=public"
```

## Performance

Expected response times:
- List members: 50-100ms
- Get single member: 30-50ms
- Create member: 100-150ms
- Update member: 100-150ms
- Delete member: 80-120ms

These times will vary based on:
- Database server performance
- Network latency
- System load
- Query complexity

## Backup & Restore

### Backup Database
```powershell
pg_dump -U datastreet -h localhost datastreet_dev > backup.sql
```

### Restore Database
```powershell
psql -U datastreet -h localhost datastreet_dev < backup.sql
```

## Production Deployment

For production, use managed PostgreSQL services:
- **AWS RDS** - amazon.com/rds
- **Azure Database** - microsoft.com/en-us/sql-cloud
- **DigitalOcean** - digitalocean.com/products/managed-databases
- **Supabase** - supabase.com (PostgreSQL + Auth)
- **Railway** - railway.app

Update `DATABASE_URL` in your production environment with the managed database connection string.

## Next Steps

1. ✅ Setup PostgreSQL (follow above)
2. ✅ Run migrations and seed
3. ✅ Start dev server
4. ✅ Test admin dashboard
5. 🚀 Deploy to production

## Support

For issues:
1. Check Troubleshooting section
2. Verify PostgreSQL is running: `psql -U postgres -l`
3. Check DATABASE_URL in .env.local
4. Review terminal logs when starting dev server
5. Check browser console for errors

## Security Notes

- ⚠️ Never commit `.env.local` to version control
- ⚠️ Use strong passwords in production
- ⚠️ Implement proper authentication for admin routes
- ⚠️ Use SSL/TLS in production
- ⚠️ Regular database backups
- ⚠️ Keep Prisma and dependencies updated
