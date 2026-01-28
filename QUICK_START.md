# Quick Reference - Real API Setup

## 30-Second Summary

You now have a **production-ready admin dashboard** with **PostgreSQL database**. 

## Required: PostgreSQL Setup (First Time Only)

```powershell
# 1. Install PostgreSQL from https://www.postgresql.org/download/windows/
# 2. Make sure it's running (check Windows Services)
# 3. Open PowerShell and run:

psql -U postgres -c "CREATE DATABASE datastreet_dev; CREATE USER datastreet WITH PASSWORD 'datastreet_dev_123'; ALTER ROLE datastreet WITH CREATEDB;"
psql -U postgres -d datastreet_dev -c "GRANT ALL PRIVILEGES ON DATABASE datastreet_dev TO datastreet;"

# 4. Set Node.js PATH and run migrations:
$env:PATH = "d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64;" + $env:PATH
cd "d:\Data Street\Website V2"
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

# 5. Start dev server:
npm run dev
```

## Every Time You Start Development

```powershell
$env:PATH = "d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64;" + $env:PATH
cd "d:\Data Street\Website V2"
npm run dev
```

**Note:** PostgreSQL must be running (check Windows Services app)

## Admin Dashboard Access

Visit: http://localhost:3000/admin

## Features

✅ Real database (PostgreSQL with Prisma ORM)
✅ Full CRUD for members and departments
✅ Form validation and error messages
✅ Toast notifications
✅ Search and filter
✅ 74 sample members preloaded
✅ Complete admin UI

## Common Commands

```powershell
# View database
psql -U datastreet -d datastreet_dev

# Seed database
npx prisma db seed

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio (visual database viewer)
npx prisma studio

# Check database status
SELECT * FROM "Member";
SELECT COUNT(*) FROM "Member";
SELECT * FROM "Department";
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "connection refused" | Start PostgreSQL from Windows Services |
| "password authentication failed" | Recreate user with correct password |
| "database does not exist" | Run: `psql -U postgres -c "CREATE DATABASE datastreet_dev;"` |
| "@prisma/client did not initialize" | Run: `npx prisma generate` |

## Files to Know

- `.env.local` - Database connection URL
- `prisma/schema.prisma` - Database schema
- `prisma/seed.ts` - Sample data
- `app/api/` - API routes
- `app/admin/` - Admin pages

## Database

- **Type**: PostgreSQL
- **Host**: localhost
- **Port**: 5432
- **Database**: datastreet_dev
- **User**: datastreet
- **Password**: datastreet_dev_123

## Next: Production

1. Deploy to your hosting (Vercel, Railway, etc.)
2. Update DATABASE_URL to production database
3. Run migrations on production
4. Implement authentication for admin routes
5. Set up SSL/TLS certificates

That's it! You now have a real API with persistent database storage.
