# How to Access External Department Interface

This guide explains how to access the External Department Dashboard for Accounts, Librarian, and Maintenance departments.

## Step 1: Create External Department Admin Accounts

External department accounts need to be created first. You have two options:

### Option A: Create via Super Admin Dashboard (Recommended)

1. **Login as Super Admin:**
   - Go to `/admin/login`
   - Select role: **Super Administrator**
   - Email: `superadmin@university.edu`
   - Password: `superadmin123456`

2. **Create External Department Admin:**
   - Navigate to the **Admins** tab in Super Admin Dashboard
   - Click **Add Admin** button
   - Fill in the form:
     - **First Name**: e.g., "Accounts", "Library", or "Maintenance"
     - **Last Name**: e.g., "Department"
     - **Email**: e.g., `accounts@university.edu`, `librarian@university.edu`, or `maintenance@university.edu`
     - **Password**: Set a secure password
     - **Role**: Select one of:
       - `accounts` (for Accounts Department)
       - `librarian` (for Librarian)
       - `maintenance` (for Maintenance Department)
     - **Department**: Will be auto-set based on role:
       - `accounts` → `Accounts`
       - `librarian` → `Librarian`
       - `maintenance` → `Maintenance`
   - Click **Save**

### Option B: Create via Database Script

You can create external department accounts using MongoDB directly or create a seed script.

**Example MongoDB Commands:**

```javascript
// For Accounts Department
db.admins.insertOne({
  firstName: "Accounts",
  lastName: "Department",
  email: "accounts@university.edu",
  password: "$2a$12$...", // Hashed password (use bcrypt)
  role: "accounts",
  department: "Accounts",
  isEmailVerified: true,
  isActive: true,
  permissions: {
    canManageComplaints: true,
    canManageStudents: false,
    canManageAdmins: false,
    canViewReports: true,
    canExportData: false
  }
});

// For Librarian
db.admins.insertOne({
  firstName: "Library",
  lastName: "Department",
  email: "librarian@university.edu",
  password: "$2a$12$...", // Hashed password
  role: "librarian",
  department: "Librarian",
  isEmailVerified: true,
  isActive: true,
  permissions: {
    canManageComplaints: true,
    canManageStudents: false,
    canManageAdmins: false,
    canViewReports: true,
    canExportData: false
  }
});

// For Maintenance Department
db.admins.insertOne({
  firstName: "Maintenance",
  lastName: "Department",
  email: "maintenance@university.edu",
  password: "$2a$12$...", // Hashed password
  role: "maintenance",
  department: "Maintenance",
  isEmailVerified: true,
  isActive: true,
  permissions: {
    canManageComplaints: true,
    canManageStudents: false,
    canManageAdmins: false,
    canViewReports: true,
    canExportData: false
  }
});
```

## Step 2: Login to External Department Dashboard

1. **Navigate to Admin Login:**
   - Go to `/admin/login` in your browser

2. **Select External Department Role:**
   - In the "Select Your Role" dropdown, choose one of:
     - **Accounts Department** (for fee-related complaints)
     - **Librarian** (for library-related complaints)
     - **Maintenance Department** (for infrastructure complaints)

3. **Department Field:**
   - The department field will be automatically set based on your role selection
   - You don't need to change it

4. **Enter Credentials:**
   - **Email**: The email address you created for the external department admin
   - **Password**: The password you set

5. **Click Sign In**

## Step 3: Using the External Department Dashboard

Once logged in, you will see the External Department Dashboard with:

### Features Available:

1. **Statistics Overview:**
   - Total Complaints forwarded to your department
   - Pending Acknowledgement count
   - Acknowledged count
   - In Progress count

2. **Complaints List:**
   - View all complaints forwarded to your department
   - Filter by status (All, Pending, In Progress, Resolved)
   - See acknowledgement status for each complaint

3. **Actions:**
   - **View Details**: Click the eye icon to see full complaint details
   - **Acknowledge**: Click the checkmark icon (✓) to acknowledge complaints
     - This confirms that your department has received the complaint
     - You can add an optional acknowledgement comment

### Workflow:

1. **Dean forwards complaint** → Complaint appears in your dashboard
2. **You acknowledge complaint** → Status updates, Dean can see acknowledgement
3. **Dean closes complaint** → After acknowledgement, Dean can close the complaint

## Example Credentials (for testing)

**Important:** External departments have a **single login account** per department (not three separate accounts like Coordinator, Additional HOD, and Dean).

You can create these accounts via Super Admin:

| Department | Email | Role | Department Field | Notes |
|------------|-------|------|------------------|-------|
| Accounts | `accounts@university.edu` | `accounts` | `Accounts` | Single account for entire Accounts department |
| Librarian | `librarian@university.edu` | `librarian` | `Librarian` | Single account for Librarian |
| Maintenance | `maintenance@university.edu` | `maintenance` | `Maintenance` | Single account for entire Maintenance department |

**Note:** Unlike academic departments (MCA, MBA, CSE, etc.) which have Coordinator, Additional HOD, and Dean accounts, external departments only need one account per department.

## Troubleshooting

### "Invalid admin role" error:
- Make sure you selected the correct role in the login form
- Verify the admin account was created with the correct role

### "You can only acknowledge complaints forwarded to [Department]" error:
- This means the complaint was forwarded to a different external department
- Each external department can only acknowledge complaints forwarded to them

### No complaints showing:
- Make sure a Dean has forwarded complaints to your department
- Check the filter status (try "All")
- Verify complaints have `externalForward.isForwarded = true` and `externalForward.forwardedTo` matches your department

## Quick Start Example

1. **Super Admin creates Accounts admin:**
   ```
   Email: accounts@university.edu
   Role: accounts
   Password: accounts123456
   ```

2. **Login as Accounts admin:**
   - Go to `/admin/login`
   - Select "Accounts Department"
   - Email: `accounts@university.edu`
   - Password: `accounts123456`
   - Click Sign In

3. **View and acknowledge complaints:**
   - See complaints forwarded by Deans
   - Click ✓ to acknowledge
   - Add comment if needed
   - Click "Acknowledge Complaint"

That's it! The External Department Dashboard is now accessible.

