# 🎓 E-Complaint System

A comprehensive, full-stack complaint management system designed for educational institutions. Students can submit, track, and manage complaints while administrators can efficiently handle, route, and resolve issues across departments.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.x-61dafb)

## 🌟 Features

### For Students
- 📝 **Submit Complaints** - File complaints with attachments, categories, and priority levels
- 🔍 **Track Status** - Real-time tracking of complaint progress through multiple stages
- 🔔 **Email Notifications** - OTP verification, status updates, and comment notifications
- 🔐 **Secure Authentication** - OTP-based registration with university email validation
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### For Administrators
- 📊 **Dashboard Analytics** - Visual statistics and complaint overview
- 👥 **Role-Based Access Control** - Coordinator, Additional HOD, Dean, and Super Admin roles
- 🔄 **Smart Routing** - Automatic routing to appropriate departments
- 📈 **Escalation System** - Escalate complaints to higher authorities
- 📎 **Attachment Management** - View and manage complaint attachments via Cloudinary

### System Features
- 🌓 **Dark/Light Theme** - Full theme support across the application
- 📧 **Multi-Provider Email** - AWS SES, Brevo, Resend, and Gmail support
- 🚀 **Performance Optimized** - Redis caching, compression, and optimized queries
- 🔒 **Security First** - Helmet, rate limiting, input sanitization, and CORS

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build Tool |
| **Material-UI (MUI)** | Component Library |
| **Framer Motion** | Animations |
| **React Router v6** | Client-side Routing |
| **Axios** | HTTP Client |
| **Chart.js** | Data Visualization |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **Redis** | Caching |
| **JWT** | Authentication |
| **Nodemailer** | Email Service |
| **Cloudinary** | File Storage |

### DevOps & Deployment
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend Hosting |
| **Render** | Backend Hosting |
| **MongoDB Atlas** | Cloud Database |
| **AWS SES** | Email Delivery |
| **Cloudinary** | Media Storage |

---

## 📁 Project Structure

```
E-Complaint/
├── ecomplain-frontend/          # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── contexts/            # React contexts (Auth, Theme)
│   │   ├── pages/               # Page components
│   │   │   ├── admin/           # Admin dashboards
│   │   │   ├── student/         # Student pages
│   │   │   └── common/          # Shared pages
│   │   ├── lib/                 # API client & utilities
│   │   └── App.jsx              # Main application
│   └── vercel.json              # Vercel configuration
│
└── ecomplain-backend/           # Express Backend
    ├── src/
    │   ├── config/              # Database & Redis config
    │   ├── controllers/         # Route handlers
    │   ├── middleware/          # Auth, validation, caching
    │   ├── models/              # Mongoose schemas
    │   ├── routes/              # API routes
    │   └── utils/               # Email service, helpers
    └── server.js                # Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- MongoDB (local or Atlas)
- Redis (optional, for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/E-Complaint.git
   cd E-Complaint
   ```

2. **Setup Backend**
   ```bash
   cd ecomplain-backend
   npm install
   # Create .env file with required variables
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ecomplain-frontend
   npm install
   # Create .env file with VITE_API_URL
   npm run dev
   ```

4. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:4000`

---

## 👥 User Roles

| Role | Access Level | Capabilities |
|------|--------------|--------------|
| **Student** | Basic | Submit complaints, track status, add comments |
| **Coordinator** | Department | View & manage department complaints |
| **Additional HOD** | Department | Escalate to Dean, manage complex issues |
| **Dean** | Cross-Department | Handle escalated complaints, forward to external departments |
| **Super Admin** | Full | Manage all admins, full system access |

---

## 📧 Email Notifications

The system sends automated emails for:
- ✉️ OTP verification during registration
- 🔑 Password reset OTP
- 📋 Complaint submission confirmation
- 🔄 Status change notifications
- 💬 New comment alerts

---

## 🎨 UI/UX Features

- **Responsive Design** - Optimized for all screen sizes
- **Dark/Light Theme** - System-wide theme toggle
- **Animated Components** - Smooth transitions and micro-interactions
- **Accessible** - Keyboard navigation and screen reader support
- **Modern Aesthetics** - Glassmorphism, gradients, and premium styling

---

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input sanitization against NoSQL injection
- XSS protection via Helmet
- CORS configuration for allowed origins
- OTP verification for sensitive actions

---

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/send-otp` | Send registration OTP |
| POST | `/api/auth/verify-otp` | Verify OTP and register |
| POST | `/api/auth/login` | Student login |
| POST | `/api/auth/admin/login` | Admin login |
| POST | `/api/auth/forgot-password-otp` | Send password reset OTP |

### Complaints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/complaints` | List complaints |
| POST | `/api/complaints` | Create complaint |
| GET | `/api/complaints/:id` | Get complaint details |
| PUT | `/api/complaints/:id` | Update complaint |
| POST | `/api/complaints/:id/comments` | Add comment |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get statistics |
| GET | `/api/dashboard/recent` | Recent complaints |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Team

| Name | Role | Links |
|------|------|-------|
| **Abhijeet Singh** | Backend Architect | [GitHub](https://github.com/abhi-singh-01) |
| **Abhishek Mishra** | Frontend Engineer | [GitHub](https://github.com) |
| **Aashi** | Full Stack Developer | [GitHub](https://github.com) |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- MongoDB Atlas for cloud database hosting
- Vercel and Render for seamless deployments
- AWS SES for reliable email delivery

---

<p align="center">
  Made with ❤️ for better campus communication
</p>
