# E-Complaint Backend

## Deployment on Render

This backend is ready to deploy on Render.com.

### Quick Deploy Steps:

1. **Create Render Account** at [render.com](https://render.com)

2. **New Web Service** → Connect GitHub → Select this repo

3. **Configure:**
   - **Root Directory:** `ecomplain-backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Environment Variables** (Required):
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<your-secret-key>
   JWT_EXPIRE=7d
   FRONTEND_URL=<your-vercel-frontend-url>
   ALLOWED_ORIGINS=<your-vercel-frontend-url>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
   CLOUDINARY_API_KEY=<your-cloudinary-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-secret>
   EMAIL_HOST=<your-smtp-host>
   EMAIL_PORT=587
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-email-password>
   EMAIL_FROM=<your-sender-email>
   ```

5. **Click "Create Web Service"**

### Notes:
- Redis is **optional** - the app works without it using in-memory caching
- Free tier may sleep after 15 min of inactivity (first request takes ~30s)
- Upgrade to Starter plan ($7/mo) for always-on service
