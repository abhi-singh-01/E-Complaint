# Coordinator Login Credentials

## 🎯 Overview

Coordinators are the **first point of contact** for all student complaints. When a student submits a complaint, it is automatically assigned to the Coordinator of their department.

## 📋 Coordinator Credentials by Department

| Department | Email | Password |
|------------|-------|----------|
| **MCA** | `mca.coordinator@university.edu` | `mca123456` |
| **MBA** | `mba.coordinator@university.edu` | `mba123456` |
| **CSE** | `cse.coordinator@university.edu` | `cse123456` |
| **Electronics** | `electronics.coordinator@university.edu` | `electronics123456` |
| **Mechanical** | `mechanical.coordinator@university.edu` | `mechanical123456` |
| **Civil** | `civil.coordinator@university.edu` | `civil123456` |
| **Electrical** | `electrical.coordinator@university.edu` | `electrical123456` |
| **General** | `general.coordinator@university.edu` | `general123456` |

---

## 📌 Complaint Workflow

The complaint system follows this hierarchical workflow:

### 1️⃣ Student Submits Complaint
- Student creates a complaint through the dashboard
- **Automatically assigned to Coordinator** of student's department
- Status: `Pending`

### 2️⃣ Coordinator Reviews
- Coordinator receives the complaint
- Can:
  - Review and respond to the complaint
  - **Forward to Additional HOD** (if needs higher authority)
  - **Forward directly to Dean** (if urgent or requires immediate attention)
  - Resolve the complaint (if simple issue)

### 3️⃣ Additional HOD (if forwarded)
- Additional HOD reviews the complaint
- Can:
  - **Escalate to Dean** (if requires dean's attention)
  - Resolve the complaint
  - Request more information

### 4️⃣ Dean Reviews
- Dean receives complaints escalated from Additional HOD or directly from Coordinator
- Can:
  - **Forward to External Departments** based on complaint category:
    - **Library** → For Library category complaints
    - **Maintenance** → For Infrastructure category complaints
    - **Accounts** → For Fee category complaints
  - Resolve the complaint
  - Reject the complaint (if invalid)

### 5️⃣ External Departments (if forwarded by Dean)
- External departments handle specialized complaints
- Status changes to `In Progress`
- External departments work on resolving the issue

---

## 🔄 Forwarding Options

### Coordinator Can Forward To:
1. **Additional HOD** - For complaints requiring department head review
2. **Dean** - For urgent complaints or those requiring dean's authority

### Additional HOD Can Escalate To:
1. **Dean** - For complaints requiring dean's decision

### Dean Can Forward To:
1. **Library** - For Library category complaints
2. **Maintenance** - For Infrastructure category complaints  
3. **Accounts** - For Fee category complaints

---

## ✅ Verification

To verify all coordinators exist, run:

```bash
npm run ensure-coordinators
```

This will:
- Check if coordinators exist for all departments
- Create any missing coordinators
- Display a summary report

---

## ⚠️ Important Notes

1. **Coordinators are mandatory** - Without coordinators, complaints cannot be assigned
2. **Department matching** - Complaints are assigned to coordinators based on student's department
3. **Active status** - Only active coordinators receive complaints
4. **Password security** - Change default passwords after first login

---

## 🔐 Quick Reference

**All Coordinator Passwords follow the pattern:**
- Format: `[department-lowercase]123456`
- Example: MCA → `mca123456`
- Example: Electronics → `electronics123456`

**All Coordinator Emails follow the pattern:**
- Format: `[department-lowercase].coordinator@university.edu`
- Example: MCA → `mca.coordinator@university.edu`

---

## 📞 Support

For issues with coordinator accounts or complaint assignment, contact the Super Admin.

