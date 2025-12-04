# E-Complaint
A comprehensive student complaint management system built with React and Node.js. This system allows students to submit complaints, track their status, and enables administrators to manage and resolve complaints efficiently.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.1.1-blue.svg)

## 🚀 Features

### Student Features
- **User Registration & Authentication** - Secure student registration and login
- **Complaint Submission** - Submit complaints with file attachments
- **Complaint Tracking** - Track complaint status in real-time
- **Dashboard** - View personal complaint statistics and history
- **Password Reset** - Secure password recovery via email

### Admin Features
- **Role-Based Access Control** - Multiple admin roles (Super Admin, Dean, HOD, Coordinator, External Department)
- **Complaint Management** - View, assign, and resolve complaints
- **Dashboard Analytics** - Comprehensive statistics and charts
- **User Management** - Manage students and admin accounts
- **Export Functionality** - Export complaint data to Excel
- **Email Notifications** - Automated email notifications for complaint updates

### System Features
- **Redis Caching** - Improved performance with Redis caching
- **File Upload** - Cloudinary integration for image/file storage
- **Rate Limiting** - API rate limiting for security
- **Input Validation** - Comprehensive input validation and sanitization
- **Error Handling** - Robust error handling and logging
- **Responsive Design** - Mobile-friendly UI with Material-UI and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **XLSX** - Excel export functionality

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Redis** - Caching layer
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cloudinary** - Cloud image/file storage
- **Nodemailer** - Email service
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting

## 📁 Project Structure

```
Ecomplain/
├── ecomplain-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   │   ├── admin/          # Admin pages
│   │   │   └── student/        # Student pages
│   │   ├── auth/               # Authentication context
│   │   ├── lib/                # API utilities
│   │   └── theme/              # Theme configuration
│   ├── public/                 # Static assets
│   ├── dist/                   # Build output
│   └── package.json
│
├── ecomplain-backend/          # Node.js backend API
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/             # Database models
│   │   ├── routes/             # API routes
│   │   └── utils/              # Utility functions
│   ├── server.js               # Entry point
│   └── package.json
│
├── vercel.json                 # Vercel deployment config
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (>=16.0.0)
- npm (>=8.0.0)
- MongoDB database
- Redis server (optional but recommended)
- Cloudinary account (for file uploads)
- Email service credentials (Gmail or similar)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ecomplain.git
   cd ecomplain
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd ecomplain-frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../ecomplain-backend
   npm install
   ```

4. **Configure Environment Variables**

   **Frontend** (`ecomplain-frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:4000
   ```

   **Backend** (`ecomplain-backend/.env`):
   ```env
   # Server Configuration
   PORT=4000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # MongoDB Configuration
   MONGODB_URI=your_mongodb_connection_string

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   JWT_REFRESH_EXPIRE=30d

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_app_password

   # Redis Configuration
   REDIS_ENABLED=true
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   REDIS_DB=0

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   See `ecomplain-backend/env.example` for complete configuration.

5. **Start Development Servers**

   **Backend** (Terminal 1):
   ```bash
   cd ecomplain-backend
   npm run dev
   ```

   **Frontend** (Terminal 2):
   ```bash
   cd ecomplain-frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Student registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Complaint Endpoints
- `GET /api/complaints` - Get all complaints (with filters)
- `POST /api/complaints` - Create new complaint
- `GET /api/complaints/:id` - Get complaint by ID
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint

### Dashboard Endpoints
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/charts` - Get chart data

### Admin Endpoints
- `GET /api/admin/additional-hods` - Get HODs list
- `GET /api/admin/deans` - Get Deans list
- `POST /api/admin/assign` - Assign complaint to admin

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com/new)
   - Import your GitHub repository
   - **Set Root Directory**: `ecomplain-frontend`
   - **Add Environment Variable**: `VITE_API_URL` = your backend URL
   - Click Deploy

3. **Configure Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Backend Deployment

Deploy backend separately on platforms like:
- **Railway** (Recommended) - https://railway.app
- **Render** - https://render.com
- **Heroku** - https://heroku.com
- **DigitalOcean** - https://www.digitalocean.com

**Important**: Update `FRONTEND_URL` environment variable with your Vercel deployment URL.

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers
- MongoDB injection prevention
- File upload validation

## 📊 Admin Roles

- **Super Admin** - Full system access
- **Dean** - Manage complaints at dean level
- **HOD (Head of Department)** - Manage department complaints
- **Coordinator** - Coordinate complaint resolution
- **External Department** - Handle external department complaints

## 🧪 Testing

```bash
# Backend tests
cd ecomplain-backend
npm test

# Frontend linting
cd ecomplain-frontend
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **E-Complaint System Team**

## 🙏 Acknowledgments

- Material-UI for the component library
- Vite for the excellent build tool
- Express.js community
- All contributors and users

## 📞 Support

For support, email support@ecomplain.com or open an issue in the repository.

## 🔗 Links

- [Live Demo](https://your-project.vercel.app) (if deployed)
- [API Documentation](https://your-backend-url.com/api/docs)
- [Issue Tracker](https://github.com/YOUR_USERNAME/ecomplain/issues)

---

⭐ If you find this project helpful, please consider giving it a star!
