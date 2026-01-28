# Deployment Guide - Data Street Website

This guide covers deploying the Data Street website to production.

## Phase 1: Frontend Deployment

### Option 1: Vercel (Recommended)

Vercel provides seamless Next.js deployment with zero configuration.

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

#### Environment Variables:
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add all variables from `.env.example`

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

#### Build Settings:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Framework**: Next.js

### Custom Server Deployment

If deploying to a custom server (VPS, AWS EC2, etc.):

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "datastreet" -- start
   pm2 save
   pm2 startup
   ```

4. **Set up Nginx reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name datastreet.org www.datastreet.org;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d datastreet.org -d www.datastreet.org
   ```

## Phase 2: Backend Deployment

### Option 1: Railway

1. **Create account** at [railway.app](https://railway.app)

2. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

3. **Login**
   ```bash
   railway login
   ```

4. **Initialize project**
   ```bash
   cd server
   railway init
   ```

5. **Add MongoDB plugin** from Railway dashboard

6. **Deploy**
   ```bash
   railway up
   ```

### Option 2: Render

1. Create account at [render.com](https://render.com)

2. **Create new Web Service**
   - Connect GitHub repository
   - Root directory: `server`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

3. **Add environment variables** in Render dashboard

4. **Add MongoDB Atlas**
   - Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Get connection string
   - Add to Render environment variables

### Option 3: DigitalOcean App Platform

1. Create account at [digitalocean.com](https://www.digitalocean.com)

2. **Create new App**
   - Connect GitHub repository
   - Detect Node.js environment
   - Configure build and run commands

3. **Add MongoDB**
   - Use DigitalOcean Managed Database
   - Or connect to MongoDB Atlas

## Database Setup

### MongoDB Atlas (Recommended for Phase 2)

1. **Create account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create cluster** (Free tier available)

3. **Create database user**
   - Username: `datastreet_admin`
   - Password: Generate secure password

4. **Whitelist IP addresses**
   - Add your deployment server IP
   - Or use `0.0.0.0/0` for development (not recommended for production)

5. **Get connection string**
   ```
   mongodb+srv://datastreet_admin:<password>@cluster.mongodb.net/datastreet?retryWrites=true&w=majority
   ```

6. **Add to environment variables**

### Firebase (Alternative)

1. Create project at [firebase.google.com](https://firebase.google.com)

2. **Enable Firestore Database**

3. **Get service account credentials**
   - Go to Project Settings → Service Accounts
   - Generate new private key
   - Download JSON file

4. **Add to environment variables**
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY=your-private-key
   ```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Domain Configuration

### Custom Domain Setup

1. **Purchase domain** (e.g., datastreet.org)

2. **Configure DNS**
   
   For Vercel:
   ```
   A Record: @ → 76.76.21.21
   CNAME: www → cname.vercel-dns.com
   ```

   For Netlify:
   ```
   A Record: @ → 75.2.60.5
   CNAME: www → your-site.netlify.app
   ```

3. **Add domain in hosting platform**
   - Vercel: Dashboard → Domains → Add domain
   - Netlify: Dashboard → Domain settings → Add custom domain

4. **Wait for DNS propagation** (can take up to 48 hours)

## Environment Variables Checklist

### Frontend (Vercel/Netlify)
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `NEXT_PUBLIC_API_URL` (Phase 2)
- [ ] `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY` (Phase 2)

### Backend (Railway/Render)
- [ ] `NODE_ENV=production`
- [ ] `PORT`
- [ ] `MONGODB_URI` or Firebase credentials
- [ ] `JWT_SECRET`
- [ ] `MAILCHIMP_API_KEY`
- [ ] `GOOGLE_CALENDAR_API_KEY`

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify responsive design on mobile
- [ ] Check dark mode toggle
- [ ] Test contact form submission
- [ ] Verify newsletter signup
- [ ] Check analytics integration
- [ ] Test SSL certificate
- [ ] Verify SEO meta tags
- [ ] Test page load speed
- [ ] Check for console errors

## Monitoring & Maintenance

### Performance Monitoring
- Use Vercel Analytics or Google Analytics
- Monitor Core Web Vitals
- Set up error tracking (Sentry)

### Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

### Backups
- Regular database backups (MongoDB Atlas automatic)
- Git repository backups
- Media/asset backups

## Support

For deployment issues:
- Check deployment logs in hosting dashboard
- Verify environment variables
- Review build output for errors
- Contact: devops@datastreet.org

---

**Last Updated**: December 2025
