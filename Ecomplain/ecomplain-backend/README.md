# E-Complaint System Backend

A comprehensive backend API for the E-Complaint System, built with Node.js, Express, and MongoDB. This system allows students to submit complaints and administrators to manage them efficiently.

## 🚀 Features

### Student Features
- **User Registration & Authentication**: Secure registration with college email validation
- **Complaint Management**: Create, view, update, and delete complaints
- **Real-time Status Tracking**: Track complaint status and progress
- **Comment System**: Add comments to complaints for better communication

### Admin Features
- **Role-based Access Control**: Different admin roles (Coordinator, HOD, Super Admin)
- **Complaint Management**: Assign, update status, and resolve complaints
- **Department Management**: Manage complaints by department
- **Analytics & Reports**: View complaint statistics and generate reports
- **User Management**: Manage student and admin accounts

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for passwords
- **Rate Limiting**: Prevent abuse with request rate limiting
- **Input Validation**: Comprehensive input validation and sanitization
- **CORS Protection**: Configured CORS for secure cross-origin requests

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (v4.4 or higher)
- **Git** (for version control)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecomplain-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the environment template
   cp env.example .env
   
   # Edit the .env file with your configuration
   nano .env
   ```

4. **Configure Environment Variables**
   
   Update the following variables in your `.env` file:
   
   ```env
   # Server Configuration
   PORT=4000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/ecomplain
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
   
   # Admin Default Credentials
   DEFAULT_ADMIN_EMAIL=admin@ecomplain.edu
   DEFAULT_ADMIN_PASSWORD=admin123456
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

6. **Seed Initial Data**
   ```bash
   npm run seed
   ```

7. **Start the Server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📁 Project Structure

```
ecomplain-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── complaintController.js # Complaint management logic
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   ├── errorHandler.js      # Error handling middleware
│   │   └── validation.js        # Input validation middleware
│   ├── models/
│   │   ├── Student.js           # Student data model
│   │   ├── Admin.js             # Admin data model
│   │   └── Complaint.js         # Complaint data model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── complaints.js        # Complaint routes
│   └── utils/
│       └── seedData.js          # Database seeding utility
├── server.js                    # Main server entry point
├── package.json                 # Dependencies and scripts
├── env.example                  # Environment variables template
└── README.md                    # This file
```

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register a new student | Public |
| POST | `/api/auth/login` | Student login | Public |
| POST | `/api/admin/auth/login` | Admin login | Public |
| GET | `/api/auth/me` | Get current user profile | Private |
| POST | `/api/auth/refresh` | Refresh access token | Public |
| POST | `/api/auth/logout` | Logout user | Private |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| PUT | `/api/auth/reset-password/:token` | Reset password | Public |

### Complaint Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/complaints` | Get all complaints (with filters) | Private |
| POST | `/api/complaints` | Create new complaint | Student |
| GET | `/api/complaints/:id` | Get single complaint | Private |
| PUT | `/api/complaints/:id` | Update complaint | Private |
| DELETE | `/api/complaints/:id` | Delete complaint | Private |
| POST | `/api/complaints/:id/comments` | Add comment to complaint | Private |
| PUT | `/api/complaints/:id/assign` | Assign complaint to admin | Admin |
| GET | `/api/complaints/stats` | Get complaint statistics | Admin |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Database Models

### Student Model
- Personal information (name, email, library ID, roll number)
- Academic details (department, year)
- Authentication data (password, login attempts)
- Account status and verification

### Admin Model
- Personal information (name, email)
- Role-based permissions (coordinator, HOD, super admin)
- Department assignment
- Access control and permissions

### Complaint Model
- Complaint details (title, description, category)
- Status tracking (pending, in progress, resolved, etc.)
- Assignment and resolution tracking
- Comments and feedback system
- File attachments support

## 🛡️ Security Features

- **Password Hashing**: Uses bcrypt with configurable salt rounds
- **JWT Tokens**: Secure token-based authentication with refresh tokens
- **Rate Limiting**: Prevents abuse with configurable rate limits
- **Input Validation**: Comprehensive validation using express-validator
- **SQL Injection Protection**: MongoDB sanitization
- **CORS Configuration**: Secure cross-origin resource sharing
- **Helmet**: Security headers for protection against common vulnerabilities

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📈 Monitoring & Logging

- **Morgan**: HTTP request logging
- **Error Handling**: Comprehensive error handling and logging

- **Environment-based Logging**: Different log levels for development/production

## 🚀 Deployment

### Production Deployment

1. **Environment Setup**
   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb://your-production-db
   JWT_SECRET=your-production-secret
   ```

2. **Build and Start**
   ```bash
   npm install --production
   npm start
   ```

3. **Process Management**
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start server.js --name ecomplain-backend
   ```

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 4000 |
| `NODE_ENV` | Environment mode | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/ecomplain |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
| `RATE_LIMIT_MAX_REQUESTS` | Rate limit requests per window | 100 |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Email**: support@ecomplain.edu
- **Documentation**: [API Documentation](docs/api.md)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

## 🔄 Version History

- **v1.0.0** - Initial release with basic complaint management
- **v1.1.0** - Added admin roles and permissions
- **v1.2.0** - Enhanced security and validation
- **v1.3.0** - Added file uploads and advanced filtering

---

**Made with ❤️ for better complaint management**
