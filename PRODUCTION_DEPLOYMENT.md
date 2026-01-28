# 🚀 Production Deployment Guide

## Overview

This guide covers deploying the Data Street Website V2 with real PostgreSQL database to production.

## Pre-Deployment Checklist

### Environment Setup
- [ ] Set `NODE_ENV=production` in deployment environment
- [ ] Generate secure `ADMIN_SESSION_SECRET` (min 32 characters, random)
- [ ] Set `ADMIN_PASSWORD_HASH` using bcrypt (see below)
- [ ] Configure production PostgreSQL database
- [ ] Set `NEXT_PUBLIC_API_URL` to production domain
- [ ] Enable `API_RATE_LIMIT_ENABLED=true`
- [ ] Verify all environment variables are set

### Database Setup
```bash
# Create production database
psql -U postgres -h your-db-host

CREATE DATABASE datastreet_prod;
CREATE USER datastreet_prod WITH PASSWORD 'very-long-secure-password';
GRANT ALL PRIVILEGES ON DATABASE datastreet_prod TO datastreet_prod;
\c datastreet_prod
GRANT ALL PRIVILEGES ON SCHEMA public TO datastreet_prod;

# Run migrations
npx prisma migrate deploy
```

### Authentication
```bash
# Generate bcrypt hash for password
node -e "console.log(require('bcryptjs').hashSync('your-secure-password', 10))"

# Use output in ADMIN_PASSWORD_HASH environment variable
```

## Deployment Platforms

### Vercel (Recommended for Next.js)
```bash
# 1. Push to GitHub
git push origin main

# 2. Import in Vercel Dashboard
# - Select repository
# - Add environment variables
# - Deploy

# Environment variables to add:
DATABASE_URL=postgresql://user:pass@host:5432/db
ADMIN_SESSION_SECRET=your-secret-key
ADMIN_PASSWORD_HASH=bcrypt-hash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com
API_RATE_LIMIT_ENABLED=true
```

### AWS EC2 + RDS
```bash
# 1. Launch EC2 instance (Node.js 22+)
# 2. Create RDS PostgreSQL instance
# 3. SSH into instance

# Clone and setup
git clone your-repo
cd Website-V2
npm install

# Build for production
npm run build

# Start with PM2
npm install -g pm2
pm2 start "npm start" --name "datastreet-api"
pm2 save
pm2 startup

# Setup nginx reverse proxy
# ... nginx config example below
```

### Heroku
```bash
# 1. Install Heroku CLI
# 2. Login: heroku login
# 3. Create app: heroku create datastreet-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=postgresql://...
heroku config:set ADMIN_SESSION_SECRET=your-secret

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Railway
```bash
# 1. Connect GitHub repository
# 2. Create PostgreSQL plugin
# 3. Add environment variables in Dashboard
# 4. Auto-deploy on push
```

## Production Environment Variables

```bash
# Required
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/datastreet_prod?schema=public
NEXT_PUBLIC_API_URL=https://yourdomain.com

# Security (CRITICAL)
ADMIN_SESSION_SECRET="long-random-string-min-32-chars"
ADMIN_PASSWORD_HASH="bcrypt-hash-from-your-password"
API_RATE_LIMIT_ENABLED=true
API_RATE_LIMIT_REQUESTS_PER_MINUTE=100

# Optional
NEXT_PUBLIC_FEATURE_BLOG=true
NEXT_PUBLIC_FEATURE_PROJECTS=true
NEXT_PUBLIC_FEATURE_EVENTS=true
NEXT_PUBLIC_FEATURE_TEAM=true
```

## Nginx Reverse Proxy Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

## Database Backup & Recovery

### Automated Backups (Recommended)
```bash
# Create backup script
cat > /home/backup-db.sh << 'EOF'
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump -U datastreet_prod -h localhost datastreet_prod | gzip > /backups/db_$TIMESTAMP.sql.gz

# Keep last 30 days
find /backups -name "db_*.sql.gz" -mtime +30 -delete
EOF

chmod +x /home/backup-db.sh

# Schedule with cron (daily at 2 AM)
0 2 * * * /home/backup-db.sh
```

### Manual Backup
```bash
pg_dump -U datastreet_prod -h localhost datastreet_prod > backup.sql
gzip backup.sql
```

### Restore from Backup
```bash
gunzip backup.sql.gz
psql -U datastreet_prod -h localhost datastreet_prod < backup.sql
```

## Monitoring & Logging

### Application Monitoring
```typescript
// Add to lib/monitoring.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

### Database Monitoring
```bash
# Check connection pool
psql -U datastreet_prod -c "SELECT * FROM pg_stat_activity;"

# Monitor slow queries
psql -U datastreet_prod -c "CREATE EXTENSION pg_stat_statements;"
```

### Log Rotation
```bash
# /etc/logrotate.d/datastreet
/var/log/datastreet/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 nobody nobody
    sharedscripts
}
```

## Performance Optimization

### Database Optimization
```sql
-- Create indexes for common queries
CREATE INDEX idx_members_department ON member(departmentId);
CREATE INDEX idx_members_status ON member(status);
CREATE INDEX idx_members_email ON member(email);
CREATE INDEX idx_members_name ON member(name);

-- Enable query statistics
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

### Next.js Optimization
```javascript
// next.config.js
module.exports = {
  compress: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ]
};
```

### Enable Caching
```bash
# Redis caching (optional)
npm install redis

# Add to .env
REDIS_URL=redis://localhost:6379
```

## Security Hardening

### Enable HTTPS
```bash
# Use certbot for Let's Encrypt
sudo certbot certonly --standalone -d yourdomain.com
```

### Database Security
```sql
-- Revoke unnecessary privileges
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO datastreet_prod;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO datastreet_prod;
```

### Rate Limiting
Set in `.env`:
```
API_RATE_LIMIT_ENABLED=true
API_RATE_LIMIT_REQUESTS_PER_MINUTE=60
```

### Content Security Policy
Add to `next.config.js`:
```javascript
headers: async () => [{
  source: '/:path*',
  headers: [
    {
      key: 'Content-Security-Policy',
      value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
    }
  ]
}]
```

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql -U datastreet_prod -h your-host -d datastreet_prod -c "SELECT 1"

# Check environment variable
echo $DATABASE_URL
```

### Prisma Client Issues
```bash
# Regenerate
npx prisma generate

# Check schema
npx prisma validate
```

### Performance Issues
```bash
# Check slow queries
npm run dev -- --inspect

# Profile with Node
node --prof server.js
node --prof-process isolate-*.log > profile.txt
```

## Rollback Strategy

### Keep Previous Version
```bash
# Tag releases
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0

# Quick rollback
git checkout v1.0.0
npm run build && npm start
```

### Database Rollback
```bash
# Keep migration files
npx prisma migrate resolve --rolled-back 20240101000000_migration_name

# Restore from backup
./restore-backup.sh backup_timestamp
```

## Success Metrics

After deployment, verify:
- [ ] All API endpoints responding (GET /api/members)
- [ ] Admin login working (POST /api/auth)
- [ ] Database queries < 100ms
- [ ] Pages load < 2s
- [ ] No error logs in past 1 hour
- [ ] HTTPS/SSL working
- [ ] Security headers present

Monitor at: `https://yourdomain.com/admin/login`

## Support & Maintenance

### Regular Tasks
- [ ] Weekly: Check error logs & backups
- [ ] Monthly: Review performance metrics
- [ ] Quarterly: Update dependencies
- [ ] Annually: Review security posture

### Emergency Contacts
- Database admin: ...
- DevOps team: ...
- Security team: ...

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✓
