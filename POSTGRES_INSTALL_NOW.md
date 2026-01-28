# 🚀 IMMEDIATE ACTION: PostgreSQL Setup

## REQUIRED: Install PostgreSQL First

### ⚠️ BEFORE DOING ANYTHING ELSE:

1. **Download PostgreSQL 15** from: https://www.postgresql.org/download/windows/
   
2. **Run the installer** with these settings:
   - Installation directory: Default (C:\Program Files\PostgreSQL\15)
   - Superuser password: `postgres` (or something you remember)
   - Port: 5432
   - Locale: Default
   
3. **During install, check:**
   - ✅ PostgreSQL Server
   - ✅ pgAdmin 4 (helpful GUI tool)
   - ✅ Command Line Tools (psql)
   - ✅ Stack Builder (optional)

4. **Finish installation** and **restart your computer** (important!)

---

## ✅ After PostgreSQL is Installed:

Once PostgreSQL service is running, open PowerShell and run these commands **exactly**:

### Step 1: Create Database
```powershell
# Open PostgreSQL command prompt
psql -U postgres -h localhost

# Then paste these commands one by one:
CREATE DATABASE datastreet_dev;
CREATE USER datastreet WITH ENCRYPTED PASSWORD 'datastreet_dev_123';
GRANT ALL PRIVILEGES ON DATABASE datastreet_dev TO datastreet;

# Exit
\q
```

### Step 2: Setup Prisma & Seed Data
```powershell
# Set Node path
$env:PATH = "d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64;" + $env:PATH

# Navigate to project
cd "d:\Data Street\Website V2"

# Generate Prisma client
npx prisma generate

# Create tables
npx prisma migrate dev --name init

# Add sample data (74 members, 8 departments)
npx prisma db seed
```

### Step 3: Start Server
```powershell
npm run dev
```

### Step 4: Test It
- Go to: http://localhost:3000/admin
- Login with default password: `admin123`
- You should see 74 members from the database!

---

## ✅ Verify It's Working

Run this to confirm database has data:
```powershell
# Connect to database
psql -U datastreet -d datastreet_dev -h localhost

# Check data
SELECT COUNT(*) FROM "Member";
SELECT COUNT(*) FROM "Department";

# Exit
\q
```

**Expected output:**
```
 count 
-------
    74
(1 row)

 count 
-------
     8
(1 row)
```

---

## 🔒 Security Notes for Production

When deploying to production:

1. Change admin password:
   ```powershell
   # Generate bcrypt hash
   node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD', 10))"
   ```
   
   Then update `.env` with the hash

2. Use strong database password (not `datastreet_dev_123`)

3. Use HTTPS (Let's Encrypt certificate)

4. Set `API_RATE_LIMIT_ENABLED=true`

---

## Common Issues

| Issue | Solution |
|-------|----------|
| "connection refused" | PostgreSQL not running. Start from Services app |
| "password authentication failed" | Wrong password. Check `.env.local` |
| "database does not exist" | Run Step 1 again |
| "relation does not exist" | Run `npx prisma migrate deploy` |

---

## Next: Test Admin Dashboard

Once database is running:

1. ✅ Dashboard shows "74 Members" stat
2. ✅ Can search/filter members
3. ✅ Can add new member (appears immediately)
4. ✅ Can edit member details
5. ✅ Can delete member (gone from database)
6. ✅ Data persists after page refresh

All data is **real PostgreSQL**, not in-memory!

---

**Questions?** See `POSTGRES_SETUP.md` for detailed troubleshooting.
