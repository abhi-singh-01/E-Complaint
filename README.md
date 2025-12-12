# 📌 E-Complaint Management System

A full-stack web application built with **Node.js**, **Express**, and **MongoDB** to streamline complaint management in organizations.  
The platform digitizes the entire complaint lifecycle—submission, assignment, processing, resolution, escalation, feedback, and closure—ensuring **transparency, accountability, automation, and traceability**.


# 🎯 Project Overview

The **E-Complaint Management System** replaces manual grievance handling with a centralized web-based solution.  
It supports:

- Multi-role dashboards  
- File attachments  
- Email notifications (SMTP)  
- Real-time status tracking  
- Feedback collection  
- Escalation handling  
- Audit logging  

This README documents **all currently implemented features**.


# ⭐ Key Features

## 👤 User Features
- Secure register/login  
- Submit complaints with **title, description, priority**  
- Upload attachments (images/documents)  
- Track real-time complaint status  
- View complete complaint history  
- Receive **email notifications** for:
  - Complaint submission  
  - Complaint assignment  
  - Status updates  
  - Escalations  
  - Complaint resolution  
- Provide feedback after resolution  


## 🏢 Department Features
- Department dashboard  
- View assigned complaints  
- Update complaint status  
- Add remarks  
- Manage escalated issues  
- Receive **email alerts** for new assignments  


## 🛠️ Admin Features
- Add/manage users  
- Add/manage departments  
- Assign complaints to departments  
- View all complaints  
- Monitor escalations & feedback  
- Access admin dashboard analytics (if implemented)  
- Receive escalation notifications  


## 🔔 Email Notification System (SMTP)
Implemented using **Nodemailer + SMTP**.

Automatic emails are sent for:

- User registration  
- Complaint submission  
- Complaint assignment  
- Status changes  
- Complaint escalation  
- Complaint resolution  
- Feedback submission  


## 📎 Attachment Handling
- File uploads stored in `/public/uploads`  
- Metadata stored in MongoDB  
- Supports multiple attachments per complaint  


## ⚠️ Escalation System
- Escalates unresolved complaints  
- Stores escalation level, authority, timestamp  
- Sends escalation alerts to admin/department  


## 📝 Status History Logging
Every status update is recorded with:

- Previous & new status  
- Updated by (user/admin/department)  
- Timestamp  

### Includes:
- MVC folder structure  
- Authentication middleware  
- File upload handler (Multer)  
- Config-based DB connection  
- Role-based authorization  

# 🧰 Tech Stack

### Frontend
- HTML5  
- CSS3  
- JavaScript  
- EJS Templates  
- Bootstrap  

### Backend
- Node.js  
- Express.js  
- Mongoose ORM  

### Database
- MongoDB  

### Utilities
- Multer (file uploads)  
- Bcrypt (password hashing)  
- JWT / Sessions (auth)  
- Nodemailer (SMTP emails)  
- Nodemon (dev auto-reload)  


# 🗄️ Database Schema

### ✔ User
`_id, name, email, password, role, department_id, created_at`

### ✔ Department
`_id, department_name, description`

### ✔ Complaint
`_id, user_id, department_id, title, description, priority, status, assigned_to, created_at`

### ✔ Attachment
`_id, complaint_id, file_path`

### ✔ Feedback
`_id, complaint_id, rating, comment`

### ✔ Escalation
`_id, complaint_id, escalation_level, escalated_to, timestamp`

### ✔ Status History
`_id, complaint_id, prev_status, new_status, changed_by, timestamp`


# 🔄 Complaint Lifecycle

Complaint Created > Assigned to Department > Under Processing > Resolved > Feedback Submitted > Closed

⚠ Escalation can occur anytime before resolution.


# 🔌 API Documentation

## ▶ Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Authenticate |

## ▶ Complaint Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/complaints` | Submit a complaint |
| GET | `/complaints/:id` | View complaint |
| PUT | `/complaints/:id/status` | Update complaint status |

## ▶ Admin Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/complaints` | View all complaints |
| POST | `/admin/assign` | Assign complaint to department |


# 🔐 Authentication & Authorization

- Passwords hashed with bcrypt  
- JWT or Session-based authentication  
- Role-based access control:
  - **User** → file & track complaints  
  - **Department** → process assigned complaints  
  - **Admin** → full system management  

# 🛠 Installation

```bash
git clone <repo-url>
cd E-Complaint
npm install
🔧 Environment Variables
Create a .env file:

env
Copy code
PORT=5000
MONGO_URI=your-mongodb-url
JWT_SECRET=your-secret-key

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
▶ Running the Application
Development
bash
Copy code
npm run dev
Production
bash
Copy code
npm start
☁️ Deployment Guide
Deploy on Render / Railway / Vercel
Upload repository

Configure environment variables

Set start command: node app.js

Deploy on VPS
Install Node.js & MongoDB

Use PM2: pm2 start app.js

Configure NGINX reverse proxy

🔒 Security Practices
Enforce bcrypt password hashing

Validate & sanitize all inputs

Restrict file types on upload

Use HTTPS in production

Never commit .env or secret keys

📈 Scalability & Optimization
Move uploads to Amazon S3

Add Redis caching

Implement rate-limiting

Convert to microservices architecture if load increases

🧪 Testing
Postman API testing

Jest/Mocha for unit tests

Selenium for UI testing (optional)

🚑 Troubleshooting
MongoDB connection error
Check MONGO_URI.

JWT/Sessions failing
Check JWT_SECRET.

Uploads not storing
Verify /public/uploads write permissions.

Emails not sending
Verify SMTP credentials in .env and use Gmail App Password.

🧭 Future Enhancements
Auto-escalation rules

Push notification system

AI-based complaint classification

Advanced analytics dashboard

Mobile app version

🤝 Contributing
Fork repository

Create a new branch

Commit your changes

Submit a pull request

📜 License
MIT License

👨‍💻 Authors
Abhishek Mishra

Abhijeet Singh
