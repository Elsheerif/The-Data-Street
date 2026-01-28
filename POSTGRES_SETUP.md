# PostgreSQL Setup Guide for Data Street Admin Dashboard

## Prerequisites

You need PostgreSQL installed and running on your system.

### Windows Installation

**Option 1: Using PostgreSQL Installer**
1. Download from https://www.postgresql.org/download/windows/
2. Run the installer
3. Note the password for the `postgres` user
4. Default port is 5432

**Option 2: Using Chocolatey**
```powershell
choco install postgresql
```

**Option 3: Using Windows Subsystem for Linux (WSL)**
```bash
wsl
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

## Quick Start (5 minutes)

### 1. Start PostgreSQL

**Windows (if using PostgreSQL service):**
```powershell
# PostgreSQL should already be running as a service
# Check Services app or use:
Get-Service PostgreSQL*
```

**WSL:**
```bash
sudo service postgresql start
```

### 2. Create Database

```powershell
# Set Node.js PATH
$env:PATH = "d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64;" + $env:PATH

# Create database and user
psql -U postgres -c "CREATE DATABASE datastreet_dev;"
psql -U postgres -c "CREATE USER datastreet WITH PASSWORD 'datastreet_dev_123';"
psql -U postgres -c "ALTER ROLE datastreet WITH CREATEDB;"
psql -U postgres -d datastreet_dev -c "GRANT ALL PRIVILEGES ON DATABASE datastreet_dev TO datastreet;"
```

### 3. Update .env.local

The DATABASE_URL should already be set. Verify it matches:
```
DATABASE_URL="postgresql://datastreet:datastreet_dev_123@localhost:5432/datastreet_dev?schema=public"
```

### 4. Generate Prisma Client & Run Migration

```powershell
# Set PATH again
$env:PATH = "d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64;" + $env:PATH

# Navigate to project
cd "d:\Data Street\Website V2"

# Generate Prisma client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name init

# Seed database with sample data
npx prisma db seed
```

### 5. Start Development Server

```powershell
$env:PATH = "d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64;" + $env:PATH
npm run dev
```

Visit http://localhost:3000/admin

## Troubleshooting

### PostgreSQL Connection Errors

**Error: "connection refused"**
- PostgreSQL service is not running
- Windows: Start PostgreSQL from Services app
- WSL: Run `sudo service postgresql start`

**Error: "password authentication failed"**
- Check credentials in .env.local
- Recreate the user:
```powershell
psql -U postgres -c "DROP USER datastreet;"
psql -U postgres -c "CREATE USER datastreet WITH PASSWORD 'datastreet_dev_123';"
psql -U postgres -c "ALTER ROLE datastreet WITH CREATEDB;"
```

**Error: "database does not exist"**
- Create database again:
```powershell
psql -U postgres -c "CREATE DATABASE datastreet_dev;"
psql -U postgres -d datastreet_dev -c "GRANT ALL PRIVILEGES ON DATABASE datastreet_dev TO datastreet;"
```

### Prisma Errors

**Error: "@prisma/client did not initialize yet"**
1. Run: `npx prisma generate`
2. Make sure .env.local has correct DATABASE_URL
3. Restart dev server

**Error: "migration not found"**
1. Check migrations folder: `prisma/migrations/`
2. If empty, run: `npx prisma migrate dev --name init`

## Database Commands

### View Database

```powershell
# Connect to database
psql -U datastreet -d datastreet_dev -h localhost

# List tables
\dt

# View members table
SELECT * FROM "Member";

# View departments table
SELECT * FROM "Department";

# Exit
\q
```

### Reset Database

```powershell
# Reset everything (WARNING: deletes all data!)
npx prisma migrate reset

# Or manually:
psql -U postgres -c "DROP DATABASE datastreet_dev;"
psql -U postgres -c "CREATE DATABASE datastreet_dev;"
psql -U postgres -d datastreet_dev -c "GRANT ALL PRIVILEGES ON DATABASE datastreet_dev TO datastreet;"
```

### Seed Database

```powershell
npx prisma db seed
```

This loads 74 sample members across 8 departments from `prisma/seed.ts`

## Production Setup

For production deployment, use a managed PostgreSQL service like:
- AWS RDS PostgreSQL
- Azure Database for PostgreSQL
- DigitalOcean Managed Databases
- Supabase (PostgreSQL-based)
- Railway

Update DATABASE_URL in your production environment variables.

## API Endpoints

### Members
- `GET /api/members` - List all members
- `GET /api/members?status=ACTIVE` - Filter by status
- `GET /api/members?search=John` - Search
- `POST /api/members` - Create member
- `GET /api/members/[id]` - Get member
- `PUT /api/members/[id]` - Update member
- `DELETE /api/members/[id]` - Delete member

### Departments
- `GET /api/departments` - List all departments
- `POST /api/departments` - Create department
- `GET /api/departments/[id]` - Get department
- `PUT /api/departments/[id]` - Update department
- `DELETE /api/departments/[id]` - Delete department

## Next Steps

1. Set up PostgreSQL (follow Quick Start above)
2. Update DATABASE_URL in .env.local
3. Run Prisma migration
4. Seed database
5. Start dev server
6. Test admin dashboard

## Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Verify PostgreSQL is running
3. Verify DATABASE_URL is correct
4. Check Prisma schema in `prisma/schema.prisma`
5. View logs: `npm run dev` outputs to terminal
