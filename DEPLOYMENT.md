# 🚀 Deployment Guide - Charity Platform Frontend

This guide provides comprehensive instructions for deploying the Charity Platform Frontend to various hosting platforms.

## 📋 **Pre-Deployment Checklist**

- [ ] Backend API is deployed and accessible
- [ ] Environment variables are configured
- [ ] Payment gateway credentials are set up
- [ ] SSL certificates are ready for production
- [ ] Domain name is configured
- [ ] CDN is set up for static assets (optional)

## 🌐 **Deployment Options**

### **Option 1: Netlify (Recommended for beginners)**

#### **1. Automatic Deployment from GitHub**
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Configure environment variables in Netlify dashboard

#### **2. Environment Variables (Netlify)**
```env
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_NAME=Charity Platform
GENERATE_SOURCEMAP=false
REACT_APP_ENABLE_NOTIFICATIONS=true
```

#### **3. Custom Domain (Netlify)**
- Add custom domain in Netlify dashboard
- Configure DNS settings
- SSL is automatically provisioned

### **Option 2: Vercel (Optimized for React)**

#### **1. Deploy with Vercel CLI**
```bash
npm install -g vercel
vercel --prod
```

#### **2. Deploy from GitHub**
1. Connect GitHub repository to Vercel
2. Configure build settings automatically detected
3. Set environment variables in Vercel dashboard

#### **3. Configuration (vercel.json)**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### **Option 3: AWS S3 + CloudFront**

#### **1. Build for Production**
```bash
npm run build
```

#### **2. Create S3 Bucket**
```bash
aws s3 mb s3://charity-platform-frontend
```

#### **3. Upload Build Files**
```bash
aws s3 sync build/ s3://charity-platform-frontend --delete
```

#### **4. Configure S3 for Static Website Hosting**
- Enable static website hosting
- Set index document: `index.html`
- Set error document: `index.html`

#### **5. Set Up CloudFront Distribution**
- Create distribution with S3 as origin
- Configure custom error pages for SPA routing
- Set up SSL certificate

### **Option 4: DigitalOcean App Platform**

#### **1. Connect GitHub Repository**
- Create new app from GitHub repository
- Select Node.js environment

#### **2. Build Configuration**
```yaml
name: charity-platform-frontend
services:
- name: frontend
  source_dir: /
  github:
    repo: ahmd-nish/charity_website_frontend
    branch: main
  build_command: npm run build
  output_dir: build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
```

### **Option 5: Traditional Hosting (cPanel/Shared Hosting)**

#### **1. Build Production Version**
```bash
npm run build
```

#### **2. Upload Build Files**
- Upload contents of `build/` folder to public_html
- Configure `.htaccess` for SPA routing:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

## ⚙️ **Environment Configuration**

### **Production Environment Variables**
```env
# API Configuration
REACT_APP_API_URL=https://api.yourcharityplatform.com/api
REACT_APP_SOCKET_URL=https://api.yourcharityplatform.com

# Application Configuration
REACT_APP_NAME=Charity Platform Sri Lanka
REACT_APP_VERSION=1.0.0

# Feature Flags
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_REAL_TIME=true

# External Services
REACT_APP_GOOGLE_MAPS_API_KEY=your_production_google_maps_key
REACT_APP_FIREBASE_API_KEY=your_production_firebase_key

# Build Configuration
GENERATE_SOURCEMAP=false
REACT_APP_DEBUG=false
```

### **Environment-Specific Configurations**

#### **Staging Environment**
```env
REACT_APP_API_URL=https://staging-api.yourcharityplatform.com/api
REACT_APP_DEBUG=true
GENERATE_SOURCEMAP=true
```

#### **Development Environment**
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_DEBUG=true
GENERATE_SOURCEMAP=true
```

## 🔒 **Security Configuration**

### **Content Security Policy (CSP)**
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.yourcharityplatform.com;
">
```

### **HTTPS Enforcement**
```apache
# .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 📊 **Performance Optimization**

### **Build Optimization**
```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

### **Compression Configuration**
```apache
# .htaccess
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
</IfModule>
```

### **Caching Headers**
```apache
# .htaccess
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## 🔍 **Monitoring & Analytics**

### **Error Tracking (Sentry)**
```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### **Performance Monitoring**
```javascript
// src/reportWebVitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## 🧪 **Testing in Production**

### **Smoke Tests**
```bash
# Test critical paths after deployment
curl -f https://yourcharityplatform.com
curl -f https://yourcharityplatform.com/login
curl -f https://yourcharityplatform.com/register
```

### **Performance Testing**
```bash
# Use Lighthouse CLI
npm install -g lighthouse
lighthouse https://yourcharityplatform.com --output html
```

## 🔄 **CI/CD Pipeline Example (GitHub Actions)**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Build
      run: npm run build
      env:
        REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
    
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=build
      env:
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

## 📞 **Post-Deployment Support**

### **Health Checks**
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure alerting for downtime
- Monitor performance metrics

### **Backup Strategy**
- Source code backed up in GitHub
- Database backups handled by backend
- Static assets served from CDN

### **Rollback Plan**
- Keep previous build versions available
- Document rollback procedures
- Test rollback process in staging

---

## 🚨 **Common Issues & Solutions**

### **Build Fails**
- Check Node.js version compatibility
- Clear node_modules and reinstall
- Verify environment variables

### **Routing Issues (404 on refresh)**
- Configure server for SPA routing
- Add .htaccess rules for Apache
- Set up redirects in hosting platform

### **API Connection Issues**
- Verify CORS settings on backend
- Check API URL environment variable
- Ensure HTTPS/HTTP protocol match

---

**For additional support, refer to the main README.md or create an issue in the repository.**
