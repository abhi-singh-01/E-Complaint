# Login Credentials Reference

This document contains all default login credentials for the E-Complaint System. **IMPORTANT: Change these passwords after first login!**

## 🔑 Super Admin

**Email:** `superadmin@university.edu`  
**Password:** `superadmin123456`  
**Role:** `super_admin` (select "Super Admin" in login form)  
**Department:** General (or leave empty)  
**Access:** Full system access

**⚠️ Important:** When logging in, select:
- **Role:** `super_admin` or "Super Admin"
- **Department:** `General` (or leave empty)

---

## 🏢 Department Admin Accounts

### MCA Department

| Role | Email | Password |
|------|-------|----------|
| Coordinator | `mca.coordinator@university.edu` | `mca123456` |
| Additional HOD | `mca.additional@university.edu` | `mca123456` |
| Dean | `mca.dean@university.edu` | `mca123456` |

### MBA Department

| Role | Email | Password |
|------|-------|----------|
| Coordinator | `mba.coordinator@university.edu` | `mba123456` |
| Additional HOD | `mba.additional@university.edu` | `mba123456` |
| Dean | `mba.dean@university.edu` | `mba123456` |

### CSE Department

| Role | Email | Password |
|------|-------|----------|
| Coordinator | `cse.coordinator@university.edu` | `cse123456` |
| Additional HOD | `cse.additional@university.edu` | `cse123456` |
| Dean | `cse.dean@university.edu` | `cse123456` |

### Electronics Department

| Role | Email | Password |
|------|-------|----------|
| Coordinator | `electronics.coordinator@university.edu` | `electronics123456` |
| Additional HOD | `electronics.additional@university.edu` | `electronics123456` |
| Dean | `electronics.dean@university.edu` | `electronics123456` |

### Mechanical Department

| Role | Email | Password |
|------|-------|----------|
| Coordinator | `mechanical.coordinator@university.edu` | `mechanical123456` |
| Additional HOD | `mechanical.additional@university.edu` | `mechanical123456` |
| Dean | `mechanical.dean@university.edu` | `mechanical123456` |

### Civil Department

| Role | Email | Password |
|------|-------|----------|
| Coordinator | `civil.coordinator@university.edu` | `civil123456` |
| Additional HOD | `civil.additional@university.edu` | `civil123456` |
| Dean | `civil.dean@university.edu` | `civil123456` |

### Electrical Department

| Role | Email | Password |
|------|-------|----------|
| Coordinator | `electrical.coordinator@university.edu` | `electrical123456` |
| Additional HOD | `electrical.additional@university.edu` | `electrical123456` |
| Dean | `electrical.dean@university.edu` | `electrical123456` |

### General Department

| Role | Email | Password |
|------|-------|----------|
| Coordinator | `general.coordinator@university.edu` | `general123456` |
| Additional HOD | `general.additional@university.edu` | `general123456` |
| Dean | `general.dean@university.edu` | `general123456` |

---

## 📝 How to Seed Database

### Standard Seeding
To populate the database with these admin accounts, run:

```bash
cd ecomplain-backend
npm run seed
```

This will create all admin accounts with the credentials listed above.

### Fix Login Issues
If you're experiencing "Invalid login credentials" errors, run these commands in order:

```bash
# 1. Migrate old roles (if you have old accounts)
npm run migrate-roles

# 2. Fix email addresses (if emails don't match)
npm run fix-emails

# 3. Verify and fix all admin accounts
npm run verify-admins

# 4. Ensure all required admins exist
npm run ensure-all-admins
```

### Ensure Coordinators Exist
To specifically ensure coordinators exist for all departments (critical for complaint workflow):

```bash
cd ecomplain-backend
npm run ensure-coordinators
```

This script will:
- Check if coordinators exist for all departments
- Create missing coordinators automatically
- Display a summary of existing and newly created coordinators

### Verify Admin Accounts
To verify all admin accounts are properly configured:

```bash
npm run verify-admins
```

This will:
- Check if passwords are properly hashed
- Verify account status (active/locked)
- Test password verification
- Display all login credentials

**⚠️ Warning:** Force re-seeding will update existing admin accounts with default credentials.

---

## 📌 Complaint Workflow

The complaint system follows a hierarchical workflow:

1. **Student submits complaint** → Automatically assigned to **Coordinator** of their department
2. **Coordinator** → Can forward complaint to **Additional HOD** or **Dean**
3. **Additional HOD** → Can escalate complaint to **Dean**
4. **Dean** → Can forward complaint to external departments:
   - **Library** (for Library category complaints)
   - **Maintenance** (for Infrastructure category complaints)
   - **Accounts** (for Fee category complaints)

**Important:** Coordinators are the entry point for all complaints. Ensure coordinators exist for all departments!

## 🔐 Role Permissions

### Coordinator
- **First point of contact** for all complaints
- Can manage complaints assigned to them
- Can view reports
- Can forward complaints to Additional HOD or Dean
- Cannot manage students or admins

### Additional HOD
- Can manage complaints assigned to them
- Can view reports
- Can escalate complaints to Dean
- Cannot manage students or admins

### Dean
- Can manage complaints assigned to them
- Can view reports
- Can manage admins
- Can forward complaints to external departments (Accounts, Librarian, Maintenance)
- Can export data
- Cannot manage students

### Super Admin
- Full system access
- Can manage all complaints
- Can manage students
- Can manage admins
- Can view all reports
- Can export data

---

## ⚠️ Security Notes

1. **Change Default Passwords**: All default passwords should be changed immediately after first login
2. **Email Verification**: All admin accounts are pre-verified for testing purposes
3. **Production Use**: For production deployment, ensure:
   - Strong passwords are enforced
   - Email verification is properly configured
   - Two-factor authentication is enabled (if available)
   - Regular security audits are performed

---

## 🎓 Student Accounts

Student accounts are created through the registration process. Students register themselves using:
- Email address
- Library ID
- Roll Number
- Department
- Year of study

Students cannot be seeded as they must register themselves through the system.

---

## 📞 Support

For issues with login credentials or account access, contact the system administrator.

