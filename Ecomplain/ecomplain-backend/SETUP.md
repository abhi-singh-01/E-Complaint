# Quick Setup Guide

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (v4.4+)
- npm (v8+)

### 2. Installation
```bash
# Install dependencies
npm install

# Copy environment file
copy env.example .env

# Edit .env file with your settings
notepad .env
```

### 3. Environment Configuration
Edit `.env` file with these essential settings:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/ecomplain
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:5173
```

### 4. Start MongoDB
```bash
# Windows
net start MongoDB

# Or start MongoDB service manually
```

### 5. Run the Server
```bash
# Option 1: Use the batch file (Windows)
start-dev.bat

# Option 2: Manual start
npm run dev
```

### 6. Seed Initial Data
```bash
npm run seed
```

## 🔧 Default Admin Credentials
- **Email**: admin@ecomplain.edu
- **Password**: admin123456
- **Role**: Super Admin

## 📡 API Endpoints
- **API Base**: http://localhost:4000/api
- **Student Register**: POST /api/auth/register
- **Student Login**: POST /api/auth/login
- **Admin Login**: POST /api/admin/auth/login

## 🐛 Troubleshooting

### MongoDB Connection Issues
1. Ensure MongoDB is running
2. Check connection string in .env
3. Verify MongoDB port (default: 27017)

### Port Already in Use
1. Change PORT in .env file
2. Or kill process using port 4000

### JWT Secret Issues
1. Set a strong JWT_SECRET in .env
2. Restart the server after changes

## 📞 Support
- Check the main README.md for detailed documentation
- Review error logs in console
- Ensure all environment variables are set correctly



