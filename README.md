📌 E-Complaint Management System

A full-stack web application designed to digitize and streamline complaint handling in organizations. It manages the complete lifecycle of a complaint—from submission to resolution—ensuring transparency, accountability, automation, and traceability.

The platform supports multi-role access, file attachments, email notifications, status tracking, feedback, escalation, and complete audit logging.

This README documents all currently implemented features inside your project.

🎯 Project Overview

The E-Complaint Management System replaces manual, paper-based grievance handling with an automated, centralized platform. Users can file complaints; departments can process them; admins can oversee the entire workflow.

The system enables:

Faster issue resolution

Increased transparency

Complete accountability

Automated notifications

Digital tracking & audit trail

It supports multi-role dashboards, file uploads, email alerts, status history, feedback, escalations, and secure authentication.

⭐ Key Features
👤 User Features

Secure registration & login

Submit complaints with title, description, priority

Attach images/documents

Track complaint status

View complete complaint history

Receive email notifications when:

Complaint is submitted

Complaint is assigned

Status is updated

Complaint is escalated

Complaint is resolved

Provide feedback after resolution

🏢 Department Features

Department dashboard

View complaints assigned to the department

Update complaint status through workflow stages

Add remarks during processing

Handle escalated complaints

Receive email alerts on new assignments

🛠️ Admin Features

Add/manage users

Add/manage departments

Assign complaints to appropriate departments

Monitor all complaints across the system

Track status, escalations, and feedback

Access administrative dashboard with analytics (if included)

Receive escalation alerts

📎 Attachment Handling

Upload images/documents as supporting evidence

Files stored in /public/uploads

Metadata stored in MongoDB

Linked to specific complaint records

🔔 Email Notification System

Implemented using Nodemailer.

Automatic emails are sent when:

New user registers

Complaint is submitted

Complaint is assigned to a department

Department updates complaint status

Complaint is escalated

Complaint is resolved

Feedback is submitted

⚠️ Escalation System

Escalate unresolved complaints

Maintain escalation levels with timestamps

Notify admin/department via email

📝 Status History Logging

Each update records:

Previous status

New status

Updated by (user/admin/department)

Timestamp

Creates a complete audit trail.

🧱 System Architecture
Client (Browser)
     |
     | HTTP Requests
     v
Express.js Server
     |
     | Routes → Controllers → Middleware
     v
Business Logic Layer
     |
     v
MongoDB (via Mongoose Models)
     |
     v
Email Notification Service (Nodemailer SMTP)

Includes:

MVC folder architecture

Secure authentication middleware

File upload handling

Config-driven MongoDB connection

Role-based authorization

Scalable structure

🧰 Tech Stack
Frontend

HTML5, CSS3, JavaScript

EJS Template Engine

Bootstrap

Backend

Node.js

Express.js

Mongoose ORM

Database

MongoDB (NoSQL)

Utilities

Multer (File Uploads)

Bcrypt (Password Hashing)

JWT / Sessions (Auth)

Nodemailer (Email Notifications)

Nodemon (Development Server)

📂 Folder Structure
E-Complaint/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── complaintController.js
│   ├── adminController.js
│   └── departmentController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Complaint.js
│   ├── Department.js
│   ├── Attachment.js
│   ├── Feedback.js
│   └── Escalation.js
│
├── public/
│   ├── css/
│   ├── js/
│   └── uploads/
│
├── routes/
│   ├── authRoutes.js
│   ├── adminRoutes.js
│   ├── complaintRoutes.js
│   └── departmentRoutes.js
│
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   ├── userDashboard.ejs
│   ├── adminDashboard.ejs
│   ├── departmentDashboard.ejs
│   └── complaintDetails.ejs
│
├── app.js
├── package.json
└── README.md

🗄️ Database Schema
✔ User

Fields: _id, name, email, password, role, department_id, created_at

✔ Department

Fields: _id, department_name, description

✔ Complaint

Fields: _id, user_id, department_id, title, description, priority, status, assigned_to, created_at

✔ Attachment

Fields: _id, complaint_id, file_path

✔ Feedback

Fields: _id, complaint_id, rating, comment

✔ Escalation

Fields: _id, complaint_id, escalation_level, escalated_to, timestamp

✔ Status History

Fields: _id, complaint_id, prev_status, new_status, changed_by, timestamp

🧩 ER Diagram

(Place your PNG ERD image here when uploading to GitHub)

🔄 Complaint Lifecycle
Complaint Created
       ↓
Assigned to Department
       ↓
Under Processing
       ↓
Resolved
       ↓
Feedback Submitted
       ↓
Closed


💡 Escalation can occur at any stage before resolution.

🔌 API Documentation
▶ Auth Routes
Method	Endpoint	Description
POST	/register	Create new user
POST	/login	Authenticate user
▶ Complaint Routes
Method	Endpoint	Description
POST	/complaints	File complaint
GET	/complaints/:id	Get complaint details
PUT	/complaints/:id/status	Update complaint status
▶ Admin Routes
Method	Endpoint	Description
GET	/admin/complaints	View all complaints
POST	/admin/assign	Assign department
🔐 Authentication & Authorization

Passwords hashed using bcrypt

Authentication via JWT or session cookies

Role-based access control (RBAC):

User → submit & track complaints

Department → process assigned complaints

Admin → full system access

🛠 Installation Guide
git clone <repo-url>
cd E-Complaint
npm install

🔧 Environment Variables (.env)
PORT=5000
MONGO_URI=your-mongo-db-url
JWT_SECRET=your-secret-key

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

▶ Running the Application
Production
npm start

Development
npm run dev

☁️ Deployment Guide
Deploy on Render / Vercel

Upload repository

Configure environment variables

Configure build & start commands

Deploy on VPS

Install Node.js & MongoDB

Run server via PM2

Reverse proxy with NGINX

🔒 Security Considerations

Hash all passwords

Validate and sanitize input

Limit allowed upload file types

Use HTTPS in production

Never expose credentials or .env files

Use App Passwords for email SMTP

📈 Scalability & Optimization

Move file storage to AWS S3

Add Redis caching

Add request rate-limiting

Introduce microservices for heavy modules

Enable horizontal scaling using Docker/Kubernetes

🧪 Testing Guidelines

API testing with Postman

Unit tests using Jest/Mocha

End-to-end UI testing with Selenium (optional)

Test email delivery using SMTP sandbox

🚑 Troubleshooting
❌ MongoDB connection error

Check MONGO_URI.

❌ JWT/Sessions not working

Check JWT_SECRET and cookie configuration.

❌ File uploads not saving

Verify /public/uploads folder permissions.

❌ Emails not sending

Ensure SMTP credentials are correct
Use Gmail App Password if using Gmail SMTP.

🧭 Future Enhancements

Automated escalation engine

Real-time notification system

AI-based complaint classification

Advanced admin analytics

Mobile app interface

🤝 Contributing

Fork this repository

Create a feature branch

Commit your changes

Submit a pull request

📜 License

MIT License

👨‍💻 Authors

Abhishek Mishra
Abhijeet Singh
